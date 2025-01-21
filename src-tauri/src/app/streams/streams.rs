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
use crate::app::state::app_state::AppState;

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
}

/* ---------------------------------------------------------------------------------------------- */
