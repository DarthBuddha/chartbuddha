/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Database - database
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * subscription_delete
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/database/database.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
// use std::collections::HashMap;
// use std::sync::{ Arc, Mutex };
// Tauri
// use tauri::AppHandle;
// use tauri::Manager;
// use tauri::State;
// use tauri::Wry;
// use tauri_plugin_store::Store;
// use tauri_plugin_store::StoreExt;
// SeaOrm
use sea_orm::ConnectionTrait;
use sea_orm::Database;
// use sea_orm::DatabaseConnection;
use sea_orm::Schema;
use sea_orm::DbErr;
use sea_orm::{ DbBackend, Statement };
// Dependencies
use log::info;
// Crates
use crate::app::entities::app_subscriptions::Entity as SubscriptionsEntity;
// use crate::app::subscriber::structs::subscription::Subscription;
// use crate::app::entities::app_subscriptions::ActiveModel as SubscriptionActiveModel;
// use crate::app::subscriber::common::subscription_store::delete_subscription_from_store;

/* ---------------------------------------------------------------------------------------------- */

const DB_NAME: &str = "chartbuddha";
const DATABASE_URL: &str = "postgres://postgres:DB@localhost:5432";

/* ---------------------------------------------------------------------------------------------- */

pub async fn setup_database() -> Result<(), DbErr> {
  info!("Setup Database...");
  let db = Database::connect(DATABASE_URL).await?;

  match db.get_database_backend() {
    DbBackend::MySql => {
      db.execute(
        Statement::from_string(
          db.get_database_backend(),
          format!("CREATE DATABASE IF NOT EXISTS `{}`;", DB_NAME)
        )
      ).await?;
    }
    DbBackend::Postgres => {
      let db_exists = db
        .query_one(
          Statement::from_string(
            db.get_database_backend(),
            format!("SELECT 1 FROM pg_database WHERE datname = '{}';", DB_NAME)
          )
        ).await?
        .is_some();

      if !db_exists {
        db.execute(
          Statement::from_string(
            db.get_database_backend(),
            format!("CREATE DATABASE \"{}\";", DB_NAME)
          )
        ).await?;
      }
    }
    DbBackend::Sqlite => {}
  }

  let url = format!("{}/{}", DATABASE_URL, DB_NAME);
  let db = Database::connect(&url).await?;

  // Create tables
  let schema = Schema::new(db.get_database_backend());
  let backend = db.get_database_backend();

  // Create the subscriptions table
  info!("Create the subscriptions table...");
  let create_subscriptions_table = schema
    .create_table_from_entity(SubscriptionsEntity)
    .if_not_exists()
    .to_owned();
  db.execute(backend.build(&create_subscriptions_table)).await?;

  info!("Database Setup successfully.");

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
