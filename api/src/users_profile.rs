use std::sync::Arc;

use axum::{
    body::Body,
    extract::State,
    http::{HeaderMap, Response, StatusCode},
    response::IntoResponse,
};
use serde::{Deserialize, Serialize};
use sqlx::{prelude::FromRow, PgPool};

use crate::{auth::get_headers_token, auth_token::get_auth_token, AppState};

#[derive(Debug, Deserialize, Serialize, FromRow)]
pub struct UserProfile {
    pub user_id: i32,
    pub username: String,

    pub date_of_birth: Option<chrono::NaiveDate>,
    pub profile_picture_url: Option<String>,

    pub created_at: chrono::NaiveDateTime,
}

pub struct NewUserProfile {
    pub user_id: i32,
    pub username: String,
    pub date_of_birth: Option<chrono::NaiveDate>,
    pub profile_picture_url: Option<String>,
}

pub struct UpdateUserProfile {
    pub username: Option<String>,
    pub date_of_birth: Option<chrono::NaiveDate>,
    pub profile_picture_url: Option<String>,
}

pub async fn get_user_profile_by_id(
    pool: &PgPool,
    user_id: &i32,
) -> Result<Option<UserProfile>, sqlx::Error> {
    let query = r#"
        SELECT user_id, username, date_of_birth, profile_picture_url, created_at
        FROM user_profiles
        WHERE user_id = $1
    "#;

    sqlx::query_as::<_, UserProfile>(query)
        .bind(user_id)
        .fetch_optional(pool)
        .await
}

pub async fn get_current_user(
    State(data): State<Arc<AppState>>,
    headers: HeaderMap,
) -> impl IntoResponse {
    let token = match get_headers_token(&headers) {
        Some(value) => value.trim_start_matches("Bearer ").to_string(),
        None => {
            return Response::builder()
                .status(StatusCode::UNAUTHORIZED)
                .body(Body::empty())
                .unwrap();
        }
    };

    let user_id = match get_auth_token(&data.db, token).await {
        Ok(token) => match token {
            Some(token) => token.user_id,
            None => {
                return Response::builder()
                    .status(StatusCode::UNAUTHORIZED)
                    .body(Body::empty())
                    .unwrap();
            }
        },
        Err(_) => {
            return Response::builder()
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .body(Body::empty())
                .unwrap();
        }
    };

    match get_user_profile_by_id(&data.db, &user_id).await {
        Ok(profile) => match profile {
            Some(profile) => Response::builder()
                .status(StatusCode::OK)
                .body(Body::from(serde_json::to_string(&profile).unwrap()))
                .unwrap(),
            None => Response::builder()
                .status(StatusCode::ACCEPTED)
                .body(Body::empty())
                .unwrap(),
        },
        Err(_) => Response::builder()
            .status(StatusCode::INTERNAL_SERVER_ERROR)
            .body(Body::empty())
            .unwrap(),
    }
}
