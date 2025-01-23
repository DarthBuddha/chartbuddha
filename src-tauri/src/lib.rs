/* ---------------------------------------------------------------------------------------------- */
//! # Module: lib
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * run
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: lib.rs
/* ---------------------------------------------------------------------------------------------- */

// Library
pub mod app;
pub mod broker;
pub mod market;
pub mod news;

/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::sync::{ Arc, Mutex };
// Tauri
// use tauri::Manager;
// use tauri::Wry;
use tauri::async_runtime::spawn;
// SeaORM
// use sea_orm::DatabaseConnection;
// Crates
use crate::app::setup::setup_tauri;
use crate::app::database::initialize_database::initialize_database;
use crate::app::database::database::DbConnection;
use crate::app::database::database::DbStorage;
// Command Modules
use crate::app::setup::setup_complete;
use crate::app::subscriber::commands::subscription_save::subscription_save;
use crate::app::subscriber::commands::subscription_delete::subscription_delete;
use crate::broker::coinbase::commands::coinbase_products_list::coinbase_products_list;
use crate::broker::coinbase::commands::coinbase_store_api_keys::coinbase_store_api_keys;
use crate::broker::coinbase::commands::coinbase_subscribe::coinbase_subscribe;

/* ---------------------------------------------------------------------------------------------- */

// AppState
#[derive(Clone)]
pub struct AppState {
  pub frontend_task: bool,
  pub backend_task: bool,
  // pub db: Arc<Mutex<Option<DatabaseConnection>>>,
}

/* ---------------------------------------------------------------------------------------------- */

// Our main entrypoint in a version 2 mobile compatible app
#[cfg_attr(mobile, tauri::mobile_entry_point)]
#[tokio::main]
pub async fn run() -> () {
  // Initialize the database
  let db = initialize_database().await.expect("Failed to initialize database");

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
    .manage(AppState {
      frontend_task: false,
      backend_task: false,
      // db: Arc::new(Mutex::new(Some(db))),
    })
    .manage(DbStorage { store: Default::default() })
    .manage(DbConnection { db: Arc::new(Mutex::new(Some(db))) })
    .setup(|app| {
      let app_handle = app.handle();
      spawn(setup_tauri(app_handle.clone()));
      Ok(())
    })
    // Manage: Commands
    .invoke_handler(
      tauri::generate_handler![
        // Commands: App
        setup_complete,
        subscription_save,
        subscription_delete,
        // Commands: Coinbase
        coinbase_store_api_keys,
        coinbase_products_list,
        coinbase_subscribe
        // commands::websocket::websocket_cmd::init_websocket_cmd,
        // commands::websocket::websocket_cmd::stop_all_active_streams_cmd
      ]
    )
    // Run: ChartBuddha Application
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

/* ---------------------------------------------------------------------------------------------- */
