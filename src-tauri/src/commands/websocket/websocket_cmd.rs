/* ---------------------------------------------------------------------------------------------- */
//! commands/websocket/websocket_cmd.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - init_websocket_cmd
//! - stop_all_active_streams_cmd
/* ---------------------------------------------------------------------------------------------- */

// Rust
// Tauri
use tauri::AppHandle;
use log::{ info, error };
use tauri::Manager;
// Dependencies
// Crates
// use crate::app::state::state_app::AppState;
use crate::ws::init_ws::initialize_websocket;
use crate::streams::streams_coordinator::StreamsCoordinator;

/* ---------------------------------------------------------------------------------------------- */

#[tauri::command]
pub async fn init_websocket_cmd(app_handle: AppHandle) -> Result<(), String> {
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

#[tauri::command]
pub async fn stop_all_active_streams_cmd() -> Result<(), String> {
  let streams_coordinator = StreamsCoordinator::new();
  streams_coordinator.stop_all_active_streams().await;
  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
