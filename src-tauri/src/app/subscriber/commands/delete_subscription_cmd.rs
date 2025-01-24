/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Subscriber Commands - delete_subscription_cmd
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * delete_subscription_cmd
/* ---------------------------------------------------------------------------------------------- */
//! ##### app/subscriber/commands/delete_subscription_cmd.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
// use std::collections::HashMap;
// Tauri
use tauri::AppHandle;
// use tauri::Manager;
use tauri::Wry;
// use tauri_plugin_store::Store;
// use tauri_plugin_store::StoreExt;
// SeaOrm
// use sea_orm::{ ActiveModelTrait, DatabaseConnection, Set };
// Dependencies
use log::info;
// Crates
// use crate::app::subscriber::structs::subscription::Subscription;
// use crate::app::entities::app_subscriptions::ActiveModel as SubscriptionActiveModel;
use crate::app::subscriber::common::store_subscription::delete_subscription_from_store;

/* ---------------------------------------------------------------------------------------------- */

/// Delete the subscription from the app store
#[tauri::command]
pub async fn delete_subscription_cmd(
  app_handle: AppHandle<Wry>,
  platform: String,
  symbol: String,
) -> Result<String, String> {
  // initialize subscriptions store
  info!("Delete Subscription from Store");

  delete_subscription_from_store(app_handle.clone(), platform.clone(), symbol.clone())
    .await
    .map_err(|e| e.to_string())?;

  // // Access the database connection state
  // let db = app_handle.state::<DatabaseConnection>();

  // // Delete subscription from the database
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

  Ok("Subscription Deleted".to_string())
}

/* ---------------------------------------------------------------------------------------------- */
