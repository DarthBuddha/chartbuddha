/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Subscriber Commands - save_subscription_cmd
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * save_subscription_cmd
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/subscriber/commands/save_subscription_cmd.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Tauri
use tauri::AppHandle;
// use tauri::Manager;
use tauri::Wry;
// use tauri_plugin_store::Store;
use tauri_plugin_store::StoreExt;
// SeaOrm
// use sea_orm::{ ActiveModelTrait, DatabaseConnection, Set };
// Dependencies
use log::info;
// Crates
use crate::app::subscriber::subscriber::Subscriber;
use crate::app::subscriber::common::store_subscription::save_subscription_to_store;
use crate::app::subscriber::common::db_subscriptions::save_subscription_to_db;

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
