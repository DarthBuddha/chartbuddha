/* ------------------------------------------------------------------------------------------------------------------ */
//! module_name.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Functions
//! - rust_function
/* ------------------------------------------------------------------------------------------------------------------ */

// Rust
// Tauri
use tauri::AppHandle;
use log::{ info, error };
use tauri::Manager;
// Dependencies
// Crates
use crate::state::app_state::AppState;
use crate::ws::init_ws::initialize_websocket;

/* ------------------------------------------------------------------------------------------------------------------ */

#[tauri::command]
pub async fn initialize_websocket_command(app_handle: AppHandle) -> Result<(), String> {
  info!("Initializing WebSocket...");
  if app_handle.try_state::<AppState>().is_some() {
    match initialize_websocket(app_handle).await {
      Ok(_) => {
        info!("WebSocket initialized successfully");
        Ok(())
      }
      Err(e) => {
        error!("Failed to initialize WebSocket: {}", e);
        Err(e.to_string())
      }
    }
  } else {
    info!("AppState not managed yet, skipping WebSocket initialization");
    Ok(()) // Return Ok instead of an error
  }
}

/* ------------------------------------------------------------------------------------------------------------------ */
