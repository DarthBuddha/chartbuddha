/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Subscriber - subscriber_cmds
/* ---------------------------------------------------------------------------------------------- */
//! #### Commands:
//! * save_subscription_cmd
//! * delete_subscription_cmd
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/subscriber/subscriber_cmds.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Tauri
use tauri::AppHandle;
use tauri::Wry;
use tauri_plugin_store::StoreExt;
// Dependencies
use log::info;
// Crates
use crate::app::subscriber::subscriber::Subscriber;
use crate::app::db::db_subscriptions::delete_subscription_from_db;
use crate::app::db::db_subscriptions::save_subscription_to_db;
use crate::app::store::store_subscription::delete_subscription_from_store;
use crate::app::store::store_subscription::save_subscription_to_store;

/* ---------------------------------------------------------------------------------------------- */

/// Save the subscription to the app store
#[tauri::command]
pub async fn save_subscription_cmd(
  app_handle: AppHandle<Wry>,
  subscription_type: String,
  exchange_type: String,
  platform: String,
  symbol: String,
  tick: f64,
  granularity: f64,
  historical: String
) -> Result<String, String> {
  info!("Command: Save Subscription");

  let app = app_handle.clone();

  // Access the Tauri store
  let store = app.store("subscriptions.json").map_err(|e| e.to_string())?;

  // Check for duplicate subscription in the store
  let subscriptions: HashMap<String, Vec<Subscriber>> = store
    .get("subscriptions")
    .unwrap_or_default()
    .as_object()
    .and_then(|obj| {
      obj
        .iter()
        .map(|(k, v)| {
          let subs: Vec<Subscriber> = serde_json::from_value(v.clone()).unwrap_or_default();
          (k.clone(), subs)
        })
        .collect::<HashMap<String, Vec<Subscriber>>>()
        .into()
    })
    .unwrap_or_default();
  if let Some(platform_subscriptions) = subscriptions.get(&platform) {
    if platform_subscriptions.iter().any(|s| s.symbol == symbol) {
      return Err("Subscription already exists".to_string());
    }
  }

  info!("Save Subscription to Store");
  save_subscription_to_store(
    app_handle.clone(),
    subscription_type.clone(),
    exchange_type.clone(),
    platform.clone(),
    symbol.clone(),
    tick,
    granularity,
    historical.clone()
  ).await.map_err(|e| e.to_string())?;

  info!("Save Subscription to Database");
  save_subscription_to_db(
    subscription_type.clone(),
    exchange_type.clone(),
    platform.clone(),
    symbol.clone(),
    tick,
    granularity,
    historical.clone()
  ).await.map_err(|e| e.to_string())?;

  Ok("Command: Save Subscription".to_string())
}

/* ---------------------------------------------------------------------------------------------- */

/// Delete the subscription from the app store
#[tauri::command]
pub async fn delete_subscription_cmd(
  app_handle: AppHandle<Wry>,
  platform: String,
  symbol: String
) -> Result<String, String> {
  // initialize subscriptions store
  info!("Command: Delete Subscription");

  info!("Delete Subscription from Store");
  delete_subscription_from_store(
    app_handle.clone(),
    platform.clone(),
    symbol.clone()
  ).await.map_err(|e| e.to_string())?;

  info!("Delete Subscription from Database");
  delete_subscription_from_db(platform.clone(), symbol.clone()).await.map_err(|e| e.to_string())?;

  Ok("Command: Delete Subscription".to_string())
}

/* ---------------------------------------------------------------------------------------------- */
