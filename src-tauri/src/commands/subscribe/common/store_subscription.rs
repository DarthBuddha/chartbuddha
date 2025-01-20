/* ---------------------------------------------------------------------------------------------- */
//! commands/subscribe/common/store_subscription.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - store_subscription
/* ---------------------------------------------------------------------------------------------- */

// Rust
use serde_json::json;
// Tauri
use tauri::{ AppHandle, Wry };
use tauri_plugin_store::StoreExt;

/* ---------------------------------------------------------------------------------------------- */

/// Store the API keys and additional data in the app store
pub async fn store_subscription(
  app_handle: AppHandle<Wry>,
  subscription_type: String,
  platform: String,
  exchange: String,
  symbol: String,
  tick: f64, // Changed to tickSize
  granularity: f64, // Changed to granularity
  historical: String
) -> Result<String, String> {
  // initialize app_subscriptions store
  log::info!("Save Subscription to Store");

  let store = app_handle.store("subscriptions.json").map_err(|e| e.to_string())?;

  // get existing subscriptions
  let mut subscriptions_store = store
    .get("subscriptions")
    .unwrap_or(json!({
      "binance": [],
      "coinbase": []
    }));

  // create new subscription
  let new_subscription =
    json!({
    "subscription_type": subscription_type,
    "platform": platform,
    "exchange": exchange,
    "symbol": symbol,
    "tick": tick,
    "granularity": granularity,
    "historical": historical
  });

  // store the subscription based on the platform
  if platform == "coinbase" {
    subscriptions_store["coinbase"].as_array_mut().unwrap().push(new_subscription);
  } else if platform == "binance" {
    subscriptions_store["binance"].as_array_mut().unwrap().push(new_subscription);
  }

  store.set("subscriptions", subscriptions_store);
  store.save().map_err(|e| e.to_string())?;
  log::info!("Subscription Saved");

  Ok("Subscription Saved".to_string())
}

/* ---------------------------------------------------------------------------------------------- */
