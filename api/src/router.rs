use std::sync::Arc;

use axum::{
    extract::Request,
    http::{
        header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE},
        HeaderValue, Method, StatusCode,
    },
    middleware::{from_fn, Next},
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use tower::ServiceBuilder;
use tower_http::cors::CorsLayer;

use crate::{
    auth::{login, logout, signup},
    auth_token::auth_middleware,
    users_profile::{create_user_profile_route, get_current_user, update_user_profile_route},
    AppState,
};

const API_PATH: &str = "/api";

const SIGNUP_PATH: &str = "/signup";
const LOGIN_PATH: &str = "/login";
const LOGOUT_PATH: &str = "/logout";

const USERS_GROUP_PATH: &str = "/users";
const USERS_CURRENT_PATH: &str = "/current-user";
const USERS_CREATE_PATH: &str = "/settings";

const HEALTH_CHECK_PATH: &str = "/health-check";

/// Creates the main application router with CORS configuration.
pub async fn create_router(app_state: Arc<AppState>) -> Router {
    let routes = api_routes(app_state.clone());
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

fn api_routes(app_state: Arc<AppState>) -> Router {
    let health_check = Router::new().route(HEALTH_CHECK_PATH, get(health_check));

    let auth = auth_routes(app_state.clone());
    let protected = protected_routes(app_state.clone());

    auth.merge(health_check).merge(protected)
}

fn auth_routes(app_state: Arc<AppState>) -> Router {
    Router::new()
        .route(SIGNUP_PATH, post(signup))
        .route(LOGIN_PATH, post(login))
        .with_state(app_state)
}

fn users_routes(app_state: Arc<AppState>) -> Router<Arc<AppState>> {
    Router::new()
        .route(
            USERS_CURRENT_PATH,
            get(get_current_user).patch(update_user_profile_route),
        )
        .route(USERS_CREATE_PATH, post(create_user_profile_route))
        .with_state(app_state)
}

// Middleware ajustado para aceitar `Arc<AppState>`
async fn auth_middleware_fn(
    req: Request<axum::body::Body>,
    next: Next,
    app_state: Arc<AppState>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    auth_middleware(req, next, &app_state.db).await
}

fn protected_routes(app_state: Arc<AppState>) -> Router {
    let users = users_routes(app_state.clone());

    Router::new()
        .route(LOGOUT_PATH, post(logout))
        .nest(USERS_GROUP_PATH, users)
        .layer(ServiceBuilder::new().layer(from_fn({
            let app_state = app_state.clone(); // Clone app_state for the async block
            move |req, next| {
                let state = app_state.clone(); // Clone for use in the async block
                async move { auth_middleware_fn(req, next, state).await }
            }
        })))
        .with_state(app_state)
}

pub async fn health_check() -> &'static str {
    "I'm alive!"
}
