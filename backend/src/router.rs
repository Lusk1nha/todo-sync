use axum::{
    extract::State,
    http::StatusCode,
    middleware,
    response::{IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};

use serde::{Deserialize, Serialize};
use tower_http::{cors::CorsLayer, trace::TraceLayer};

use http::{
    header::{ACCEPT, AUTHORIZATION, ORIGIN},
    HeaderValue, Method,
};

use crate::{
    authentication::{login, logout, signup, validate_session},
    AppState,
};

pub async fn create_router(state: AppState) -> Router {
    let api_router = api_router(state);

    Router::new().nest("/api", api_router)
}

pub fn api_router(state: AppState) -> Router {
    let cors = get_cors(&state);

    let users_router = users_router(state.clone());
    let auth_router = auth_router();

    Router::new()
        .route("/health", get(health_check))
        .nest("/users", users_router)
        .nest("/auth", auth_router)
        .with_state(state)
        .layer(CorsLayer::permissive())
        .layer(TraceLayer::new_for_http())
}

pub fn auth_router() -> Router<AppState> {
    Router::new()
        .route("/signup", post(signup))
        .route("/login", post(login))
        .route("/logout", post(logout))
}

pub fn users_router(state: AppState) -> Router<AppState> {
    Router::new()
        .route("/", get(get_users))
        .route_layer(middleware::from_fn_with_state(
            state.clone(),
            validate_session,
        ))
}

#[derive(sqlx::FromRow, Deserialize, Serialize)]
pub struct User {
    id: i32,
    username: String,
    email: String,
    password: String,
}

pub async fn get_users(State(state): State<AppState>) -> Json<Vec<User>> {
    let users: Vec<User> = sqlx::query_as("SELECT * FROM users")
        .fetch_all(&state.postgres)
        .await
        .unwrap();

    Json(users)
}

pub fn get_cors(state: &AppState) -> CorsLayer {
    CorsLayer::new()
        .allow_credentials(true)
        .allow_methods(vec![Method::GET, Method::POST, Method::PUT, Method::DELETE])
        .allow_headers(vec![ORIGIN, AUTHORIZATION, ACCEPT])
        .allow_origin(state.domain.parse::<HeaderValue>().unwrap())
}

async fn health_check() -> Response {
    (StatusCode::OK, "OK!").into_response()
}
