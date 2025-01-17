/* ------------------------------------------------------------------------------------------------------------------ */
//! lib.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Functions
//! - run
/* ------------------------------------------------------------------------------------------------------------------ */

// Tauri
use log::error;
use tauri::Manager;
// use tauri::AppHandle;
// Database
use std::sync::Arc;
use tokio::sync::Mutex;
use sea_orm::DatabaseConnection;
// ChartBuddha Modules
pub mod apis;
pub mod commands;
pub mod db;
pub mod stores;
pub mod websocket_coordinator;
// Crates
use crate::apis::coinbase::coinbase_websocket::connect_to_coinbase;
use crate::db::initialize_db::initialize_database;
use crate::stores::initialize_stores::initialize_stores;

/* ------------------------------------------------------------------------------------------------------------------ */

pub struct AppState {
  pub db: Arc<Mutex<DatabaseConnection>>,
  pub ws_handle: Arc<Mutex<Option<tokio::task::JoinHandle<()>>>>,
}

/// Main entry point for the ChartBuddha library
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder
    ::default()
    // Plugin Shell Setup
    .plugin(tauri_plugin_shell::init())
    // Window State Plugin
    .plugin(tauri_plugin_window_state::Builder::new().build())
    // Store Plugin
    .plugin(tauri_plugin_store::Builder::default().build())
    // Logging Plugin
    .plugin(
      tauri_plugin_log::Builder
        ::new()
        .level(log::LevelFilter::Debug)
        // .clear_targets()
        .format(|out, message, record| {
          let target = record.target();
          let shortened_target = if let Some(pos) = target.find("src/") { &target[pos..] } else { target };
          out.finish(format_args!("[{}][{}]\n{}\n", record.level(), shortened_target, message))
        })
        .build()
    )
    // Tauri Command Register
    .invoke_handler(
      tauri::generate_handler![
        commands::connect::coinbase_store_api_keys::coinbase_store_api_keys,
        commands::subscribe::coinbase_products_list::coinbase_products_list,
        commands::subscribe::coinbase_subscribe::coinbase_subscribe
      ]
    )
    // Tauri Startup Setup
    .setup(|app| {
      tauri::async_runtime::block_on(async move {
        let handle = app.app_handle().clone();
        let db_connection = tauri::async_runtime::block_on(initialize_database());
        match db_connection {
          Ok(db) => {
            app.manage(AppState { db, ws_handle: Arc::new(Mutex::new(None)) });
          }
          Err(e) => {
            error!("Error initializing the database: {:?}", e);
          }
        }
        if let Err(e) = initialize_stores(handle.clone()) {
          error!("Error during store initialization: {:?}", e);
        }

        // Start WebSocket connection
        // let app_state = app.state::<AppState>();
        // let db = app_state.db.clone();
        // let ws_handle = tokio::spawn(async move {
        //   if let Err(e) = connect_to_coinbase(handle.clone(), db.lock().await.clone()).await {
        //     error!("WebSocket connection error: {:?}", e);
        //   }
        // });
        // *app_state.inner().ws_handle.lock().await = Some(ws_handle);

        Ok::<_, Box<dyn std::error::Error>>(())
      })
    })
    // Run ChartBuddha Application
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

/* ------------------------------------------------------------------------------------------------------------------ */
