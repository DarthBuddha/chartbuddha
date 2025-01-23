/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Setup - setup
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! - setup
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/setup/setup.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
// use std::.sync::Mutex;
// Tauri
use tauri::AppHandle;
use tauri::Emitter;
use tauri::Manager;
// use tauri::State;
use tauri_plugin_store::StoreExt;
// Dependencies
use log::error;
use log::info;
use serde_json::json;
use serde_json::Value;
use tokio::time::{ sleep, Duration };
// Crates
// use crate::AppState;
// use crate::app::commands::app_setup_complete::app_setup_complete;
use crate::app::store::store_manager::APP_STORE;
use crate::app::database::initialize_database::initialize_database;
use crate::app::store::initialize_store::initialize_store;

/* ---------------------------------------------------------------------------------------------- */

/// Perform the backend setup task
pub async fn setup_tauri(app: AppHandle) -> Result<(), ()> {
  info!("Performing Tauri setup tasks...");

  // Tauri Setup Tasks
  info!("Initialize the store...");
  if let Err(e) = initialize_store(app.clone()) {
    error!("Failed to initialize store: {}", e);
    return Err(());
  }

  initialize_database().await.unwrap();

  info!("Fake Pause...");
  sleep(Duration::from_secs(3)).await;

  // Tauri Setup Tasks Complete
  info!("Tauri Ready...");
  let store = app.store(APP_STORE).unwrap();
  let mut app_state = store.get("app_state").unwrap_or(json!({}));
  app_state["tauri_ready"] = json!(true);
  store.set("app_state", app_state);
  info!("Emitting tauri-ready event...");
  app.emit("tauri-ready", "").unwrap();

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */

// A custom task for setting the state of a setup task
#[tauri::command]
pub async fn setup_complete(app: AppHandle) -> Result<(), ()> {
  info!("Setup Complete...");
  let store = app.store(APP_STORE).map_err(|e| {
    error!("Failed to get store: {}", e);
  })?;

  let store_value: Value = store.get("app_state").expect("Failed to get value from store");

  let tauri_ready: bool = store_value
    .get("tauri_ready")
    .expect("Failed to get value from store")
    .as_bool()
    .expect("Failed to convert value to bool");

  let react_ready: bool = store_value
    .get("react_ready")
    .expect("Failed to get value from store")
    .as_bool()
    .expect("Failed to convert value to bool");

  if tauri_ready && react_ready {
    let splash_window = app.get_webview_window("splash").unwrap();
    let main_window = app.get_webview_window("main").unwrap();
    splash_window.close().unwrap();
    main_window.show().unwrap();
  } else {
    error!("Tauri setup is not complete.");
  }

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
