/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! ws/initalize_ws.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - initialize_websocket
/* ---------------------------------------------------------------------------------------------- */

// Rust
// Tauri
use tauri::AppHandle;
// use tauri::Manager;
use tauri_plugin_store::StoreExt;
// Dependencies
use serde_json::json;
// Crates
// use crate::AppState;
// use crate::apis::coinbase::coinbase_websocket::connect_to_coinbase;
use crate::app::websocket::websocket::coordinate_subscriptions;

/* ---------------------------------------------------------------------------------------------- */

pub async fn initialize_websocket(app: AppHandle) -> Result<(), Box<dyn std::error::Error>> {
  log::info!("Initializing WebSocket...");

  // Read app_subscriptions from the store
  let store = app.store("list_sub.json")?;
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

  log::info!("Coinbase subscriptions: {:?}", coinbase_subscriptions);

  // Coordinate subscriptions
  if let Err(e) = coordinate_subscriptions(app, &coinbase_subscriptions).await {
    log::error!("WebSocket connection error: {:?}", e);
  }

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
