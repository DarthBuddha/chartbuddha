/* ---------------------------------------------------------------------------------------------- */
//! commands/coinbase/subscribe/coinbase_subscribe.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - store_api_keys
/* ---------------------------------------------------------------------------------------------- */

// Rust
// Tauri
use tauri::{ AppHandle, Manager, Wry };
// SeaOrm
use sea_orm::{ ActiveModelTrait, DatabaseConnection, Set };
// use sea_orm::prelude::Decimal;
// Crate
use crate::app::entities::subscriptions::ActiveModel as SubscriptionActiveModel;

/* ---------------------------------------------------------------------------------------------- */

/// Store the API keys and additional data in the app store
#[tauri::command]
pub async fn subscription_save(
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
  log::info!("Save Subscription");

  // Access the database connection state
  let db = app_handle.state::<DatabaseConnection>();

  // ! Error
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

  // TODO: Store the subscription in the app store
  let store = app_handle.store("app_subscriptions.json").map_err(|e| e.to_string())?;

  // get existing subscriptions
  // let mut app_subscriptions = store
  //   .get("app_subscriptions")
  //   .unwrap_or(json!({
  //   "binance": [],
  //   "coinbase": []
  // }));

  // store the coinbase product id
  // let new_subscription = json!({ "product_id": coinbase_product_id });
  // app_subscriptions["coinbase"].as_array_mut().unwrap().push(new_subscription);
  // store.set("app_subscriptions", app_subscriptions);
  // store.save().map_err(|e| e.to_string())?;
  // log::info!("Coinbase Product id Saved");

  // Store additional data if needed
  // Example: store.set("additional_data", json!({ "key": "value" }));

  new_subscription.insert(db.inner()).await.map_err(|e| e.to_string())?;

  Ok("Subscription Saved".to_string())
}

/* ---------------------------------------------------------------------------------------------- */
