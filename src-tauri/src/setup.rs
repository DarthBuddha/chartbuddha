/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library - Backend
/* ---------------------------------------------------------------------------------------------- */
//! # Module: setup
/* ---------------------------------------------------------------------------------------------- */
//! #### Commands:
//! * setup_complete
//! #### Functions:
//! * setup_tauri
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src-tauri/src/setup.rs
/* ---------------------------------------------------------------------------------------------- */

// Tauri
use tauri::AppHandle;
use tauri::Emitter;
// use tauri::Manager;
use tauri_plugin_store::StoreExt;
// Dependencies
use log::error;
use log::info;
use serde_json::json;
use serde_json::Value;
use tokio::time::{ sleep, Duration };
// Crates
use crate::constants::STATE_STORE;
use crate::db::db::setup_database;
use crate::store::store::initialize_store;

/* ---------------------------------------------------------------------------------------------- */

// A custom task for setting the state of a setup task
#[tauri::command]
pub async fn setup_complete(app: AppHandle) -> Result<(), ()> {
  info!("Setup Complete...");
  let store = app.store(STATE_STORE).map_err(|e| {
    error!("Failed to get store: {}", e);
  })?;

  let store_value: Value = store.get("State").expect("Failed to get value from store");

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
    // let splash_window = app.get_webview_window("splash").unwrap();
    // let main_window = app.get_webview_window("main").unwrap();
    // splash_window.close().unwrap();
    // main_window.show().unwrap();
  } else {
    error!("App Setup is not complete.");
  }

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */

/// Perform the backend setup task
pub async fn setup_tauri(app: AppHandle) -> Result<(), ()> {
  info!("Performing Tauri setup tasks...");
  // let app = AppHandle();

  // Tauri Setup Tasks
  info!("Initialize the store...");
  if let Err(e) = initialize_store(app.clone()) {
    error!("Failed to initialize store: {}", e);
    return Err(());
  }

  setup_database().await.unwrap();

  info!("Fake Pause...");
  sleep(Duration::from_secs(3)).await;

  // Tauri Setup Tasks Complete
  info!("Tauri Ready...");
  let store = app.store(STATE_STORE).unwrap();
  let mut state = store.get("State").unwrap_or(json!({}));
  state["tauri_ready"] = json!(true);
  store.set("State", state);
  info!("Emit: tauri_ready...");
  app.emit("tauri_ready", "").unwrap();

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
