mod auth;
mod auth_token;
mod database;
mod jwt;
mod router;
mod users;

use std::sync::Arc;

use axum::{routing::get, Router};
use router::create_router;
use sqlx::{Pool, Postgres};

use tracing::{debug, error, info, Level};

use database::{create_pool, run_migrations};
use dotenv::dotenv;

pub struct AppState {
    db: Pool<Postgres>,
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_max_level(Level::TRACE) // Captura todos os logs
        .with_ansi(true) // Ativa a formatação ANSI (cores)
        .init();

    dotenv().ok();

    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");
    let pool = match create_pool(&database_url).await {
        Ok(pool) => {
            info!("Successfully created connection pool");
            pool
        }
        Err(e) => {
            error!("Failed to create connection pool: {:?}", e);
            return;
        }
    };

    match run_migrations(&pool).await {
        Ok(_) => {
            info!("Migrations ran successfully");
        }
        Err(e) => {
            error!("Failed to run migrations: {:?}", e);
            return;
        }
    }

    let state = Arc::new(AppState { db: pool.clone() });

    // build our application with a route
    let api = create_router(state).await;

    // run our api with hyper
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    tracing::debug!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, api).await.unwrap();
}
