use axum::{body::Body, response::Response};

use crate::{authentication::SessionToken, COOKIE_MAX_AGE, USER_COOKIE_NAME};

pub(crate) fn login_response(session_token: SessionToken) -> impl axum::response::IntoResponse {
    http::Response::builder()
        .status(http::StatusCode::ACCEPTED)
        .header("Path", "/")
        .header(
            "Set-Cookie",
            format!(
                "{}={}; Max-Age={}",
                USER_COOKIE_NAME,
                session_token.into_cookie_value(),
                COOKIE_MAX_AGE
            ),
        )
        .body(Body::empty())
        .unwrap()
}

pub(crate) fn logout_response() -> impl axum::response::IntoResponse {
    http::Response::builder()
        .status(http::StatusCode::ACCEPTED)
        .header("Path", "/")
        .header("Set-Cookie", format!("{}=''; Max-Age=0", USER_COOKIE_NAME))
        .body(Body::empty())
        .unwrap()
}

pub(crate) fn error_page(err: &dyn std::error::Error) -> impl axum::response::IntoResponse {
    Response::builder()
        .status(http::StatusCode::INTERNAL_SERVER_ERROR)
        .body(format!("Err: {}", err))
        .unwrap()
}
