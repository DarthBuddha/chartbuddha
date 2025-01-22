/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha: lib Module
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * run
/* ---------------------------------------------------------------------------------------------- */
//! ##### lib.rs
/* ---------------------------------------------------------------------------------------------- */

// Library
pub mod app;
pub mod broker;
pub mod market;
pub mod news;

/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::sync::Arc;
use std::sync::Mutex;
// Tauri
use tauri::async_runtime::spawn;
// Crates
use crate::app::setup::setup::setup;
use crate::app::setup::setup_database::initialize_database;
use crate::app::state::app_state::AppState;

/* ---------------------------------------------------------------------------------------------- */

// Our main entrypoint in a version 2 mobile compatible app
#[cfg_attr(mobile, tauri::mobile_entry_point)]
#[tokio::main]
pub async fn run() -> () {
  // Manage: Tauri Plugins
  tauri::Builder
    ::default()
    .plugin(tauri_plugin_websocket::init())
    .plugin(tauri_plugin_http::init())
    // Plugin: Log
    .plugin(
      tauri_plugin_log::Builder
        ::new()
        .level(log::LevelFilter::Debug)
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
    // Plugin: Store
    .plugin(tauri_plugin_store::Builder::default().build())
    // Plugin: Window State
    // .plugin(tauri_plugin_window_state::Builder::new().build())
    // Manage: State
    .manage(
      Mutex::new(AppState {
        frontend_task: false,
        backend_task: false,
        db: Arc::new(Mutex::new(None)),
      })
    )
    .manage(initialize_database().await.expect("Failed to initialize database"))
    // Manage: Commands
    .invoke_handler(
      tauri::generate_handler![
        // App Setup
        app::commands::app_setup_complete::app_setup_complete,
        // Interface Subscribe Page
        app::commands::subscription_save::subscription_save,
        // old commands
        app::commands::coinbase_store_api_keys::coinbase_store_api_keys,
        app::commands::coinbase_products_list::coinbase_products_list,
        app::commands::coinbase_subscribe::coinbase_subscribe
        // commands::websocket::websocket_cmd::init_websocket_cmd,
        // commands::websocket::websocket_cmd::stop_all_active_streams_cmd
      ]
    )
    // Manage: Setup
    .setup(|app| {
      spawn(setup(app.handle().clone()));
      Ok(())
    })
    // Run: ChartBuddha Application
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

/* ---------------------------------------------------------------------------------------------- */
