/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Subscriber Commands - subscription_save
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions
//! * subscription_save
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/subscriber/commands/subscription_save.rs
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
use crate::app::subscriber::structs::subscription::Subscription;
use crate::app::subscriber::structs::subscription::SubscriptionType;
// use crate::app::entities::app_subscriptions::ActiveModel as SubscriptionActiveModel;
use crate::app::subscriber::common::subscription_store::save_subscription_to_store;

/* ---------------------------------------------------------------------------------------------- */

/// Store the API keys and additional data in the app store
#[tauri::command]
pub async fn subscription_save(
  app_handle: AppHandle<Wry>,
  subscription_type: String, // Changed to String
  platform: String,
  exchange: String,
  symbol: String,
  tick: f64, // Changed to tickSize
  granularity: f64, // Changed to granularity
  historical: String
) -> Result<String, String> {
  info!("Command: Save Subscription");

  // Convert string to SubscriptionType
  let subscription_type = SubscriptionType::from_str(&subscription_type);
  let app = app_handle.clone();

  // Access the Tauri store
  let store = app.store("subscriptions.json").map_err(|e| e.to_string())?;

  // Check for duplicate subscription in the store
  let subscriptions: HashMap<String, Vec<Subscription>> = store
    .get("subscriptions")
    .unwrap_or_default()
    .as_object()
    .and_then(|obj| {
      obj
        .iter()
        .map(|(k, v)| {
          let subs: Vec<Subscription> = serde_json::from_value(v.clone()).unwrap_or_default();
          (k.clone(), subs)
        })
        .collect::<HashMap<String, Vec<Subscription>>>()
        .into()
    })
    .unwrap_or_default();
  if let Some(platform_subscriptions) = subscriptions.get(&platform) {
    if platform_subscriptions.iter().any(|s| s.symbol == symbol) {
      return Err("Subscription already exists".to_string());
    }
  }

  save_subscription_to_store(
    app_handle.clone(),
    subscription_type.clone().to_string(),
    platform.clone(),
    exchange.clone(),
    symbol.clone(),
    tick,
    granularity,
    historical.clone()
  ).await.map_err(|e| e.to_string())?;

  // info!("Save Subscription to database");
  // // Access the database connection state
  // let db = app_handle.state::<DatabaseConnection>();

  // // Save subscription to the database
  // let new_subscription = SubscriptionActiveModel {
  //   // Housekeeping fields
  //   created_at: Set(chrono::Utc::now().into()),
  //   updated_at: Set(chrono::Utc::now().naive_utc()),
  //   // Subscription: data
  //   subscription_type: Set(subscription_type.to_string()),
  //   platform: Set(platform.to_string()),
  //   exchange: Set(exchange.to_string()),
  //   symbol: Set(symbol.to_string()),
  //   // Subscription: settings
  //   tick: Set(tick), // Changed to tickSize
  //   granularity: Set(granularity), // Changed to granularity
  //   historical: Set(historical.to_string()),

  //   ..Default::default()
  // };

  // new_subscription.insert(db.inner()).await.map_err(|e| e.to_string())?;

  Ok("Subscription Saved".to_string())
}

/* ---------------------------------------------------------------------------------------------- */
