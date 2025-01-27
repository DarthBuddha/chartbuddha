/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library - Backend
/* ---------------------------------------------------------------------------------------------- */
//! # Module: Connector Commands -> connector_coinbase_cmds
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * save_coinbase_cmd
//! * drop_coinbase_cmd
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src-tauri/src/connector/commands/connector_coinbase_cmds.rs
/* ---------------------------------------------------------------------------------------------- */

// Tauri
use tauri::AppHandle;
// Dependencies
use log::info;
// use log::error;
// Crates
use crate::store::apis::coinbase::coinbase_save::save_coinbase;
use crate::store::apis::coinbase::coinbase_drop::drop_coinbase;

/* ---------------------------------------------------------------------------------------------- */

/// Store Database Command configuration
#[tauri::command]
pub async fn save_coinbase_cmd(
  app: AppHandle,
  coinbase_api_key: String,
  coinbase_api_secret: String
) -> Result<String, String> {
  info!(
    "Command: store_api_keys\n
    coinbase_api_key: {}\n
    coinbase_api_secret: {}",
    coinbase_api_key,
    coinbase_api_secret
  );

  match save_coinbase(app, coinbase_api_key, coinbase_api_secret).await {
    Ok(message) => {
      return Ok(message);
    } // Return the JSON response directly
    Err(e) => {
      return Err(e);
    }
  }
}

/* ---------------------------------------------------------------------------------------------- */

/// Store Database Command configuration
#[tauri::command]
pub async fn drop_coinbase_cmd(
  app: AppHandle,
  coinbase_api_key: String,
  coinbase_api_secret: String
) -> Result<String, String> {
  info!(
    "Command: store_api_keys\n
    coinbase_api_key: {}\n
    coinbase_api_secret: {}",
    coinbase_api_key,
    coinbase_api_secret
  );

  match drop_coinbase(app, coinbase_api_key, coinbase_api_secret).await {
    Ok(message) => info!("{}", message),
    Err(e) => {
      return Err(e);
    }
  }

  Ok("Coinbase configuration dropped successfully".to_string())
}

/* ---------------------------------------------------------------------------------------------- */
