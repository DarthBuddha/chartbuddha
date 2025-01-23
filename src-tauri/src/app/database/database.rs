/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Database - database
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions
//! * subscription_delete
/* ---------------------------------------------------------------------------------------------- */
//! ##### app/database/database.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
use std::sync::{ Arc, Mutex };
// Tauri
// use tauri::AppHandle;
// use tauri::Manager;
use tauri::State;
// use tauri::Wry;
// use tauri_plugin_store::Store;
// use tauri_plugin_store::StoreExt;
// SeaOrm
use sea_orm::DatabaseConnection;
// Dependencies
use log::info;
// Crates
use crate::app::database::initialize_database::initialize_database;
// use crate::app::subscriber::structs::subscription::Subscription;
// use crate::app::entities::app_subscriptions::ActiveModel as SubscriptionActiveModel;
// use crate::app::subscriber::common::subscription_store::delete_subscription_from_store;

/* ---------------------------------------------------------------------------------------------- */

// here we use Mutex to achieve interior mutability
pub struct DbStorage {
  pub store: Mutex<HashMap<u64, String>>,
}

pub struct Connection;

pub struct DbConnection {
  pub db: Arc<Mutex<Option<DatabaseConnection>>>,
}

pub async fn connect(connection: State<'_, DbConnection>) {
  // initialize the connection, mutating the state with interior mutability
  info!("Connect to Database");
  let db = initialize_database().await.expect("Failed to initialize database");
  *connection.db.lock().unwrap() = Some(db);
}

pub fn storage_insert(key: u64, value: String, storage: State<DbStorage>) {
  // mutate the storage behind the Mutex
  info!("Storage Insert");
  storage.store.lock().unwrap().insert(key, value);
}

/* ---------------------------------------------------------------------------------------------- */
