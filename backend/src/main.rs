mod authentication;
mod database;
mod errors;
mod responses;
mod router;
mod utils;

use std::env;

use axum::extract::FromRef;
use axum_extra::extract::cookie::Key;
use database::get_connection_pool;

use dotenv::dotenv;
use sqlx::PgPool;

#[derive(Clone)]
pub struct AppState {
    key: Key,
    postgres: PgPool,
    smtp_email: String,
    smtp_password: String,
    domain: String,
}

impl FromRef<AppState> for Key {
    fn from_ref(state: &AppState) -> Self {
        state.key.clone()
    }
}

type Database = sqlx::PgPool;
const USER_COOKIE_NAME: &str = "user_token";
const COOKIE_MAX_AGE: &str = "9999999";

#[tokio::main]
async fn main() {
    dotenv().ok();

    let database_url: String = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let smtp_email: String = env::var("SMTP_EMAIL").expect("SMTP_EMAIL must be set");
    let smtp_password: String = env::var("SMTP_PASSWORD").expect("SMTP_PASSWORD must be set");
    let domain: String = env::var("DOMAIN").expect("DOMAIN must be set");

    let postgres = get_connection_pool(&database_url).await.unwrap();

    sqlx::migrate!()
        .run(&postgres)
        .await
        .expect("Failed to migrate the database");

    env_logger::init();

    let state = AppState {
        postgres,
        key: Key::generate(),
        smtp_email,
        smtp_password,
        domain,
    };

    let router = router::create_router(state).await;

    let listener = tokio::net::TcpListener::bind("127.0.0.1:8080")
        .await
        .unwrap();

    println!("🚀 listening on {}", listener.local_addr().unwrap());

    axum::serve(listener, router.into_make_service())
        .await
        .unwrap();
}
