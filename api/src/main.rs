mod auth;
mod auth_token;
mod database;
mod router;
mod users;
mod users_profile;

use router::create_router;
use sqlx::{Pool, Postgres};
use std::sync::Arc;

use database::{create_pool, run_migrations};
use dotenv::dotenv;
use tracing::Level;

pub struct AppState {
    db: Pool<Postgres>,
}

#[tokio::main]
async fn main() {
    // Configuração do sistema de logging
    tracing_subscriber::fmt()
        .with_max_level(Level::TRACE) // Captura todos os logs
        .with_ansi(true) // Ativa a formatação ANSI (cores)
        .init();

    dotenv().ok(); // Carregar variáveis de ambiente

    // Capturar a URL do banco de dados
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");

    // Criar a pool de conexões com o banco de dados
    let pool = match create_pool(&database_url).await {
        Ok(pool) => pool,
        Err(e) => panic!("Erro ao criar a pool de conexões: {:?}", e),
    };

    // Executar as migrações do banco de dados
    match run_migrations(&pool).await {
        Ok(_) => {}
        Err(e) => panic!("Erro ao executar migrações: {:?}", e),
    };

    // Criar o estado compartilhado da aplicação
    let state = Arc::new(AppState { db: pool.clone() });

    // Criar as rotas da aplicação
    let api = create_router(state).await;

    // Iniciar o listener TCP
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    // Logar o endereço do listener e que o servidor foi iniciado com sucesso
    tracing::info!("Servidor iniciado em {}", listener.local_addr().unwrap());

    // Iniciar o servidor Axum
    axum::serve(listener, api).await.unwrap();
}
