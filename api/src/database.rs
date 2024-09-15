use sqlx::{migrate::Migrator, postgres::PgPoolOptions, Pool, Postgres};

pub async fn create_pool(database_url: &String) -> sqlx::Result<Pool<Postgres>> {
  let pool = PgPoolOptions::new()
      .max_connections(5)
      .connect(database_url)
      .await?;

  Ok(pool)
}

pub async fn run_migrations(pool: &Pool<Postgres>) -> sqlx::Result<()> {
  let migrator = Migrator::new(std::path::Path::new("migrations")).await?;
  migrator.run(pool).await?;

  Ok(())
}
