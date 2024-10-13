use std::sync::Arc;

use axum::{
    body::Body,
    extract::{Path, State},
    http::{HeaderMap, Response, StatusCode},
    response::IntoResponse,
    Json,
};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{prelude::FromRow, PgPool};
use uuid::Uuid;

use crate::{auth::get_headers_token, auth_token::get_auth_token, AppState};

#[derive(Debug, Serialize, Deserialize, FromRow)]

pub struct Folder {
    pub id: Uuid,
    pub user_id: i32,

    pub name: String,
    pub description: Option<String>,
    pub color: String,

    pub created_at: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
}

pub struct NewFolder {
    pub id: Uuid,
    pub user_id: i32,
    pub name: String,
    pub description: Option<String>,
    pub color: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NewFolderPayload {
    pub name: String,
    pub description: Option<String>,
    pub color: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateFolder {
    pub name: Option<String>,
    pub description: Option<String>,
    pub color: Option<String>,
}

pub async fn get_folders_by_user_id(
    pool: &PgPool,
    user_id: &i32,
) -> Result<Vec<Folder>, sqlx::Error> {
    let query = r#"
        SELECT id, user_id, name, description, color, created_at, updated_at
        FROM folders
        WHERE user_id = $1
    "#;

    sqlx::query_as::<_, Folder>(query)
        .bind(user_id)
        .fetch_all(pool)
        .await
}

pub async fn get_folder_by_id(pool: &PgPool, folder_id: &Uuid) -> Result<Folder, sqlx::Error> {
    let query = r#"
        SELECT id, user_id, name, description, color, created_at, updated_at
        FROM folders
        WHERE id = $1
    "#;

    sqlx::query_as::<_, Folder>(query)
        .bind(folder_id)
        .fetch_one(pool)
        .await
}

pub async fn get_folder_by_id_route(
    State(data): State<Arc<AppState>>,
    Path(folder_id): Path<Uuid>,
) -> impl IntoResponse {
    tracing::debug!("Getting folder by ID");

    match get_folder_by_id(&data.db, &folder_id).await {
        Ok(folder) => {
            let response = Json(folder);
            response.into_response()
        }
        Err(e) => Response::builder()
            .status(StatusCode::INTERNAL_SERVER_ERROR)
            .body(Body::from(format!("Error: {}", e)))
            .unwrap(),
    }
}

pub async fn get_folders_by_user_id_route(
    State(data): State<Arc<AppState>>,
    headers: HeaderMap,
) -> impl IntoResponse {
    tracing::debug!("Getting folders by user ID");

    let token = match get_headers_token(&headers) {
        Some(value) => value.trim_start_matches("Bearer ").to_string(),
        None => {
            return Response::builder()
                .status(StatusCode::UNAUTHORIZED)
                .body(Body::empty())
                .unwrap();
        }
    };

    tracing::debug!("Token folder: {}", token);

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

    tracing::debug!("User ID: {}", user_id);

    match get_folders_by_user_id(&data.db, &user_id).await {
        Ok(folders) => {
            let response = Json(folders);
            response.into_response()
        }
        Err(e) => Response::builder()
            .status(StatusCode::INTERNAL_SERVER_ERROR)
            .body(Body::from(format!("Error: {}", e)))
            .unwrap(),
    }
}

pub async fn create_folder(pool: &PgPool, new_folder: &NewFolder) -> Result<Folder, sqlx::Error> {
    let query = r#"
        INSERT INTO folders (id, user_id, name, description, color)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, user_id, name, description, color, created_at, updated_at
    "#;

    sqlx::query_as::<_, Folder>(query)
        .bind(&new_folder.id)
        .bind(&new_folder.user_id)
        .bind(&new_folder.name)
        .bind(&new_folder.description)
        .bind(&new_folder.color)
        .fetch_one(pool)
        .await
}

pub async fn create_folder_route(
    State(data): State<Arc<AppState>>,
    headers: HeaderMap,
    Json(payload): Json<NewFolderPayload>,
) -> Result<impl IntoResponse, (StatusCode, &'static str)> {
    let token = get_headers_token(&headers)
        .ok_or((StatusCode::UNAUTHORIZED, "Unauthorized"))?
        .trim_start_matches("Bearer ")
        .to_string();

    let user_id = get_auth_token(&data.db, token)
        .await
        .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, "Error checking token"))?
        .ok_or((StatusCode::UNAUTHORIZED, "Invalid token"))?
        .user_id;

    let new_folder = NewFolder {
        id: Uuid::new_v4(),
        user_id,
        name: payload.name.clone(),
        description: payload.description.clone(),
        color: payload.color.clone(),
    };

    create_folder(&data.db, &new_folder)
        .await
        .map_err(|e| {
            let err_msg: &'static str = Box::leak(e.to_string().into_boxed_str());
            (StatusCode::INTERNAL_SERVER_ERROR, err_msg)
        })
        .map(|folder| (StatusCode::CREATED, Json(folder)).into_response())
}
