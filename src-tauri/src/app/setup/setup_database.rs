/* ---------------------------------------------------------------------------------------------- */
//! db/init_database.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - init_database
/* ---------------------------------------------------------------------------------------------- */

// Tauri
use log::info;
// SeaORM
use sea_orm::ConnectionTrait;
use sea_orm::{ Database, DatabaseConnection, Schema };
// use sea_orm::sea_query::Table;
// Crates
use crate::app::entities::{
  order_book::Entity as OrdersEntity,
  subscriptions::Entity as SubscriptionsEntity,
  trades::Entity as TradesEntity,
};

/* ---------------------------------------------------------------------------------------------- */

const DB_URL: &str = "postgres://postgres:DB@localhost:5432/chartbuddha";

/* ---------------------------------------------------------------------------------------------- */

pub async fn initalize_database() -> Result<DatabaseConnection, Box<dyn std::error::Error>> {
  info!("Initializing Database...");

  // Connect to the database
  let db = Database::connect(DB_URL).await?;
  info!("Database connected successfully.");

  // Drop and create tables
  let schema = Schema::new(db.get_database_backend());
  let backend = db.get_database_backend();

  // Create the subscriptions table
  let create_subscriptions_table = schema
    .create_table_from_entity(SubscriptionsEntity)
    .if_not_exists()
    .to_owned();
  db.execute(backend.build(&create_subscriptions_table)).await?;
  info!("Subscriptions table created.");

  // Create the trades table
  let create_trades_table = schema
    .create_table_from_entity(TradesEntity)
    .if_not_exists()
    .to_owned();
  db.execute(backend.build(&create_trades_table)).await?;
  info!("Trades table created.");

  // Create the orders table
  let create_orders_table = schema
    .create_table_from_entity(OrdersEntity)
    .if_not_exists()
    .to_owned();
  db.execute(backend.build(&create_orders_table)).await?;
  info!("Orders table created.");

  Ok(db)
}

/* ---------------------------------------------------------------------------------------------- */
