use crate::{
    auth_token::{create_auth_token, delete_auth_token},
    users::{create_user, get_user_by_email, NewUser},
    AppState,
};
use axum::{
    body::Body,
    extract::State,
    http::{HeaderMap, Response, StatusCode},
    response::IntoResponse,
    Json,
};
use bcrypt::{hash, verify, DEFAULT_COST};
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::sync::Arc;
use tracing::debug;

pub async fn signup(
    State(data): State<Arc<AppState>>,
    Json(new_user): Json<NewUser>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    debug!("Creating new user: {:?}", new_user);

    // Verifique se o usuário já existe
    match get_user_by_email(&data.db, &new_user.email).await {
        Ok(Some(_)) => {
            return Err((
                StatusCode::BAD_REQUEST,
                Json(json!({ "error": "User already exists" })),
            ));
        }
        Ok(None) => {
            // Se não existir, continue com a criação
        }
        Err(e) => {
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Database error", "details": e.to_string() })),
            ));
        }
    }

    // Gerar hash da senha
    let password_hash = match hash_password(&new_user.password) {
        Ok(hash) => hash,
        Err(_) => {
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Failed to hash password" })),
            ));
        }
    };

    // Criar novo usuário
    let new_user = NewUser {
        email: new_user.email.clone(),
        password: password_hash,
    };

    let user = create_user(&data.db, new_user).await.map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({ "error": "Failed to create user", "details": e.to_string() })),
        )
    })?;

    // Criar token de autenticação
    let token = create_auth_token(user.id.clone(), &data.db)
        .await
        .map_err(|_e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Failed to create token" })),
            )
        })?;

    Ok(Json(json!({ "user": user, "token": token })))
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LoginUser {
    pub email: String,
    pub password: String,
}

pub async fn login(
    State(data): State<Arc<AppState>>,
    Json(user): Json<LoginUser>,
) -> impl IntoResponse {
    tracing::info!("Usuário tentando login: {}", user.email);

    let user_by_email = get_user_by_email(&data.db, &user.email).await.map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({ "error": "Failed to fetch user", "details": e.to_string() })),
        )
    });

    let existing_user = match user_by_email {
        Ok(Some(user)) => user,
        Ok(None) => {
            return Response::builder()
                .status(StatusCode::UNAUTHORIZED)
                .body(Body::empty())
                .unwrap()
        }
        Err(e) => {
            return Response::builder()
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .body(Body::empty())
                .unwrap()
        }
    };

    verify_password(&user.password, &existing_user.password_hash).unwrap();

    let token = create_auth_token(existing_user.id, &data.db)
        .await
        .map_err(|_e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Failed to create token" })),
            )
        })
        .unwrap();

    tracing::info!("Login bem-sucedido para o usuário: {}", existing_user.email);

    Response::builder()
        .status(StatusCode::ACCEPTED)
        .header("Path", "/")
        .header(
            "Set-Cookie",
            format!(
                "{}={}; Max-Age=3600; Path=/; SameSite=None; Secure",
                "user", token
            ),
        )
        .body(Body::empty())
        .unwrap()
}

pub async fn logout(State(data): State<Arc<AppState>>, headers: HeaderMap) -> impl IntoResponse {
    let cookies = headers.get("Cookie");
    debug!("Cookies: {:?}", cookies);

    let token = match headers.get("Authorization") {
        Some(value) => match value.to_str() {
            Ok(v) => v.trim_start_matches("Bearer ").to_string(),
            Err(_) => {
                return Response::builder()
                    .status(StatusCode::BAD_REQUEST)
                    .body(Body::empty())
                    .unwrap();
            }
        },
        None => {
            return Response::builder()
                .status(StatusCode::UNAUTHORIZED)
                .body(Body::empty())
                .unwrap();
        }
    };

    match delete_auth_token(&data.db, token).await {
        Ok(_) => {}
        Err(_) => {
            return Response::builder()
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .body(Body::empty())
                .unwrap();
        }
    }

    Response::builder()
        .status(StatusCode::ACCEPTED)
        .header("Path", "/")
        .header(
            "Set-Cookie",
            format!(
                "{}={}; Max-Age=0; Path=/; SameSite=None; Secure",
                "user", ""
            ),
        )
        .body(Body::empty())
        .unwrap()
}

// Função para gerar hash da senha
fn hash_password(password: &str) -> Result<String, bcrypt::BcryptError> {
    hash(password, DEFAULT_COST)
}

// Função para verificar a senha
fn verify_password(
    password: &str,
    hash: &str,
) -> Result<(), (StatusCode, Json<serde_json::Value>)> {
    match verify(password, hash) {
        Ok(true) => Ok(()),
        Ok(false) | Err(_) => Err((
            StatusCode::UNAUTHORIZED,
            Json(json!({ "error": "Invalid email or password" })),
        )),
    }
}
