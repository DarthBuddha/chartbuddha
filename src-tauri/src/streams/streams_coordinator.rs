/* ---------------------------------------------------------------------------------------------- */
//! streams/streams_coordinator.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - manage_active_streams
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::error::Error;
use std::collections::HashMap;
use std::sync::Arc;
// Tauri
use tauri::AppHandle;
use tauri::Manager;
use tauri::Wry;
use tauri::async_runtime::Mutex;
// Dependencies
use tokio::task::JoinHandle;
use log::info;
// Crates
use crate::state::app_state::AppState;
use crate::apis::coinbase::coinbase_streams::start_coinbase_stream;
use crate::ws::ws_coordinator::get_app_state_and_db;

/* ---------------------------------------------------------------------------------------------- */

type StreamHandle = JoinHandle<Result<(), Box<dyn Error + Send + Sync>>>;

pub struct StreamsCoordinator {
  pub active_streams: Arc<Mutex<HashMap<String, StreamHandle>>>,
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
    while app_handle.try_state::<AppState>().is_none() && retries > 0 {
      info!("State not managed yet, retrying... ({} retries left)", retries);
      tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;
      retries -= 1;
    }

    let db_state = match app_handle.try_state::<AppState>() {
      Some(state) => state.db.clone(),
      None => {
        info!("State not managed after retries, delaying stream start for product ID: {}", product_id);
        return;
      }
    };

    let streams = self.active_streams.lock().await;
    if !streams.contains_key(&product_id) {
      let app_clone = app_handle.clone();
      let product_id_clone = product_id.clone();
      let _db = db_state.clone(); // Prefix with underscore to suppress warning
      drop(streams); // Release the lock before awaiting
      let handle = tokio::spawn(async move {
        info!("Starting Coinbase stream for product ID: {}", product_id_clone);
        if let Some((db, _app_state)) = get_app_state_and_db(app_clone.clone()).await {
          start_coinbase_stream(app_clone.clone(), db, product_id_clone).await
        } else {
          Err(
            Box::new(
              std::io::Error::new(std::io::ErrorKind::Other, "Failed to get app state and db")
            ) as Box<dyn Error + Send + Sync>
          )
        }
      });
      let mut streams = self.active_streams.lock().await;
      streams.insert(product_id, handle);
    } else {
      info!("Stream for product ID: {} is already active", product_id);
    }
  }

  pub async fn stop_active_stream(&self, product_id: String) {
    let mut streams = self.active_streams.lock().await;
    if let Some(handle) = streams.remove(&product_id) {
      info!("Stopping active stream for product ID: {}", product_id);
      handle.abort();
    } else {
      info!("No active stream found for product ID: {}", product_id);
    }
  }
}

/* ---------------------------------------------------------------------------------------------- */
