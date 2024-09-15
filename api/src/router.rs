use std::sync::Arc;

use axum::{
    http::{
        header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE},
        HeaderValue, Method,
    },
    middleware,
    routing::{get, post},
    Router,
};
use tower_http::cors::CorsLayer;

use crate::{
    auth::{login, signup},
    auth_token::auth_middleware,
    AppState,
};

const API_PATH: &str = "/api";
const SIGNUP_PATH: &str = "/signup";
const LOGIN_PATH: &str = "/login";
const AUTH_PATH: &str = "/auth";

const HEALTH_CHECK_PATH: &str = "/health_check";

/// Creates the main application router with CORS configuration.
pub async fn create_router(app_state: Arc<AppState>) -> Router {
    let routes = nested_router(app_state.clone());
    Router::new().nest(API_PATH, routes).layer(configure_cors())
}

fn configure_cors() -> CorsLayer {
    let origin = "http://localhost:5173"
        .parse::<HeaderValue>()
        .expect("Failed to parse CORS origin header value");

    CorsLayer::new()
        .allow_origin(origin)
        .allow_methods([Method::GET, Method::POST, Method::PATCH, Method::DELETE])
        .allow_credentials(true)
        .allow_headers([AUTHORIZATION, ACCEPT, CONTENT_TYPE])
}

fn nested_router(app_state: Arc<AppState>) -> Router {
    let auth = auth_routes(app_state.clone());
    let protected = protected_routes(app_state);

    auth.merge(protected)
}

fn auth_routes(app_state: Arc<AppState>) -> Router {
    Router::new()
        .route(SIGNUP_PATH, post(signup))
        .route(LOGIN_PATH, post(login))
        .with_state(app_state)
}

fn protected_routes(app_state: Arc<AppState>) -> Router {
    Router::new()
        .route(HEALTH_CHECK_PATH, get(health_check))
        .layer(middleware::from_fn(auth_middleware))
        .with_state(app_state)
}

pub async fn health_check() -> &'static str {
    "I'm alive!"
}
