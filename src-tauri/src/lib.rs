/* ---------------------------------------------------------------------------------------------- */
//! lib.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - run
/* ---------------------------------------------------------------------------------------------- */

// Rust
// Tauri
use tauri::async_runtime::spawn;
// Dependencies
use tokio::sync::Mutex;
use std::sync::Arc;
// Library
pub mod apis;
pub mod app;
pub mod commands;
pub mod db;
pub mod streams;
pub mod ws;
// Crates
use crate::app::setup::setup::setup;
use crate::app::setup::setup_state::SetupState;
use crate::app::store::store_init::init_stores;

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
    // Splashscreen Plugin
    .manage(
      Arc::new(
        Mutex::new(SetupState {
          frontend_task: false,
          backend_task: false,
        })
      )
    )
    // Tauri Command Register
    .invoke_handler(
      tauri::generate_handler![
        app::commands::cmd_app_setup::cmd_app_setup,
        commands::connect::coinbase_store_api_keys::coinbase_store_api_keys,
        commands::subscribe::coinbase_products_list::coinbase_products_list,
        commands::subscribe::coinbase_subscribe::coinbase_subscribe,
        commands::websocket::websocket_cmd::init_websocket_cmd,
        commands::websocket::websocket_cmd::stop_all_active_streams_cmd
      ]
    )
    // Setup Tauri Application
    .setup(|app| {
      init_stores(app.handle().clone())?;
      // Spawn setup as a non-blocking task so the windows can be
      // created and ran while it executes
      spawn(setup(app.handle().clone()));
      Ok(())
    })
    // Run ChartBuddha Application
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

/* ---------------------------------------------------------------------------------------------- */
