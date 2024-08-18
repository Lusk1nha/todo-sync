use axum::{
    extract::Json,
    response::Html,
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};

#[tokio::main]
async fn main() {
    // build our application with a route
    let app = Router::new()
        .route("/", get(handler))
        .route("/users", post(get_user_by_email));

    // run it
    let listener = tokio::net::TcpListener::bind("127.0.0.1:8080")
        .await
        .unwrap();

    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

async fn handler() -> Html<&'static str> {
    "<h1>Hello, World 2!</h1>".into()
}

#[derive(Deserialize, Serialize)]
struct CreateUserPayload {
    email: String,
    password: String,
}
#[derive(Deserialize, Serialize)]
struct ResponseCreateUserPayload {
    email: String,
    password: String,
    invoice: bool,
}

async fn get_user_by_email(
    Json(payload): Json<CreateUserPayload>,
) -> Json<ResponseCreateUserPayload> {
    let payload_with_boolean = ResponseCreateUserPayload {
        email: payload.email,
        password: payload.password,
        invoice: true,
    };

    payload_with_boolean.into()
}
