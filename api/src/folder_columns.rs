use std::sync::Arc;

use axum::{
    body::Body,
    extract::{Path, State},
    http::{Response, StatusCode},
    response::IntoResponse,
    Json,
};
use serde::{Deserialize, Serialize};
use sqlx::{prelude::FromRow, PgPool};
use uuid::Uuid;

use crate::AppState;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct FolderColumn {
    pub id: Uuid,
    pub folder_id: Uuid,
    pub name: String,
    pub position: i32,
    pub color: String,
    pub created_at: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NewFolderColumn {
    pub id: Uuid,
    pub folder_id: Uuid,
    pub name: String,
    pub position: i32,
    pub color: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NewFolderColumnPayload {
    pub folder_id: Uuid,
    pub name: String,
    pub position: i32,
    pub color: String,
}

pub async fn get_columns_by_folder(
    pool: &PgPool,
    folder_id: &Uuid,
) -> Result<Vec<FolderColumn>, sqlx::Error> {
    let query = r#"
    SELECT id, folder_id, name, position, color, created_at, updated_at
    FROM folder_columns
    WHERE folder_id = $1
  "#;

    sqlx::query_as::<_, FolderColumn>(query)
        .bind(folder_id)
        .fetch_all(pool)
        .await
}

pub async fn get_columns_by_folder_route(
    State(data): State<Arc<AppState>>,
    Path(folder_id): Path<Uuid>,
) -> impl IntoResponse {
    match get_columns_by_folder(&data.db, &folder_id).await {
        Ok(columns) => {
            let response = Json(columns);
            response.into_response()
        }
        Err(e) => {
            return Response::builder()
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .body(Body::from(format!("Error: {}", e)))
                .unwrap()
        }
    }
}

pub async fn create_folder_column(
    pool: &PgPool,
    new_folder_column: &NewFolderColumn,
) -> Result<FolderColumn, sqlx::Error> {
    let query = r#"
    INSERT INTO folder_columns (id, folder_id, name, position, color)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, folder_id, name, position, created_at, updated_at, color
  "#;

    let new_folder_column = sqlx::query_as::<_, FolderColumn>(query)
        .bind(new_folder_column.id)
        .bind(new_folder_column.folder_id)
        .bind(new_folder_column.name.clone())
        .bind(new_folder_column.position)
        .bind(new_folder_column.color.clone())
        .fetch_one(pool)
        .await?;

    Ok(new_folder_column)
}

pub async fn create_folder_column_route(
    State(data): State<Arc<AppState>>,
    Json(new_folder_column): Json<NewFolderColumnPayload>,
) -> impl IntoResponse {
    let new_folder_column = NewFolderColumn {
        id: Uuid::new_v4(),
        folder_id: new_folder_column.folder_id,
        name: new_folder_column.name.clone(),
        position: new_folder_column.position,
        color: new_folder_column.color.clone(),
    };

    tracing::debug!("New folder column: {:?}", new_folder_column);

    match create_folder_column(&data.db, &new_folder_column).await {
        Ok(folder_column) => {
            let response = Json(folder_column);
            response.into_response()
        }
        Err(e) => {
            return Response::builder()
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .body(Body::from(format!("Error: {}", e)))
                .unwrap()
        }
    }
}
