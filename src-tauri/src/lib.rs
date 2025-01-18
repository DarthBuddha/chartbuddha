/* ------------------------------------------------------------------------------------------------------------------ */
//! lib.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Functions
//! - run
/* ------------------------------------------------------------------------------------------------------------------ */

// Rust
// use std::sync::Arc;
// use std::error::Error;
// Tauri
// use log::error;
use tauri::Manager;
use tauri::async_runtime::Mutex;
// Module Library
pub mod apis;
pub mod commands;
pub mod db;
pub mod state;
pub mod stores;
// pub mod streams;
// pub mod ws;
// Crates
use crate::db::initialize_db::initialize_database;
use crate::state::app_state::AppState;
use crate::stores::initialize_stores::initialize_stores;
// use crate::ws::initialize_ws::initialize_websocket;

/* ------------------------------------------------------------------------------------------------------------------ */

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
    // Setup Tauri Application
    .setup(|app| {
      app.manage(Mutex::new(AppState::default()));
      initialize_stores(app.handle().clone())?;
      tauri::async_runtime::block_on(initialize_database())?;
      Ok(())
    })
    // Run ChartBuddha Application
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

/* ------------------------------------------------------------------------------------------------------------------ */
