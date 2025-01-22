/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Streams - streams
/* ---------------------------------------------------------------------------------------------- */
//! #### Structs:
//! * Streams
//! #### Functions:
//! * streams
//! * stop_active_stream
//! * stop_all_active_streams
//! * coordinate_subscriptions
//! * get_app_state_and_db
//! * save_to_database
//! * manage_active_streams
//! * start_coinbase_stream
//! * start_binance_stream
//! * start_kraken_stream
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/streams/streams.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
use std::error::Error;
use std::sync::Arc;
// Tauri
use tauri::AppHandle;
use tauri::async_runtime::Mutex;
use tauri::Manager;
use tauri::State;
use tauri::Wry;
// SeaOrm
use sea_orm::Set;
use sea_orm::ActiveModelTrait;
use sea_orm::DatabaseConnection;
// Dependencies
use chrono::FixedOffset;
use chrono::Utc;
use log::{ info, error };
use tokio::task::JoinHandle;
// Crates
// use crate::app::entities::app_subscriptions::ActiveModel;
use crate::AppState;
use crate::broker::coinbase::coinbase_subscriber::coinbase_subscriber;

/* ---------------------------------------------------------------------------------------------- */

type StreamHandle = JoinHandle<Result<(), Box<dyn Error + Send + Sync>>>;

pub struct Streams {
  pub active_streams: Arc<Mutex<HashMap<String, StreamHandle>>>,
}

impl Streams {
  pub fn new() -> Self {
    Self {
      active_streams: Arc::new(Mutex::new(HashMap::new())),
    }
  }

  pub async fn streams(&self, app_handle: AppHandle<Wry>, symbol: String) {
    info!("Managing active stream for symbol: {}", symbol);
  }

  pub async fn stop_active_stream(&self, symbol: String) {
    let mut streams = self.active_streams.lock().await;
    if let Some(handle) = streams.remove(&symbol) {
      info!("Stopping active stream for symbol: {}", symbol);
      handle.abort();
    } else {
      info!("No active stream found for symbol: {}", symbol);
    }
  }

  pub async fn stop_all_active_streams(&self) {
    let mut streams = self.active_streams.lock().await;
    for (product_id, handle) in streams.drain() {
      info!("Stopping active stream for product ID: {}", product_id);
      handle.abort();
    }
  }

  pub async fn manage_active_streams(&self, app_handle: AppHandle<Wry>, product_id: String) {
    let mut streams = self.active_streams.lock().await;
    if streams.contains_key(&product_id) {
      info!("Stream for product ID {} is already active", product_id);
    } else {
      let app_clone = app_handle.clone();
      let product_id_clone = product_id.clone();
      let handle = tokio::spawn(async move {
        let result = coinbase_subscriber(app_clone, product_id.clone()).await;
        if let Err(e) = &result {
          error!("Error in WebSocket stream for {}: {:?}", product_id, e);
        }
        result
      });
      streams.insert(product_id_clone, handle);
    }
  }
}

pub async fn coordinate_subscriptions(
  app_handle: AppHandle<Wry>,
  coinbase_subscriptions: &Vec<serde_json::Value>
) -> Result<(), Box<dyn Error + Send + Sync>> {
  let streams_coordinator = Streams::new();
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
          // if let Err(e) = start_coinbase_stream(app_clone, db, product_id).await {
          //   log::error!("Error starting WebSocket stream for {}: {:?}", product_id_clone, e);
          // }
        }
      });
    }
  }
  Ok(())
}

pub async fn get_app_state_and_db(
  app_handle: AppHandle<Wry>
) -> Option<(Arc<Mutex<DatabaseConnection>>, AppState)> {
  let app_state: State<'_, AppState> = app_handle.state();
  let db_option = match app_state.db.lock() {
    Ok(db) => db,
    Err(e) => {
      error!("Failed to lock the database: {}", e);
      return None;
    }
  };
  if let Some(db) = &*db_option {
    Some((Arc::new(Mutex::new(db.clone())), (*app_state).clone())) // Dereference State to get AppState
  } else {
    None
  }
}

pub async fn save_to_database(
  db: Arc<tauri::async_runtime::Mutex<DatabaseConnection>>,
  data: &str
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
  let db = db.lock().await;
  let db_clone = db.clone(); // Clone the DatabaseConnection
  info!("Saving data to database: {}", data);
  let json_data: serde_json::Value = serde_json::from_str(data)?;

  if let Some(trade_id) = json_data["trade_id"].as_str() {
    let ticker = crate::app::entities::coinbase_ticker::ActiveModel {
      // Record id
      trade_id: Set(trade_id.to_string()),
      // Trade: Data
      product_id: Set(json_data["product_id"].as_str().unwrap_or_default().to_string()),
      volume_24_h: Set(
        json_data["volume_24_h"].as_str().unwrap_or_default().parse().unwrap_or_default()
      ),
      low_24_h: Set(json_data["low_24_h"].as_str().unwrap_or_default().parse().unwrap_or_default()),
      high_24_h: Set(
        json_data["high_24_h"].as_str().unwrap_or_default().parse().unwrap_or_default()
      ),
      low_52_w: Set(json_data["low_52_w"].as_str().unwrap_or_default().parse().unwrap_or_default()),
      high_52_w: Set(
        json_data["high_52_w"].as_str().unwrap_or_default().parse().unwrap_or_default()
      ),
      price_percent_chg_24_h: Set(
        json_data["price_percent_chg_24_h"].as_str().unwrap_or_default().parse().unwrap_or_default()
      ),
      best_bid: Set(json_data["best_bid"].as_str().unwrap_or_default().parse().unwrap_or_default()),
      best_ask: Set(json_data["best_ask"].as_str().unwrap_or_default().parse().unwrap_or_default()),
      best_bid_quantity: Set(
        json_data["best_bid_quantity"].as_str().unwrap_or_default().parse().unwrap_or_default()
      ),
      best_ask_quantity: Set(
        json_data["best_ask_quantity"].as_str().unwrap_or_default().parse().unwrap_or_default()
      ),
      // Housekeeping fields
      created_at: Set(Utc::now().with_timezone(&FixedOffset::east_opt(0).unwrap())),
      updated_at: Set(Utc::now().with_timezone(&FixedOffset::east_opt(0).unwrap()).naive_utc()),
      ..Default::default()
    };
    if let Err(e) = ticker.insert(&db_clone).await {
      error!("Failed to save ticker to database: {}", e);
    }
  }

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
