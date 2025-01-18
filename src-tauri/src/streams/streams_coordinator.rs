/* ------------------------------------------------------------------------------------------------------------------ */
//! streams/streams_coordinator.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Functions
//! - manage_active_streams
/* ------------------------------------------------------------------------------------------------------------------ */

// Rust
use std::collections::HashMap;
use std::sync::{ Arc, Mutex };
// Tauri
use tauri::AppHandle;
use tauri::Wry;
// Dependencies
use tokio::task::JoinHandle;
use log::info;
// Crates
use crate::apis::coinbase::coinbase_streams::start_coinbase_stream;

/* ------------------------------------------------------------------------------------------------------------------ */

type StreamHandle = JoinHandle<Result<(), Box<dyn std::error::Error + Send + Sync>>>;

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
    let mut streams = self.active_streams.lock().unwrap();
    if !streams.contains_key(&product_id) {
      let app_clone = app_handle.clone();
      let product_id_clone = product_id.clone();
      let handle = tokio::spawn(async move { start_coinbase_stream(app_clone, product_id_clone).await });
      streams.insert(product_id, handle);
    }
  }
}

/* ------------------------------------------------------------------------------------------------------------------ */
