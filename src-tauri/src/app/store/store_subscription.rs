/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Subscriber Common - store_subscription
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * save_subscription_to_store
//! * delete_subscription_from_store
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/subscriber/common/store_subscription.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use serde_json::json;
// Tauri
use tauri::AppHandle;
// use tauri::Manager;
use tauri::Wry;
use tauri_plugin_store::StoreExt;
// Dependencies
use log::info;
// use log::error;

/* ---------------------------------------------------------------------------------------------- */

/// Save the subscription to the store
pub async fn save_subscription_to_store(
  app_handle: AppHandle<Wry>,
  subscription_type: String,
  exchange_type: String,
  platform: String,
  symbol: String,
  tick: f64, // Changed to tickSize
  granularity: f64, // Changed to granularity
  historical: String
) -> Result<String, String> {
  info!("Save Subscription to Store");
  let app = app_handle.clone();

  // Access the Tauri store
  let store = app.store("subscriptions.json").map_err(|e| e.to_string())?;

  // get existing subscriptions
  let mut subscriptions_store = store
    .get("subscriptions")
    .unwrap_or(json!({
    "Binance": [],
    "Coinbase": []
  }));

  // create new subscription
  let new_subscription =
    json!({
    "subscription_type": subscription_type,
    "exchange_type": exchange_type,
    "platform": platform,
    "symbol": symbol,
    "tick": tick,
    "granularity": granularity,
    "historical": historical
  });

  // store the subscription based on the platform
  if platform == "Coinbase" {
    subscriptions_store["Coinbase"].as_array_mut().unwrap().push(new_subscription);
  } else if platform == "Binance" {
    subscriptions_store["Binance"].as_array_mut().unwrap().push(new_subscription);
  }

  store.set("subscriptions", subscriptions_store);
  store.save().map_err(|e| e.to_string())?;
  info!("Subscription Saved");

  Ok("Subscription Saved to Store".to_string())
}

/* ---------------------------------------------------------------------------------------------- */

/// Delete the subscription from the store
pub async fn delete_subscription_from_store(
  app_handle: AppHandle<Wry>,
  platform: String,
  symbol: String
) -> Result<String, String> {
  // initialize app_subscriptions store
  info!("Delete Subscription from Store");

  let store = app_handle.store("subscriptions.json").map_err(|e| e.to_string())?;

  // get existing subscriptions
  let mut subscriptions_store = store
    .get("subscriptions")
    .unwrap_or(json!({
    "binance": [],
    "coinbase": []
  }));

  // find and remove the subscription
  if platform == "Coinbase" {
    if
      let Some(pos) = subscriptions_store["Coinbase"]
        .as_array_mut()
        .unwrap()
        .iter()
        .position(|x| x["symbol"] == symbol)
    {
      subscriptions_store["Coinbase"].as_array_mut().unwrap().remove(pos);
    }
  } else if platform == "Binance" {
    if
      let Some(pos) = subscriptions_store["Binance"]
        .as_array_mut()
        .unwrap()
        .iter()
        .position(|x| x["symbol"] == symbol)
    {
      subscriptions_store["Binance"].as_array_mut().unwrap().remove(pos);
    }
  }

  store.set("subscriptions", subscriptions_store);
  store.save().map_err(|e| e.to_string())?;
  info!("Subscription Deleted");

  Ok("Subscription Deleted from Store".to_string())
}

/* ---------------------------------------------------------------------------------------------- */
