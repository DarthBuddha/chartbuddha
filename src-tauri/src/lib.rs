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
// Modules
pub mod apis;
pub mod commands;
pub mod db;
pub mod stores;
// Crates
use crate::db::initialize_db::initialize_database;
use crate::stores::initialize_stores::initialize_stores;

/* ------------------------------------------------------------------------------------------------------------------ */

pub struct AppState {
  pub db: Arc<Mutex<DatabaseConnection>>,
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
      let handle = app.app_handle();
      let db_connection = tauri::async_runtime::block_on(initialize_database());
      match db_connection {
        Ok(db) => {
          app.manage(AppState { db });
        }
        Err(e) => {
          error!("Error initializing the database: {:?}", e);
        }
      }
      if let Err(e) = initialize_stores(handle.clone()) {
        error!("Error during store initialization: {:?}", e);
      }
      Ok(())
    })
    // Run ChartBuddha Application
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

/* ------------------------------------------------------------------------------------------------------------------ */
