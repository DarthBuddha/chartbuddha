/* ------------------------------------------------------------------------------------------------------------------ */
//! streams/streams_coordinator.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Functions
//! - manage_active_streams
/* ------------------------------------------------------------------------------------------------------------------ */

// Rust
use std::error::Error;
use std::collections::HashMap;
use std::sync::Arc;
// Tauri
use tauri::AppHandle;
use tauri::Manager;
use tauri::Wry;
use tauri::async_runtime::Mutex;
// use tauri::State;
// SeaORM
use sea_orm::DatabaseConnection;
// Dependencies
use tokio::task::JoinHandle;
use log::info;
// Crates
use crate::apis::coinbase::coinbase_streams::start_coinbase_stream;

/* ------------------------------------------------------------------------------------------------------------------ */

type StreamHandle = JoinHandle<Result<(), Box<dyn Error + Send + Sync>>>;

pub struct StreamsCoordinator {
  active_streams: Arc<Mutex<HashMap<String, StreamHandle>>>,
}

impl StreamsCoordinator {
  pub fn new() -> Self {
    Self {
      active_streams: Arc::new(Mutex::new(HashMap::new())),
    }
  }

  pub async fn manage_active_streams(&self, app_handle: AppHandle<Wry>, product_id: String) {
    info!("Managing active stream for product ID: {}", product_id);

    // Retry mechanism to ensure the state is managed before proceeding
    let mut retries = 5;
    while app_handle.try_state::<Arc<Mutex<DatabaseConnection>>>().is_none() && retries > 0 {
      info!("State not managed yet, retrying... ({} retries left)", retries);
      tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;
      retries -= 1;
    }

    let db_state = match app_handle.try_state::<Arc<Mutex<DatabaseConnection>>>() {
      Some(state) => state,
      None => {
        info!("State not managed after retries, delaying stream start for product ID: {}", product_id);
        return;
      }
    };

    let mut streams = self.active_streams.lock().await;
    if !streams.contains_key(&product_id) {
      let app_clone = app_handle.clone();
      let product_id_clone = product_id.clone();
      let db = db_state.clone();
      drop(streams); // Release the lock before awaiting
      let handle = tokio::spawn(async move { start_coinbase_stream(app_clone, db, product_id_clone).await });
      let mut streams = self.active_streams.lock().await;
      streams.insert(product_id, handle);
    }
  }
}

/* ------------------------------------------------------------------------------------------------------------------ */
