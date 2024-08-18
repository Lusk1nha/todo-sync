mod users;

use axum::{Extension, Router};
use sqlx::{Pool, Postgres};
use tower_http::cors::CorsLayer;
use tower_http::trace::TraceLayer;

#[derive(Clone)]
struct ApiContext {
    db: Pool<Postgres>,
}

// This function will start the server.
pub async fn serve(db: Pool<Postgres>) {
    let app = api_router()
        .layer(CorsLayer::permissive())
        .layer(TraceLayer::new_for_http())
        .layer(Extension(ApiContext { db }));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:8080")
        .await
        .unwrap();

    println!("🚀 listening on {}", listener.local_addr().unwrap());

    axum::serve(listener, app.into_make_service())
        .await
        .unwrap();
}

fn api_router() -> Router {
    users::router()
}
