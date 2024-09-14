use std::str::FromStr;

use time::Duration;

use crate::{
    errors::{LoginError, SessionError, SignupError},
    responses::{error_page, login_response, logout_response},
    utils::is_valid_email,
    AppState, Database, USER_COOKIE_NAME,
};
use axum::{
    extract::{Request, State},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use http::StatusCode;

use axum_extra::extract::cookie::{Cookie, PrivateCookieJar};

use serde::{Deserialize, Serialize};

use sqlx::PgPool;

#[derive(Clone, Copy)]
pub(crate) struct SessionToken(u128);

impl FromStr for SessionToken {
    type Err = <u128 as FromStr>::Err;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        s.parse().map(Self)
    }
}

impl SessionToken {
    pub fn generate_new() -> Self {
        let token = rand::random::<u128>();
        Self(token)
    }

    pub fn into_cookie_value(self) -> String {
        self.0.to_string()
    }

    pub fn into_database_value(self) -> Vec<u8> {
        self.0.to_le_bytes().to_vec()
    }
}

#[derive(Clone)]
pub(crate) struct AuthState(Option<(SessionToken, Option<User>, Database)>);

impl AuthState {
    pub fn logged_in(&self) -> bool {
        self.0.is_some()
    }
}

#[derive(sqlx::FromRow, Serialize, Clone)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub password: String,
}

#[derive(Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct UserSignUpRequest {
    username: String,
    email: String,
    password: String,
    confirm_password: String,
}

pub async fn post_signup(
    State(state): State<AppState>,
    Json(user): Json<UserSignUpRequest>,
) -> Response {
    if user.confirm_password != user.password {
        return (
            StatusCode::BAD_REQUEST,
            "Passwords do not match!".to_string(),
        )
            .into_response();
    }

    if !is_valid_email(&user.email) {
        return (StatusCode::BAD_REQUEST, "Invalid email!".to_string()).into_response();
    }

    match signup(&state.postgres, user).await {
        Ok(session_token) => login_response(session_token).into_response(),
        Err(error) => error_page(&error).into_response(),
    }
}

pub async fn signup(
    database: &PgPool,
    user: UserSignUpRequest,
) -> Result<SessionToken, SignupError> {
    let user_id: i32 = create_user(database, user.username, user.email, user.password)
        .await
        .unwrap();

    let session_token = new_session(database, user_id).await.unwrap();

    Ok(session_token)
}

#[derive(Deserialize)]
pub struct UserLoginRequest {
    email: String,
    password: String,
}

pub async fn login(database: &PgPool, login: UserLoginRequest) -> Result<SessionToken, LoginError> {
    const USER_QUERY: &str = "SELECT id, password FROM users WHERE email = $1";

    let row: Option<(i32, String)> = sqlx::query_as(USER_QUERY)
        .bind(&login.email)
        .fetch_optional(database)
        .await
        .unwrap();

    let (id, password) = if let Some(row) = row {
        row
    } else {
        return Err(LoginError::UserDoesNotExist);
    };

    let is_wrong_password = bcrypt::verify(login.password, &password).is_err();

    if is_wrong_password {
        return Err(LoginError::WrongPassword);
    }

    let session_token = new_session(database, id).await.unwrap();

    Ok(session_token)
}

pub async fn post_login(
    State(state): State<AppState>,
    Json(login_request): Json<UserLoginRequest>,
) -> impl IntoResponse {
    let session_token: Result<SessionToken, LoginError> =
        login(&state.postgres, login_request).await;

    match session_token {
        Ok(session_token) => login_response(session_token).into_response(),
        Err(error) => error_page(&error).into_response(),
    }
}

pub async fn post_logout(State(state): State<AppState>) -> impl IntoResponse {
    logout_response().into_response()
}

pub async fn logout(
    State(state): State<AppState>,
    jar: PrivateCookieJar,
) -> Result<PrivateCookieJar, StatusCode> {
    let cookie = jar
        .get(USER_COOKIE_NAME)
        .ok_or(StatusCode::UNAUTHORIZED)?
        .value()
        .to_owned();

    print!("cookie: {}", cookie);

    let query = sqlx::query("DELETE FROM sessions WHERE session_id = $1")
        .bind(cookie)
        .execute(&state.postgres);

    match query.await {
        Ok(_) => Ok(jar.remove(Cookie::build(USER_COOKIE_NAME))),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

/// **AUTH MIDDLEWARE**
pub async fn auth(
    mut req: Request,
    next: axum::middleware::Next,
    database: Database,
) -> axum::response::Response {
    let session_token = req
        .headers()
        .get_all("Cookie")
        .iter()
        .filter_map(|cookie| {
            cookie
                .to_str()
                .ok()
                .and_then(|cookie| cookie.parse::<cookie::Cookie>().ok())
        })
        .find_map(|cookie| {
            (cookie.name() == USER_COOKIE_NAME).then(move || cookie.value().to_owned())
        })
        .and_then(|cookie_value| cookie_value.parse::<SessionToken>().ok());

    req.extensions_mut()
        .insert(AuthState(session_token.map(|v| (v, None, database))));

    next.run(req).await
}

async fn create_user(
    database: &PgPool,
    username: String,
    email: String,
    password: String,
) -> Result<i32, SignupError> {
    const INSERT_USER: &str =
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id";

    let hashed_password = bcrypt::hash(&password, 10).unwrap();

    let fetch_one = sqlx::query_as(INSERT_USER)
        .bind(username)
        .bind(email)
        .bind(hashed_password)
        .fetch_one(database)
        .await;

    match fetch_one {
        Ok((user_id,)) => Ok(user_id),
        Err(sqlx::Error::Database(database))
            if database.constraint() == Some("users_email_key") =>
        {
            return Err(SignupError::EmailExists);
        }
        Err(_err) => {
            return Err(SignupError::InternalError);
        }
    }
}

async fn new_session(database: &PgPool, user_id: i32) -> Result<SessionToken, SessionError> {
    const SESSION_QUERY: &str = "INSERT INTO sessions (session_id, user_id) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET session_id = EXCLUDED.session_id";
    let session_token = SessionToken::generate_new();

    match sqlx::query(SESSION_QUERY)
        .bind(session_token.into_database_value())
        .bind(user_id)
        .execute(database)
        .await
    {
        Ok(_) => Ok(session_token),
        Err(_err) => Err(SessionError::InternalError),
    }
}
