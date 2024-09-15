use std::sync::Arc;

use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};

use bcrypt::{hash, DEFAULT_COST};
use chrono::Utc;
use serde::{Deserialize, Serialize};
use serde_json::json;
use tracing::debug;

use crate::{
    auth_token::store_token,
    jwt::create_jwt,
    users::{create_user, get_user_by_email, NewUser},
    AppState,
};

pub async fn signup(
    State(data): State<Arc<AppState>>,
    Json(new_user): Json<NewUser>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    debug!("Creating new user: {:?}", new_user);

    let existing_user = get_user_by_email(&data.db, &new_user.email).await.unwrap();

    if existing_user.is_some() {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(json!({ "error": "User already exists" })),
        ));
    }

    let password_hash = hash_password(&new_user.password);

    let new_user = NewUser {
        email: new_user.email.clone(),
        password: password_hash,
    };

    create_user(&data.db, new_user).await
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LoginUser {
    pub email: String,
    pub password: String,
}

pub async fn login(
    State(data): State<Arc<AppState>>,
    Json(user): Json<LoginUser>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let existing_user = get_user_by_email(&data.db, &user.email).await.unwrap();

    if existing_user.is_none() {
        return Err((
            StatusCode::UNAUTHORIZED,
            Json(json!({ "error": "Invalid email or password" })),
        ));
    }

    let existing_user = existing_user.unwrap();

    if !verify_password(&user.password, &existing_user.password_hash) {
        return Err((
            StatusCode::UNAUTHORIZED,
            Json(json!({ "error": "Invalid email or password" })),
        ));
    }

    // Create JWT
    let token = create_jwt(existing_user.id)
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

    store_token(&data.db, existing_user.id, &token, expires_at_naive)
        .await
        .unwrap();

    Ok(Json(json!({ "token": token })))
}

fn hash_password(password: &str) -> String {
    let hashed_password = hash(password, DEFAULT_COST);

    hashed_password.unwrap()
}

fn verify_password(password: &str, hash: &str) -> bool {
    bcrypt::verify(password, hash).unwrap()
}
