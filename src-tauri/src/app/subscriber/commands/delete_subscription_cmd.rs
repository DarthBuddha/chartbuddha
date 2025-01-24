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
use crate::app::subscriber::common::db_subscriptions::delete_subscription_from_db;

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
