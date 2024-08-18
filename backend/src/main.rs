mod database;
mod http;

use database::get_connection_pool;

use dotenv::dotenv;
use std::env;

#[tokio::main]
async fn main() {
    // Load the environment variables.
    dotenv().ok();

    // Initialize the logger.
    env_logger::init();

    // Get the environment variables. If they are not set, the program will panic.
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    // let hmc_key = env::var("HMAC_KEY").expect("HMAC_KEY must be set");

    // Get the connection pool.
    let db = get_connection_pool(&database_url).await.unwrap();

    // Run the migrations.
    match sqlx::migrate!().run(&db).await {
        Ok(_) => {
            println!("✅Migration is successful!");
        }
        Err(err) => {
            println!("🔥Failed to migrate: {:?}", err);
            std::process::exit(1);
        }
    };

    // Start the server.
    http::serve(db).await;
}
