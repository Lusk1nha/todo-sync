use axum::{
    body::Body,
    extract::State,
    http::{Request, StatusCode},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use chrono::{NaiveDateTime, Utc};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::{prelude::FromRow, PgPool};

use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use std::env;

use crate::AppState;

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

pub async fn create_auth_token(user_id: i32, db: &PgPool) -> Result<String, (StatusCode, String)> {
    // Create JWT
    let token = create_jwt(user_id)
        .map_err(|e| {
            tracing::error!("Failed to create JWT: {:?}", e);
            (
                axum::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Failed to create token".to_string(),
            )
        })
        .unwrap();

    // Store the token in the database
    let expires_at = Utc::now() + chrono::Duration::hours(1);
    let expires_at_naive = expires_at.naive_utc(); // Convert to NaiveDateTime

    store_token(db, user_id, &token, expires_at_naive)
        .await
        .unwrap();

    Ok(token)
}

async fn store_token(
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

pub async fn delete_auth_token(db: &PgPool, token: String) -> Result<(), (StatusCode, String)> {
    let query = r#"
      DELETE FROM auth_tokens
      WHERE token = $1
    "#;

    sqlx::query(query)
        .bind(token)
        .execute(db)
        .await
        .map_err(|e| {
            tracing::error!("Failed to delete token: {:?}", e);
            (
                axum::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Failed to delete token".to_string(),
            )
        })?;

    Ok(())
}

pub async fn auth_middleware(
    req: Request<Body>,
    next: Next,
    db: &PgPool,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let token = match req.headers().get("Authorization") {
        Some(value) => match value.to_str() {
            Ok(v) => {
                tracing::info!("Token encontrado: {}", v);
                v.trim_start_matches("Bearer ").to_string()
            }
            Err(_) => {
                tracing::error!("Formato inválido no cabeçalho Authorization");
                return Err((
                    StatusCode::BAD_REQUEST,
                    Json(json!({ "error": "Invalid token format" })),
                ));
            }
        },
        None => {
            tracing::error!("Token não encontrado no cabeçalho Authorization");
            return Err((
                StatusCode::UNAUTHORIZED,
                Json(json!({ "error": "Missing token" })),
            ));
        }
    };

    // Verificar o token JWT
    let claims = match verify_jwt(&token) {
        Ok(token_data) => {
            tracing::info!("Token válido");
            token_data
        }
        Err(_) => {
            tracing::error!("Token inválido ou expirado");
            return Err((
                StatusCode::UNAUTHORIZED,
                Json(json!({ "error": "Invalid or expired token" })),
            ));
        }
    };

    // Verificar o token no banco de dados
    match get_jwt_in_db(db, &token, claims).await {
        Ok(token) => {
            if token.is_none() {
                tracing::error!("Token não encontrado no banco de dados");
                return Err((
                    StatusCode::UNAUTHORIZED,
                    Json(json!({ "error": "Invalid or expired token" })),
                ));
            }

            tracing::info!("Token verificado com sucesso");
            Ok(next.run(req).await)
        }
        Err(e) => {
            tracing::error!(
                "Falha ao verificar o token no banco de dados error = {:?}",
                e
            );
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Failed to verify token in database" })),
            ));
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    sub: i32,
    exp: usize,
}

pub fn create_jwt(user_id: i32) -> Result<String, jsonwebtoken::errors::Error> {
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    let claims = Claims {
        sub: user_id,
        exp: (chrono::Utc::now() + chrono::Duration::hours(1)).timestamp() as usize,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
}

pub fn verify_jwt(token: &str) -> Result<Claims, (StatusCode, Json<serde_json::Value>)> {
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");

    let token_data = match decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::default(),
    ) {
        Ok(data) => data,
        Err(_) => {
            return Err((
                StatusCode::UNAUTHORIZED,
                Json(json!({ "error": "Invalid or expired token" })),
            ));
        }
    };

    Ok(token_data.claims)
}

pub async fn get_jwt_in_db(
    db: &PgPool,
    token: &str,
    token_data: Claims,
) -> Result<Option<AuthToken>, sqlx::Error> {
    tracing::debug!(
        "Verificando token no banco de dados para o usuário {}",
        token_data.sub
    );
    
    let user_id = token_data.sub;

    let query = r#"
        SELECT token_id, token, user_id, expires_at, created_at
        FROM auth_tokens
        WHERE user_id = $1 AND token = $2
    "#;

    tracing::debug!("Executando query: {}", query);

    sqlx::query_as::<_, AuthToken>(query)
        .bind(user_id)
        .bind(token)
        .fetch_optional(db)
        .await
}
