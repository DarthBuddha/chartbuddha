/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Subscriber Common - db_subscription
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * save_subscription_to_db
//! * delete_subscription_from_db
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/subscriber/common/db_subscription.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
// use serde_json::json;
// Tauri
// use tauri::AppHandle;
// use tauri::Manager;
// use tauri::Wry;
// use tauri_plugin_store::StoreExt;
// SeaOrm
// use sea_orm::ConnectionTrait;
use sea_orm::Database;
// use sea_orm::Schema;
use sea_orm::DbErr;
// use sea_orm::DbBackend;
// use sea_orm::Statement;
use sea_orm::Set;
use sea_orm::DatabaseConnection;
use sea_orm::ActiveModelTrait;
// Dependencies
use log::info;
// use log::error;
// Crates
use crate::app::database::database::DATABASE_URL;
use crate::app::database::entity_subscription::ActiveModel as SubscriptionActiveModel;

/* ---------------------------------------------------------------------------------------------- */

/// Save the subscription to the database
pub async fn save_subscription_to_db(
  // app_handle: AppHandle<Wry>,
  subscription_type: String,
  exchange_type: String,
  platform: String,
  symbol: String,
  tick: f64, // Changed to tickSize
  granularity: f64, // Changed to granularity
  historical: String
) -> Result<(), DbErr> {
  info!("Save Subscription to Database");
  let db: DatabaseConnection = Database::connect(DATABASE_URL).await?;

  // Save subscription to the database
  let new_subscription = SubscriptionActiveModel {
    // Subscription: data
    subscription_type: Set(subscription_type.parse().ok()),
    exchange_type: Set(exchange_type.parse().ok()),
    platform: Set(platform.to_string()),
    symbol: Set(symbol.to_string()),
    // Subscription: settings
    tick: Set(tick), // Changed to tickSize
    granularity: Set(granularity), // Changed to granularity
    historical: Set(historical.to_string()),
    // Housekeeping fields
    created_at: Set(chrono::Utc::now().into()),
    updated_at: Set(chrono::Utc::now().naive_utc()),

    ..Default::default()
  };

  new_subscription.insert(&db).await?;

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */

// / Delete the subscription from the database
// pub async fn delete_subscription_from_db(
//   app_handle: AppHandle<Wry>,
//   platform: String,
//   symbol: String
// ) -> Result<String, String> {
//   // initialize app_subscriptions store
//   info!("Delete Subscription from Database");

//   let store = app_handle.store("subscriptions.json").map_err(|e| e.to_string())?;

//   // get existing subscriptions
//   let mut subscriptions_store = store
//     .get("subscriptions")
//     .unwrap_or(json!({
//     "binance": [],
//     "coinbase": []
//   }));

//   // find and remove the subscription
//   if platform == "coinbase" {
//     if
//       let Some(pos) = subscriptions_store["coinbase"]
//         .as_array_mut()
//         .unwrap()
//         .iter()
//         .position(|x| x["symbol"] == symbol)
//     {
//       subscriptions_store["coinbase"].as_array_mut().unwrap().remove(pos);
//     }
//   } else if platform == "binance" {
//     if
//       let Some(pos) = subscriptions_store["binance"]
//         .as_array_mut()
//         .unwrap()
//         .iter()
//         .position(|x| x["symbol"] == symbol)
//     {
//       subscriptions_store["binance"].as_array_mut().unwrap().remove(pos);
//     }
//   }

//   store.set("subscriptions", subscriptions_store);
//   store.save().map_err(|e| e.to_string())?;
//   info!("Subscription Deleted");

//   Ok("Subscription Deleted".to_string())
// }

/* ---------------------------------------------------------------------------------------------- */
