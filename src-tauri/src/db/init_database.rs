/* ---------------------------------------------------------------------------------------------- */
//! db/init_database.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - init_database
/* ---------------------------------------------------------------------------------------------- */

// Rust
// use std::error::Error;
// use std::sync::Arc;
// Tauri
use log::info;
// use tauri::{ AppHandle, Manager, Wry };
// SeaORM
use sea_orm::{ ConnectionTrait, Database, DatabaseConnection, Schema };
use sea_orm::sea_query::Table;
// Dependencies
// use tokio::sync::Mutex;
// Crates
use crate::db::entities::subscriptions::Entity;

/* ---------------------------------------------------------------------------------------------- */

const DB_URL: &str = "postgres://postgres:DB@localhost:5432/chartbuddha";

/* ---------------------------------------------------------------------------------------------- */

pub async fn init_database() -> Result<DatabaseConnection, Box<dyn std::error::Error>> {
  info!("Initializing Database...");

  // Connect to the database
  let db = Database::connect(DB_URL).await?;
  info!("Database connected successfully.");

  // Drop the subscriptions table if it exists
  let schema = Schema::new(db.get_database_backend());
  let backend = db.get_database_backend();
  let drop_table_statement = Table::drop().table(Entity).if_exists().to_owned();
  db.execute(backend.build(&drop_table_statement)).await?;
  info!("Subscriptions table dropped.");

  // Create the subscriptions table
  let create_table_statement = schema.create_table_from_entity(Entity).if_not_exists().to_owned();
  db.execute(backend.build(&create_table_statement)).await?;
  info!("Subscriptions table created.");

  Ok(db)
}

/* ---------------------------------------------------------------------------------------------- */
