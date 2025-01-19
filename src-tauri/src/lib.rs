/* ---------------------------------------------------------------------------------------------- */
//! lib.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - run
/* ---------------------------------------------------------------------------------------------- */

// Rust
// use std::sync::Arc;
// use std::error::Error;
// Tauri
// use log::error;
use log::info;
use tauri::Manager;
// Module Library
pub mod apis;
pub mod commands;
pub mod db;
pub mod state;
pub mod stores;
pub mod streams;
pub mod ws;
// Crates
use crate::state::app_state::AppState;
use crate::db::init_database::init_database;
use crate::stores::init_stores::init_stores;

/* ---------------------------------------------------------------------------------------------- */

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
          let shortened_target = if let Some(pos) = target.find("src/") {
            &target[pos..]
          } else {
            target
          };
          out.finish(format_args!("[{}][{}]\n{}\n", record.level(), shortened_target, message))
        })
        .build()
    )
    // Tauri Command Register
    .invoke_handler(
      tauri::generate_handler![
        commands::connect::coinbase_store_api_keys::coinbase_store_api_keys,
        commands::subscribe::coinbase_products_list::coinbase_products_list,
        commands::subscribe::coinbase_subscribe::coinbase_subscribe,
        commands::websocket::websocket_cmd::init_websocket_cmd,
        commands::websocket::websocket_cmd::stop_all_active_streams_cmd
      ]
    )
    // Setup Tauri Application
    .setup(|app| {
      let app_state = AppState::default();
      app.manage(app_state);
      init_stores(app.handle().clone())?;
      tauri::async_runtime::block_on(init_database())?;
      info!("Database initialized successfully");
      Ok(())
    })
    // Run ChartBuddha Application
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

/* ---------------------------------------------------------------------------------------------- */
