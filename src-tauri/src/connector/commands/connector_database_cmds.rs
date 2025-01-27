/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library - Backend
/* ---------------------------------------------------------------------------------------------- */
//! # Module: Connector Commands -> connector_database_cmds
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * save_database_cmd
//! * drop_database_cmd
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src-tauri/src/connector/commands/connector_database_cmds.rs
/* ---------------------------------------------------------------------------------------------- */

// Tauri
use tauri::AppHandle;
// Dependencies
use log::info;
// use log::error;
// Crates
use crate::store::config::database::config_database_save::save_database;
use crate::store::config::database::config_database_drop::drop_database;

/* ---------------------------------------------------------------------------------------------- */

/// Command: Store Database Configuration
#[tauri::command]
pub async fn save_database_cmd(
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

  match save_database(app, database_type, database_name, database_url).await {
    Ok(message) => info!("{}", message),
    Err(e) => {
      return Err(e);
    }
  }

  Ok("Database configuration saved successfully".to_string())
}

/* ---------------------------------------------------------------------------------------------- */

/// Command: Drop Database Configuration
#[tauri::command]
pub async fn drop_database_cmd(
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

  match drop_database(app, database_type, database_name, database_url).await {
    Ok(message) => info!("{}", message),
    Err(e) => {
      return Err(e);
    }
  }

  Ok("Database configuration dropped successfully".to_string())
}

/* ---------------------------------------------------------------------------------------------- */
