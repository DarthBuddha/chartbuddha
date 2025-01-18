/* ------------------------------------------------------------------------------------------------------------------ */
//! ws/initalize_ws.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Functions
//! - initialize_websocket
/* ------------------------------------------------------------------------------------------------------------------ */

// Rust
// Tauri
use tauri::AppHandle;
use tauri::Manager;
use tauri_plugin_store::StoreExt;
// Dependencies
use serde_json::json;
// Crates
use crate::AppState;
// use crate::apis::coinbase::coinbase_websocket::connect_to_coinbase;
use crate::ws::ws_coordinator::coordinate_subscriptions;

/* ------------------------------------------------------------------------------------------------------------------ */

pub async fn initialize_websocket(app: AppHandle) -> Result<(), Box<dyn std::error::Error>> {
  log::info!("Initializing WebSocket...");

  let app_state = match app.try_state::<AppState>() {
    Some(state) => state,
    None => {
      log::error!("AppState not managed yet.");
      return Err("AppState not managed yet.".into());
    }
  };
  let app_clone = app.clone();

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

  log::info!("Coinbase subscriptions: {:?}", coinbase_subscriptions);

  // Coordinate subscriptions
  let ws_handle = tokio::spawn(async move {
    if let Err(e) = coordinate_subscriptions(app_clone, &coinbase_subscriptions).await {
      log::error!("WebSocket connection error: {:?}", e);
    }
  });
  *app_state.inner().ws_handle.lock().await = Some(ws_handle);

  Ok(())
}

/* ------------------------------------------------------------------------------------------------------------------ */
