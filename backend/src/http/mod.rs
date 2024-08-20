mod users;

use axum::{Extension, Router};
use sqlx::{Pool, Postgres};
use tower_http::cors::CorsLayer;
use tower_http::trace::TraceLayer;

#[derive(Clone)]
struct ApiContext {
    db: Pool<Postgres>,
    hmac_key: String,
}

// This function will start the server.
pub async fn serve(db: Pool<Postgres>, hmac_key: String) {
    let app = Router::new()
        .nest("/api", api_router())
        .layer(CorsLayer::permissive())
        .layer(Extension(ApiContext {
            db,
            hmac_key: hmac_key,
        }))
        .layer(TraceLayer::new_for_http());

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
