/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Subscriber Commands - subscription_save
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions
//! * subscription_save
/* ---------------------------------------------------------------------------------------------- */
//! ##### app/subscriber/commands/subscription_save.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Tauri
use tauri::{ AppHandle, Manager, Wry };
use tauri_plugin_store::Store;
// SeaOrm
use sea_orm::{ ActiveModelTrait, DatabaseConnection, Set };
// Crates
use crate::app::subscriber::structs::subscription::Subscription;
use crate::app::subscriber::structs::subscription::SubscriptionType;
use crate::app::entities::app_subscriptions::ActiveModel as SubscriptionActiveModel;
use crate::app::subscriber::common::subscription_store::save_subscription_to_store;

/* ---------------------------------------------------------------------------------------------- */

/// Store the API keys and additional data in the app store
#[tauri::command]
pub async fn subscription_save(
  app_handle: AppHandle<Wry>,
  subscription_type: SubscriptionType,
  platform: String,
  exchange: String,
  symbol: String,
  tick: f64, // Changed to tickSize
  granularity: f64, // Changed to granularity
  historical: String
) -> Result<String, String> {
  // initialize subscriptions store
  log::info!("Save Subscription to Store");

  // Access the Tauri store
  let store = app_handle.state::<Store<Wry>>();

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
    tick.clone(),
    granularity.clone(),
    historical.clone()
  ).await.map_err(|e| e.to_string())?;

  // Access the database connection state
  let db = app_handle.state::<DatabaseConnection>();

  // Save subscription to the database
  let new_subscription = SubscriptionActiveModel {
    // Housekeeping fields
    created_at: Set(chrono::Utc::now().into()),
    updated_at: Set(chrono::Utc::now().naive_utc()),
    // Subscription: data
    subscription_type: Set(subscription_type.to_string()),
    platform: Set(platform.to_string()),
    exchange: Set(exchange.to_string()),
    symbol: Set(symbol.to_string()),
    // Subscription: settings
    tick: Set(tick), // Changed to tickSize
    granularity: Set(granularity), // Changed to granularity
    historical: Set(historical.to_string()),

    ..Default::default()
  };

  new_subscription.insert(db.inner()).await.map_err(|e| e.to_string())?;

  Ok("Subscription Saved".to_string())
}

/* ---------------------------------------------------------------------------------------------- */