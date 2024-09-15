use axum::{
    body::Body,
    http::{Request, StatusCode},
    middleware::Next,
    response::Response,
};
use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::{prelude::FromRow, PgPool};
use tracing::info;

use crate::jwt::verify_jwt;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct AuthToken {
    pub token_id: i32,
    pub user_id: i32,
    pub token: String,
    pub created_at: NaiveDateTime,
    pub expires_at: NaiveDateTime,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NewAuthToken {
    user_id: i32,
    token: String,
    expires_at: NaiveDateTime,
}

pub async fn store_token(
    db: &PgPool,
    user_id: i32,
    token: &str,
    expires_at: NaiveDateTime,
) -> Result<(), (axum::http::StatusCode, String)> {
    let query = r#"
      INSERT INTO auth_tokens (user_id, token, expires_at)
      VALUES ($1, $2, $3)
  "#;

    sqlx::query(query)
        .bind(user_id)
        .bind(token)
        .bind(expires_at)
        .execute(db)
        .await
        .map_err(|e| {
            tracing::error!("Failed to store token: {:?}", e);
            (
                axum::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Failed to store token".to_string(),
            )
        })?;

    Ok(())
}

pub async fn auth_middleware(req: Request<Body>, next: Next) -> Result<Response, (StatusCode, String)> {
    // Extract token from headers
    let token = match req.headers().get("Authorization") {
        Some(value) => value
            .to_str()
            .unwrap_or("")
            .trim_start_matches("Bearer ")
            .to_string(),
        None => return Err((StatusCode::UNAUTHORIZED, "Missing token".to_string())),
    };

    match verify_jwt(&token) {
        Ok(_) => {
            info!("Token is valid");
            Ok(next.run(req).await)
        }
        Err(_) => Err((
            StatusCode::UNAUTHORIZED,
            "Invalid or expired token".to_string(),
        )),
    }
}
