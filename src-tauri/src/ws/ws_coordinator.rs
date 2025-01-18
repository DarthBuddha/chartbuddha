/* ------------------------------------------------------------------------------------------------------------------ */
//! websocket_coordinator.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Functions
//! - websocket_coordinator
/* ------------------------------------------------------------------------------------------------------------------ */

// Rust
use std::error::Error;
// Tauri
// use tauri::Emitter;
// SeaORM
use sea_orm::DatabaseConnection;
use sea_orm::{ ActiveModelTrait, Set };
// Dependencies
use chrono::Utc;
use log::info;
// Crates
use crate::db::entities::subscriptions::ActiveModel;
use crate::db::entities::trades::ActiveModel as TradeActiveModel;
use crate::db::entities::order_book::ActiveModel as OrderBookActiveModel;
// use crate::apis::coinbase::coinbase_websocket::connect_to_coinbase;
use crate::streams::streams_coordinator::StreamsCoordinator;

/* ------------------------------------------------------------------------------------------------------------------ */

pub async fn save_to_database(db: &DatabaseConnection, data: &str) -> Result<(), Box<dyn Error + Send + Sync>> {
  info!("Saving data to database: {}", data);
  let json_data: serde_json::Value = serde_json::from_str(data)?;

  if let Some(trade_id) = json_data["trade_id"].as_str() {
    let trade = TradeActiveModel {
      subscription_id: Set(1), // Example subscription ID
      trade_id: Set(trade_id.to_string()),
      price: Set(json_data["price"].as_str().unwrap().parse()?),
      volume: Set(json_data["volume"].as_str().unwrap().parse()?),
      side: Set(json_data["side"].as_str().unwrap().to_string()),
      timestamp: Set(Utc::now().naive_utc()), // Adjust as needed
      ..Default::default()
    };
    trade.insert(db).await?;
  } else if let Some(order_id) = json_data["order_id"].as_str() {
    let order = OrderBookActiveModel {
      subscription_id: Set(1), // Example subscription ID
      price: Set(json_data["price"].as_str().unwrap().parse()?),
      volume: Set(json_data["volume"].as_str().unwrap().parse()?),
      side: Set(json_data["side"].as_str().unwrap().to_string()),
      timestamp: Set(Utc::now().naive_utc()), // Adjust as needed
      ..Default::default()
    };
    order.insert(db).await?;
  } else {
    let subscription = ActiveModel {
      product_id: Set("BTC-USD".to_string()),
      created_at: Set(Utc::now().with_timezone(&chrono::FixedOffset::east_opt(0).unwrap())),
      updated_at: Set(Utc::now().with_timezone(&chrono::FixedOffset::east_opt(0).unwrap()).naive_utc()),
      data: Set(data.to_string()),
      ..Default::default()
    };
    subscription.insert(db).await?;
  }

  Ok(())
}

pub async fn coordinate_subscriptions(
  app_handle: tauri::AppHandle,
  db: DatabaseConnection,
  coinbase_subscriptions: &Vec<serde_json::Value>
) -> Result<(), Box<dyn Error + Send + Sync>> {
  let streams_coordinator = StreamsCoordinator::new();
  for subscription in coinbase_subscriptions.clone() {
    let app_clone = app_handle.clone();
    if let Some(product_id) = subscription["product_id"].as_str() {
      streams_coordinator.manage_active_streams(app_clone, product_id.to_string()).await;
      // Save subscription data to the database
      save_to_database(&db, &subscription.to_string()).await?;
    }
  }
  Ok(())
}

/* ------------------------------------------------------------------------------------------------------------------ */
