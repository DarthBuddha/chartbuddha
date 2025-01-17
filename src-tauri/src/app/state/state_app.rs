/* ---------------------------------------------------------------------------------------------- */
//! src/state/app_state.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - AppState
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::sync::Arc;
// Tauri
use tauri::async_runtime::Mutex;
// SeaORM
use sea_orm::DatabaseConnection;
// Dependencies
// Crates

/* ---------------------------------------------------------------------------------------------- */
#[derive(Clone)]
pub struct AppState {
  pub db: Arc<Mutex<Option<DatabaseConnection>>>,
}

impl Default for AppState {
  fn default() -> Self {
    AppState {
      db: Arc::new(Mutex::new(None)),
    }
  }
}

/* ---------------------------------------------------------------------------------------------- */
