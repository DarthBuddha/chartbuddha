/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Database - initialize_database
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * setup_database
/* ---------------------------------------------------------------------------------------------- */
//! ##### app/setup/setup_database.rs
/* ---------------------------------------------------------------------------------------------- */

// SeaORM
use sea_orm::ConnectionTrait;
use sea_orm::{ Database, DatabaseConnection, Schema };
// Dependencies
use log::info;
// Crates
use crate::app::entities::{
  // order_book::Entity as OrdersEntity,
  app_subscriptions::Entity as SubscriptionsEntity,
  // trades::Entity as TradesEntity,
};

/* ---------------------------------------------------------------------------------------------- */

const DB_URL: &str = "postgres://postgres:DB@localhost:5432/chartbuddha";

/* ---------------------------------------------------------------------------------------------- */

pub async fn initialize_database() -> Result<DatabaseConnection, Box<dyn std::error::Error>> {
  info!("Setup Database...");

  // Connect to the database
  let db = Database::connect(DB_URL).await?;
  info!("Database connected successfully.");

  // Create tables
  let schema = Schema::new(db.get_database_backend());
  let backend = db.get_database_backend();

  // Create the subscriptions table
  let create_subscriptions_table = schema
    .create_table_from_entity(SubscriptionsEntity)
    .if_not_exists()
    .to_owned();
  db.execute(backend.build(&create_subscriptions_table)).await?;
  info!("Subscriptions table created.");

  info!("Database Setup successfully.");

  Ok(db)
}

/* ---------------------------------------------------------------------------------------------- */
