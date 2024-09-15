use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, PgPool};

#[derive(Debug, Deserialize, Serialize, FromRow)]
pub struct User {
    pub id: i32,
    pub email: String,
    pub password_hash: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
    pub last_login: Option<NaiveDateTime>, // Mantemos como Option para lidar com valores NULL
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

    // Propagando erros diretamente com `?`
    sqlx::query_as::<_, User>(query)
        .bind(email)
        .fetch_optional(pool)
        .await
}

pub async fn create_user(pool: &PgPool, new_user: NewUser) -> Result<User, sqlx::Error> {
    let query = r#"
        INSERT INTO users (email, password_hash)
        VALUES ($1, $2)
        RETURNING id, email, password_hash, created_at, updated_at, last_login
    "#;

    // O campo password deve ser o hash, não o texto puro
    sqlx::query_as::<_, User>(query)
        .bind(new_user.email)
        .bind(new_user.password) // Lembre-se de passar o hash da senha aqui
        .fetch_one(pool)
        .await
}
