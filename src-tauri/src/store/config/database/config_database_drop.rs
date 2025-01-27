/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library - Backend
/* ---------------------------------------------------------------------------------------------- */
//! # Module: Store App Config - config_database_drop
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * drop_database
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src-tauri/src/store/config/config_database_drop.rs
/* ---------------------------------------------------------------------------------------------- */

// Tauri
use tauri::AppHandle;
use tauri_plugin_store::StoreExt;
// Dependencies
use log::info;
// use log::error;
use serde_json::json;
// use serde_json::to_string;
// Crates
use crate::constants::CONFIG_STORE;

/* ---------------------------------------------------------------------------------------------- */

/// Store Database Command configuration
pub async fn drop_database(
  app: AppHandle,
  database_type: String,
  database_name: String,
  database_url: String
) -> Result<String, String> {
  info!(
    "Command: save_database_cmd\n
    database_type: {}\n
    database_name: {}\n,
    database_url: {}",
    database_type,
    database_name,
    database_url
  );

  // initialize apis store
  info!("Initializing Store: App Config...");
  let store = app.store(CONFIG_STORE).map_err(|e| e.to_string())?;

  // Save the API keys to the store
  let mut app_config_store = store.get("App").unwrap_or(json!({}));
  app_config_store["database_type"] = json!(null);
  app_config_store["database_name"] = json!(null);
  app_config_store["database_url"] = json!(null);
  store.set("App", app_config_store);
  store.save().map_err(|e| e.to_string())?;
  info!("Database Configuration Dropped");

  Ok("Database configuration dropped successfully".to_string())
}

/* ---------------------------------------------------------------------------------------------- */
