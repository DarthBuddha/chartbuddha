/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Commands - websocket_cmd
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions
//! * init_websocket_cmd
//! * stop_all_active_streams_cmd
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/commands/websocket_cmd.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
// Tauri
use tauri::AppHandle;
use log::{ info, error };
use tauri::Manager;
// Dependencies
// Crates
use crate::AppState;
use crate::app::websocket::websocket::initialize_websocket;
use crate::app::streams::streams::Streams;

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
  let streams_coordinator = Streams::new();
  streams_coordinator.stop_all_active_streams().await;
  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
