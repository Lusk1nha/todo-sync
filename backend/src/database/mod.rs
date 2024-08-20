use sqlx::{postgres::PgPoolOptions, Pool, Postgres};

// This function will return a connection pool to the database.
pub async fn get_connection_pool(database_url: &String) -> Result<Pool<Postgres>, sqlx::Error> {
    match PgPoolOptions::new()
        .max_connections(10)
        .connect(&database_url)
        .await
    {
        Ok(pool) => {
            println!("✅Connection to the database is successful!");
            Ok(pool)
        }
        Err(err) => {
            println!("🔥 Failed to connect to the database: {:?}", err);
            std::process::exit(1);
        }
    }
}
