/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Subscriber Common - subscription_store
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * save_subscription_to_store
//! * delete_subscription_from_store
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/subscriber/common/subscription_store.rs
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

/// Save the subscription to the app store
pub async fn save_subscription_to_store(
  app_handle: AppHandle<Wry>,
  subscription_type: String,
  platform: String,
  exchange: String,
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
  info!("Subscription Saved");

  Ok("Subscription Saved".to_string())
}

/* ---------------------------------------------------------------------------------------------- */

/// Delete the subscription from the app store
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
  if platform == "coinbase" {
    if
      let Some(pos) = subscriptions_store["coinbase"]
        .as_array_mut()
        .unwrap()
        .iter()
        .position(|x| x["symbol"] == symbol)
    {
      subscriptions_store["coinbase"].as_array_mut().unwrap().remove(pos);
    }
  } else if platform == "binance" {
    if
      let Some(pos) = subscriptions_store["binance"]
        .as_array_mut()
        .unwrap()
        .iter()
        .position(|x| x["symbol"] == symbol)
    {
      subscriptions_store["binance"].as_array_mut().unwrap().remove(pos);
    }
  }

  store.set("subscriptions", subscriptions_store);
  store.save().map_err(|e| e.to_string())?;
  info!("Subscription Deleted");

  Ok("Subscription Deleted".to_string())
}

/* ---------------------------------------------------------------------------------------------- */
