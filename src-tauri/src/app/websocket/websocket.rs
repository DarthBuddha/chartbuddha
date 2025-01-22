/* ---------------------------------------------------------------------------------------------- */
//! # App Websocket: Websocket Module
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * initialize_websocket
/* ---------------------------------------------------------------------------------------------- */
//! ##### app/websocket/websocket.rs
/* ---------------------------------------------------------------------------------------------- */

// Tauri
use tauri::AppHandle;
use tauri_plugin_store::StoreExt;
// Dependencies
use log::info;
use log::error;
use serde_json::json;
// Crates
use crate::app::streams::streams::coordinate_subscriptions;

/* ---------------------------------------------------------------------------------------------- */

pub async fn initialize_websocket(app: AppHandle) -> Result<(), Box<dyn std::error::Error>> {
  info!("Initializing WebSocket...");

  // Read app_subscriptions from the store
  let store = app.store("app_subscriptions.json")?;
  let app_subscriptions: serde_json::Value = store
    .get("app_subscriptions")
    .unwrap_or(json!({
    "binance": [],
    "coinbase": []
  }));

  // Extract Coinbase subscriptions
  let coinbase_subscriptions = app_subscriptions["coinbase"]
    .as_array()
    .unwrap_or(&vec![])
    .clone();

  info!("Coinbase subscriptions: {:?}", coinbase_subscriptions);

  // Coordinate subscriptions
  if let Err(e) = coordinate_subscriptions(app, &coinbase_subscriptions).await {
    error!("WebSocket connection error: {:?}", e);
  }

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
