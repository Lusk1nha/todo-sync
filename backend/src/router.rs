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
    authentication::{auth, logout, post_login, post_logout, post_signup},
    responses::logout_response,
    AppState,
};

pub async fn create_router(state: AppState) -> Router {
    let api_router = api_router(state);

    Router::new().nest("/api", api_router)
}

pub fn api_router(state: AppState) -> Router {
    let auth_router = auth_router();

    Router::new()
        .route("/health", get(health_check))
        .nest("/auth", auth_router)
        .with_state(state)
        .layer(CorsLayer::very_permissive())
        .layer(TraceLayer::new_for_http())
}

pub fn auth_router() -> Router<AppState> {
    Router::new()
        .route("/signup", post(post_signup))
        .route("/login", post(post_login))
        .route("/logout", post(post_logout))
}

#[derive(sqlx::FromRow, Deserialize, Serialize)]
pub struct User {
    id: i32,
    username: String,
    email: String,
    password: String,
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
