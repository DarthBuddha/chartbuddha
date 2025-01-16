/* ------------------------------------------------------------------------------------------------------------------ */
//! commands/coinbase/subscribe/coinbase_subscribe.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Functions
//! - store_api_keys
/* ------------------------------------------------------------------------------------------------------------------ */

// Tauri
use tauri::{ AppHandle, Wry };
use tauri_plugin_store::StoreExt;
// Dependencies
use serde_json::json;

/* ------------------------------------------------------------------------------------------------------------------ */

/// Store the API keys in the app store
#[tauri::command]
pub async fn coinbase_subscribe(app_handle: AppHandle<Wry>, coinbase_product_id: String) -> Result<String, String> {
  // initialize app_subscriptions store
  log::info!("Initializing app_subscriptions store");
  let store = app_handle.store("app_subscriptions.json").map_err(|e| e.to_string())?;

  // get existing subscriptions
  let mut app_subscriptions = store.get("app_subscriptions").unwrap_or(json!({
    "binance": [],
    "coinbase": []
  }));

  // store the coinbase product id
  let new_subscription = json!({ "product_id": coinbase_product_id });
  app_subscriptions["coinbase"].as_array_mut().unwrap().push(new_subscription);
  store.set("app_subscriptions", app_subscriptions);
  store.save().map_err(|e| e.to_string())?;
  log::info!("Coinbase Product id Saved");
  Ok("Coinbase Product id successfully saved".to_string())
}

/* ------------------------------------------------------------------------------------------------------------------ */
