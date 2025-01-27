/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library - Backend
/* ---------------------------------------------------------------------------------------------- */
//! # Module: Store Config Coinbase - drop_coinbase
/* ---------------------------------------------------------------------------------------------- */
//! #### Function:
//! * drop_coinbase
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src-tauri/src/store/config/coinbase/drop_coinbase.rs
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
use crate::constants::COINBASE_STORE;

/* ---------------------------------------------------------------------------------------------- */

/// Store Database Command configuration
pub async fn drop_coinbase(
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

  // initialize apis store
  info!("Initializing Store: App Config...");
  let store = app.store(COINBASE_STORE).map_err(|e| e.to_string())?;

  // Drop the API keys to the store
  let mut coinbase = store.get("Coinbase").unwrap_or(json!({}));
  coinbase["api_configured"] = json!(false);
  coinbase["api_key"] = json!(null);
  coinbase["api_key_secret"] = json!(null);
  coinbase["api_permissions"] = json!(null);
  store.set("Coinbase", coinbase);
  store.save().map_err(|e| e.to_string())?;
  info!("Coinbase Configuration Dropped");

  Ok("Coinbase configuration dropped successfully".to_string())
}

/* ---------------------------------------------------------------------------------------------- */
