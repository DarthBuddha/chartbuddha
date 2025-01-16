/* ------------------------------------------------------------------------------------------------------------------ */
//! db/initialize_database.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Functions
//! - initialize_database
/* ------------------------------------------------------------------------------------------------------------------ */

// Rust
use std::sync::Arc;
// SeaORM
use sea_orm::{ ConnectionTrait, Database, DatabaseConnection, Schema };
// use sea_orm::sea_query::{ Table, ColumnDef, Iden };
// Dependencies
use tokio::sync::Mutex;
// Crates
use crate::db::entities::subscriptions::Entity;

/* ------------------------------------------------------------------------------------------------------------------ */

const DB_URL: &str = "postgres://postgres:DB@localhost:5432/chartbuddha";

/* ------------------------------------------------------------------------------------------------------------------ */

pub async fn initialize_database() -> Result<Arc<Mutex<DatabaseConnection>>, Box<dyn std::error::Error>> {
  log::info!("Initializing Database...");

  // Connect to the database
  let db = Database::connect(DB_URL).await?;
  log::info!("Database connected successfully.");

  // Create the subscriptions table if it doesn't exist
  let schema = Schema::new(db.get_database_backend());
  let backend = db.get_database_backend();
  let mut create_table = schema.create_table_from_entity(Entity);
  let create_table_statement = create_table.if_not_exists();

  db.execute(backend.build(create_table_statement)).await?;
  log::info!("Subscriptions table created or already exists.");

  Ok(Arc::new(Mutex::new(db)))
}

/* ------------------------------------------------------------------------------------------------------------------ */
