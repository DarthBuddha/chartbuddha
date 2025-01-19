/* ---------------------------------------------------------------------------------------------- */
//! ws/ws_coordinator.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - save_to_database
//! - coordinate_subscriptions
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::error::Error;
use std::sync::Arc;
// Tauri
use tauri::AppHandle;
use tauri::Manager;
use tauri::Wry;
use tauri::async_runtime::Mutex;
use tauri::State;
// use tauri::async_runtime::Mutex;
// use tauri::Emitter;
// SeaORM
use sea_orm::DatabaseConnection;
use sea_orm::{ ActiveModelTrait, Set };
// Dependencies
use chrono::Utc;
use log::{ info, error };
// Crates
use crate::state::app_state::AppState;
use crate::apis::coinbase::coinbase_streams::start_coinbase_stream;
use crate::db::entities::subscriptions::ActiveModel;
use crate::db::entities::trades::ActiveModel as TradeActiveModel;
use crate::db::entities::order_book::ActiveModel as OrderBookActiveModel;
use crate::streams::streams_coordinator::StreamsCoordinator;

/* ---------------------------------------------------------------------------------------------- */

pub async fn save_to_database(
  db: Arc<tauri::async_runtime::Mutex<DatabaseConnection>>,
  data: &str
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
  let db = db.lock().await;
  let db_clone = db.clone(); // Clone the DatabaseConnection
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
    if let Err(e) = trade.insert(&db_clone).await {
      error!("Failed to save trade to database: {}", e);
    }
  } else if let Some(order_id) = json_data["order_id"].as_str() {
    let order = OrderBookActiveModel {
      subscription_id: Set(1), // Example subscription ID
      order_id: Set(order_id.to_string()), // Include order_id
      price: Set(json_data["price"].as_str().unwrap().parse()?),
      volume: Set(json_data["volume"].as_str().unwrap().parse()?),
      side: Set(json_data["side"].as_str().unwrap().to_string()),
      timestamp: Set(Utc::now().naive_utc()), // Adjust as needed
      ..Default::default()
    };
    if let Err(e) = order.insert(&db_clone).await {
      error!("Failed to save order to database: {}", e);
    }
  } else {
    let subscription = ActiveModel {
      product_id: Set("BTC-USD".to_string()),
      created_at: Set(Utc::now().with_timezone(&chrono::FixedOffset::east_opt(0).unwrap())),
      updated_at: Set(
        Utc::now().with_timezone(&chrono::FixedOffset::east_opt(0).unwrap()).naive_utc()
      ),
      data: Set(data.to_string()),
      ..Default::default()
    };
    if let Err(e) = subscription.insert(&db_clone).await {
      error!("Failed to save subscription to database: {}", e);
    }
  }

  Ok(())
}

pub async fn get_app_state_and_db(
  app_handle: AppHandle<Wry>
) -> Option<(Arc<Mutex<DatabaseConnection>>, AppState)> {
  let app_state: State<'_, AppState> = app_handle.state();
  let db_option = app_state.db.lock().await;
  if let Some(db) = &*db_option {
    Some((Arc::new(Mutex::new(db.clone())), (*app_state).clone())) // Dereference State to get AppState
  } else {
    None
  }
}

pub async fn coordinate_subscriptions(
  app_handle: AppHandle<Wry>,
  coinbase_subscriptions: &Vec<serde_json::Value>
) -> Result<(), Box<dyn Error + Send + Sync>> {
  let streams_coordinator = StreamsCoordinator::new();
  for subscription in coinbase_subscriptions.clone() {
    let app_clone = app_handle.clone();
    if let Some(product_id) = subscription["product_id"].as_str() {
      let product_id = product_id.to_string();
      streams_coordinator.manage_active_streams(app_clone.clone(), product_id.clone()).await;
      // Start WebSocket stream and store data
      tokio::spawn(async move {
        let app_clone_inner = app_clone.clone();
        if let Some((db, _app_state)) = get_app_state_and_db(app_clone_inner).await {
          let product_id_clone = product_id.clone();
          if let Err(e) = start_coinbase_stream(app_clone, db, product_id).await {
            log::error!("Error starting WebSocket stream for {}: {:?}", product_id_clone, e);
          }
        }
      });
    }
  }
  Ok(())
}

impl StreamsCoordinator {
  // ...existing code...

  pub async fn stop_all_active_streams(&self) {
    let mut streams = self.active_streams.lock().await;
    for (product_id, handle) in streams.drain() {
      info!("Stopping active stream for product ID: {}", product_id);
      handle.abort();
    }
  }
}

/* ---------------------------------------------------------------------------------------------- */
