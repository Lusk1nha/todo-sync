use sqlx::{migrate::Migrator, postgres::PgPoolOptions, Pool, Postgres};
use tracing::{error, info};

pub async fn create_pool(database_url: &String) -> sqlx::Result<Pool<Postgres>> {
    info!("Iniciando criação da pool de conexões com o banco de dados");

    let pool = match PgPoolOptions::new()
        .max_connections(5)
        .connect(database_url)
        .await
    {
        Ok(pool) => {
            info!("Pool de conexões criada com sucesso");
            pool
        }
        Err(e) => {
            error!("Erro ao criar a pool de conexões: {:?}", e);
            return Err(e);
        }
    };

    Ok(pool)
}

pub async fn run_migrations(pool: &Pool<Postgres>) -> sqlx::Result<()> {
    info!("Iniciando migrações do banco de dados");

    let migrator = Migrator::new(std::path::Path::new("migrations"))
        .await
        .map_err(|e| {
            error!("Erro ao carregar migrações: {:?}", e);
            e
        })?;

    match migrator.run(pool).await {
        Ok(_) => {
            info!("Migrações executadas com sucesso");
        }
        Err(e) => {
            error!("Erro ao executar migrações: {:?}", e);
            return Err(e.into());
        }
    }

    Ok(())
}
