use axum::{http::StatusCode, response::IntoResponse, Json};

use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, PgPool};

use serde_json::json;

#[derive(Debug, Deserialize, Serialize, FromRow)]
pub struct User {
    pub id: i32,
    pub email: String,
    pub password_hash: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
    pub last_login: Option<NaiveDateTime>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NewUser {
    pub email: String,
    pub password: String,
}

pub async fn get_user_by_email(pool: &PgPool, email: &str) -> Result<Option<User>, sqlx::Error> {
    let query = r#"
    SELECT id, email, password_hash, created_at, updated_at, last_login
    FROM users
    WHERE email = $1
  "#;

    match sqlx::query_as::<_, User>(query)
        .bind(email)
        .fetch_optional(pool)
        .await
    {
        Ok(user) => Ok(user),
        Err(e) => Err(e),
    }
}

pub async fn create_user(
    pool: &PgPool,
    new_user: NewUser,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let query = r#"
  INSERT INTO users (email, password_hash)
  VALUES ($1, $2)
  RETURNING id, email, created_at, updated_at, last_login
"#;

    match sqlx::query_as::<_, User>(query)
        .bind(new_user.email)
        .bind(new_user.password)
        .fetch_one(pool)
        .await
    {
        Ok(user) => {
            let user_response = json!({
              "id": user.id,
              "email": user.email,
              "password_hash": user.password_hash,
              "created_at": user.created_at,
              "updated_at": user.updated_at,
              "last_login": user.last_login,
            });

            return Ok((StatusCode::CREATED, Json(user_response)));
        }
        Err(e) => {
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": e.to_string() })),
            ));
        }
    }
}
