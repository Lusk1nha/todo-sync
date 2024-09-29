use std::sync::Arc;

use axum::{
    body::Body,
    extract::State,
    http::{HeaderMap, Response, StatusCode},
    response::IntoResponse,
    Json,
};
use chrono::{DateTime, Utc};
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

#[derive(Debug, Serialize, Deserialize)]
pub struct NewUserProfile {
    pub username: String,
    pub date_of_birth: Option<DateTime<Utc>>,
    pub profile_picture_url: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateUserProfile {
    pub username: Option<String>,
    pub date_of_birth: Option<DateTime<Utc>>,
    pub profile_picture_url: Option<String>,
}

pub async fn get_user_profile_by_id(
    pool: &PgPool,
    user_id: &i32,
) -> Result<Option<UserProfile>, sqlx::Error> {
    let query = r#"
        SELECT user_id, username, date_of_birth, profile_picture_url, created_at, updated_at
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

async fn create_user_profile(
    pool: &PgPool,
    user_id: i32,
    data: &NewUserProfile,
) -> Result<UserProfile, sqlx::Error> {
    let query = r#"
      INSERT INTO user_profiles (user_id, username, date_of_birth, profile_picture_url)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id, username, date_of_birth, profile_picture_url, created_at, updated_at
    "#;

    let new_profile = NewUserProfile {
        username: data.username.clone(),
        date_of_birth: data.date_of_birth,
        profile_picture_url: data.profile_picture_url.clone(),
    };

    tracing::debug!("Creating user profile: {:?}", new_profile);

    sqlx::query_as::<_, UserProfile>(query)
        .bind(user_id)
        .bind(&new_profile.username)
        .bind(&new_profile.date_of_birth)
        .bind(&new_profile.profile_picture_url)
        .fetch_one(pool)
        .await
}

pub async fn create_user_profile_route(
    State(data): State<Arc<AppState>>,
    headers: HeaderMap,
    Json(payload): Json<NewUserProfile>,
) -> Result<impl IntoResponse, (StatusCode, &'static str)> {
    tracing::info!("Creating user profile: {:?}", payload);

    let token = get_headers_token(&headers)
        .ok_or((StatusCode::UNAUTHORIZED, "Unauthorized"))?
        .trim_start_matches("Bearer ")
        .to_string();

    let user_id = get_auth_token(&data.db, token)
        .await
        .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, "Error checking token"))?
        .ok_or((StatusCode::UNAUTHORIZED, "Invalid token"))?
        .user_id;

    tracing::debug!("User ID: {}", user_id);

    create_user_profile(&data.db, user_id, &payload)
        .await
        .map_err(|e| {
            let err_msg: &'static str = Box::leak(e.to_string().into_boxed_str());
            (StatusCode::INTERNAL_SERVER_ERROR, err_msg)
        })
        .map(|profile| (StatusCode::CREATED, Json(profile)).into_response())
}

async fn update_user_profile(
    pool: &PgPool,
    user_id: i32,
    data: &UpdateUserProfile,
) -> Result<UserProfile, sqlx::Error> {
    let query = r#"
         UPDATE user_profiles
         SET username = COALESCE($2, username),
             date_of_birth = COALESCE($3, date_of_birth),
             profile_picture_url = COALESCE($4, profile_picture_url)
         WHERE user_id = $1
         RETURNING user_id, username, date_of_birth, profile_picture_url, created_at, updated_at
     "#;

    let update_profile = UpdateUserProfile {
        username: data.username.clone(),
        date_of_birth: data.date_of_birth,
        profile_picture_url: data.profile_picture_url.clone(),
    };

    tracing::debug!("Updating user profile: {:?}", update_profile);

    sqlx::query_as::<_, UserProfile>(query)
        .bind(user_id)
        .bind(&update_profile.username)
        .bind(&update_profile.date_of_birth)
        .bind(&update_profile.profile_picture_url)
        .fetch_one(pool)
        .await
}

pub async fn update_user_profile_route(
    State(data): State<Arc<AppState>>,
    headers: HeaderMap,
    Json(payload): Json<UpdateUserProfile>,
) -> Result<impl IntoResponse, (StatusCode, &'static str)> {
    tracing::info!("Updating user profile: {:?}", payload);

    let token = get_headers_token(&headers)
        .ok_or((StatusCode::UNAUTHORIZED, "Unauthorized"))?
        .trim_start_matches("Bearer ")
        .to_string();

    let user_id = get_auth_token(&data.db, token)
        .await
        .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, "Error checking token"))?
        .ok_or((StatusCode::UNAUTHORIZED, "Invalid token"))?
        .user_id;

    tracing::debug!("User ID: {}", user_id);

    update_user_profile(&data.db, user_id, &payload)
        .await
        .map_err(|e| {
            let err_msg: &'static str = Box::leak(e.to_string().into_boxed_str());
            (StatusCode::INTERNAL_SERVER_ERROR, err_msg)
        })
        .map(|profile| (StatusCode::OK, Json(profile)).into_response())
}
