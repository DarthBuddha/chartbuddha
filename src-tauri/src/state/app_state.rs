/* ------------------------------------------------------------------------------------------------------------------ */
//! src/state/app_state.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Structs
//! - AppState
/* ------------------------------------------------------------------------------------------------------------------ */

// Rust
use std::sync::Arc;
// Tauri
use tauri::async_runtime::Mutex;
// SeaORM
use sea_orm::DatabaseConnection;
// Dependencies
// Crates

/* ------------------------------------------------------------------------------------------------------------------ */

pub struct AppState {
  pub db: Arc<Mutex<Option<DatabaseConnection>>>,
  pub ws_handle: Arc<Mutex<Option<tokio::task::JoinHandle<()>>>>,
}

impl Default for AppState {
  fn default() -> Self {
    AppState {
      db: Arc::new(Mutex::new(None)),
      ws_handle: Arc::new(Mutex::new(None)),
    }
  }
}

/* ------------------------------------------------------------------------------------------------------------------ */
