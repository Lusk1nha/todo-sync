use axum::http::StatusCode;
use axum::routing::post;
use axum::{Extension, Json, Router};

use serde::{Deserialize, Serialize};

use argon2::password_hash::SaltString;
use argon2::{Argon2, PasswordHash};

use uuid::Uuid;

use super::ApiContext;

pub fn router() -> Router {
    Router::new()
        .route("/users", post(create_user))
        .route("/users/login", post(login_user))
}

#[derive(Deserialize)]
pub struct CreateUserSchema {
    username: Option<String>,
    email: String,
    password: String,
}

#[derive(Deserialize)]
pub struct LoginUserSchema {
    email: String,
    password: String,
}

#[derive(Serialize, Deserialize)]
#[allow(non_snake_case)]
pub struct User {
    user_id: Uuid,
    username: String,
    email: String,
    token: String,
}

pub async fn create_user(
    ctx: Extension<ApiContext>,
    Json(req): Json<CreateUserSchema>,
) -> Result<String, StatusCode> {
    let password_hash = match hash_password(req.password.clone()) {
        Ok(hash) => hash,
        Err(err) => {
            println!("🔥 Failed to hash password: {:?}", err);
            return Err(StatusCode::INTERNAL_SERVER_ERROR);
        }
    };

    match sqlx::query_scalar!(
        r#"INSERT INTO users (user_id, username, email, password_hash)
        VALUES ($1, $2, $3, $4)
        RETURNING user_id"#,
        uuid::Uuid::new_v4(),
        req.username.clone(),
        req.email.clone(),
        password_hash
    )
    .fetch_one(&ctx.db)
    .await
    {
        Ok(id) => Ok(id.to_string()),
        Err(err) => {
            println!("🔥 Failed to create user: {:?}", err);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

pub async fn login_user(
    ctx: Extension<ApiContext>,
    Json(req): Json<LoginUserSchema>,
) -> Result<Json<User>, StatusCode> {
    let user = match sqlx::query!(
        r#"SELECT user_id, email, username, password_hash FROM users WHERE email = $1"#,
        req.email.clone()
    )
    .fetch_one(&ctx.db)
    .await
    {
        Ok(user) => user,
        Err(err) => {
            println!("🔥 Failed to login user: {:?}", err);
            return Err(StatusCode::INTERNAL_SERVER_ERROR);
        }
    };

    println!("🔥 User: {:?}", user);

    match verify_password(req.password, user.password_hash) {
        Ok(value) => {
            if !value {
                return Err(StatusCode::UNAUTHORIZED);
            }

            Ok(Json(User {
                user_id: user.user_id,
                username: user.username.unwrap_or_else(|| "unknown".to_string()),
                email: user.email,
                token: "token".to_string(),
            }))
        }
        Err(_err) => Err(StatusCode::UNAUTHORIZED),
    }
}

fn hash_password(password: String) -> Result<String, argon2::password_hash::Error> {
    let salt = SaltString::generate(&mut rand::thread_rng());
    let argon2 = Argon2::default();
    let password_hash = PasswordHash::generate(argon2, password, &salt)?;

    Ok(password_hash.to_string())
}

fn verify_password(
    password: String,
    password_hash: String,
) -> Result<bool, argon2::password_hash::Error> {
    let parsed_hash = PasswordHash::new(&password_hash)?;
    let argon2 = Argon2::default();

    Ok(parsed_hash
        .verify_password(&[&argon2], password.as_bytes())
        .is_ok())
}
