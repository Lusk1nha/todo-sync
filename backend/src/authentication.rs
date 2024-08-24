use time::Duration;

use crate::{utils::is_valid_email, AppState};
use axum::{
    extract::{Request, State},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use http::StatusCode;

use axum_extra::extract::cookie::{Cookie, PrivateCookieJar, SameSite};

use serde::Deserialize;

use sqlx::Row; // Add this line to import the Row trait

#[derive(Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct UserSignUpRequest {
    username: String,
    email: String,
    password: String,
    confirm_password: String,
}

pub async fn signup(
    State(state): State<AppState>,
    Json(user): Json<UserSignUpRequest>,
) -> impl IntoResponse {
    if user.confirm_password != user.password {
        return (StatusCode::BAD_REQUEST, "Passwords do not match").into_response();
    }

    if !is_valid_email(&user.email) {
        return (StatusCode::BAD_REQUEST, "Invalid email").into_response();
    }

    let hashed_password = bcrypt::hash(&user.password, 10).unwrap();

    let query = sqlx::query("INSERT INTO users (username, email, password) values ($1, $2, $3)")
        .bind(user.username)
        .bind(user.email)
        .bind(hashed_password)
        .execute(&state.postgres);

    match query.await {
        Ok(_) => (StatusCode::CREATED, "Account created!".to_string()).into_response(),
        Err(e) => (
            StatusCode::BAD_REQUEST,
            format!("Something went wrong: {e}"),
        )
            .into_response(),
    }
}

#[derive(Deserialize)]
pub struct UserLoginRequest {
    email: String,
    password: String,
}

pub async fn login(
    State(state): State<AppState>,
    jar: PrivateCookieJar,
    Json(login): Json<UserLoginRequest>,
) -> Result<(PrivateCookieJar, StatusCode), StatusCode> {
    let query = sqlx::query("SELECT * FROM users WHERE email = $1")
        .bind(&login.email)
        .fetch_optional(&state.postgres);

    match query.await {
        Ok(res) => {
            if res.is_none() {
                return Err(StatusCode::BAD_REQUEST);
            }

            let user = res.unwrap();

            if bcrypt::verify(login.password, user.get("password")).is_err() {
                return Err(StatusCode::BAD_REQUEST);
            }

            const SESSION_QUERY: &str = "INSERT INTO sessions (session_id, user_id) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET session_id = EXCLUDED.session_id";
            let session_id = rand::random::<u64>().to_string();

            sqlx::query(SESSION_QUERY)
                .bind(&session_id)
                .bind(user.get::<i32, _>("id"))
                .execute(&state.postgres)
                .await
                .expect("Couldn't insert session :(");

            let cookie = Cookie::build("foo")
                .secure(true)
                .same_site(SameSite::Strict)
                .http_only(true)
                .path("/")
                .max_age(Duration::WEEK);

            Ok((jar.add(cookie), StatusCode::OK))
        }
        Err(_) => Err(StatusCode::BAD_REQUEST),
    }
}

pub async fn logout(
    State(state): State<AppState>,
    jar: PrivateCookieJar,
) -> Result<PrivateCookieJar, StatusCode> {
    let Some(cookie) = jar.get("foo").map(|cookie| cookie.value().to_owned()) else {
        return Ok(jar);
    };

    let query = sqlx::query("DELETE FROM sessions WHERE session_id = $1")
        .bind(cookie)
        .execute(&state.postgres);

    match query.await {
        Ok(_) => Ok(jar.remove(Cookie::build("foo"))),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

pub async fn validate_session(
    jar: PrivateCookieJar,
    State(state): State<AppState>,
    request: Request,
    next: Next,
) -> (PrivateCookieJar, Response) {
    let Some(cookie) = jar.get("foo").map(|cookie| cookie.value().to_owned()) else {
        println!("Couldn't find a cookie in the jar");
        return (
            jar,
            (StatusCode::FORBIDDEN, "Forbidden!".to_string()).into_response(),
        );
    };

    let find_session = sqlx::query("SELECT * FROM sessions WHERE session_id = $1")
        .bind(cookie)
        .execute(&state.postgres)
        .await;

    match find_session {
        Ok(_) => (jar, next.run(request).await),
        Err(_) => (
            jar,
            (StatusCode::FORBIDDEN, "Forbidden!".to_string()).into_response(),
        ),
    }
}
