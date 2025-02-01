/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library - Backend
/* ---------------------------------------------------------------------------------------------- */
//! # Library -> lib
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Backend Library for the ChartBuddha Application.
/* ---------------------------------------------------------------------------------------------- */
//! #### Function:
//! * run
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src-tauri/src/lib.rs
/* ---------------------------------------------------------------------------------------------- */
// Our main entrypoint in a version 2 mobile compatible app
#[cfg_attr(mobile, tauri::mobile_entry_point)]
// Library
pub mod api;
pub mod connector;
pub mod db;
pub mod store;
// pub mod streamer;
pub mod subscriber;
// pub mod websocket;
pub mod window;

// Modules
pub mod constants;
pub mod setup;

/* ---------------------------------------------------------------------------------------------- */

// Tauri
use tauri::async_runtime::spawn;
// Crates: Setup
use crate::setup::setup_complete;
use crate::setup::setup_tauri;
// Crates: Connector
use crate::connector::commands::connector_coinbase_cmds::drop_coinbase_cmd;
use crate::connector::commands::connector_coinbase_cmds::save_coinbase_cmd;
use crate::connector::commands::connector_database_cmds::drop_database_cmd;
use crate::connector::commands::connector_database_cmds::save_database_cmd;
// Crates: Subscriber
use crate::subscriber::commands::subscriber_cmds;
// TODO: Clean up
use crate::api::coinbase::commands::coinbase_products_list::coinbase_products_list;
use crate::api::coinbase::commands::coinbase_subscribe::coinbase_subscribe;

/* ---------------------------------------------------------------------------------------------- */

#[tokio::main]
pub async fn run() -> () {
  // Manage: Tauri Plugins
  tauri::Builder::default()
    .plugin(tauri_plugin_log::Builder::new().build())
    .plugin(tauri_plugin_shell::init())
    .plugin(tauri_plugin_process::init())
    .plugin(tauri_plugin_sql::Builder::new().build())
    .plugin(tauri_plugin_websocket::init())
    .plugin(tauri_plugin_http::init())
    // Plugin: Log
    .plugin(
      tauri_plugin_log::Builder::new()
        .level(log::LevelFilter::Debug)
        .format(|out, message, record| {
          let target = record.target();
          let shortened_target = if let Some(pos) = target.find("src/") {
            &target[pos..]
          } else {
            target
          };
          out.finish(format_args!(
            "[{}][{}]\n{}\n",
            record.level(),
            shortened_target,
            message
          ))
        })
        .build(),
    )
    // Plugin: Store
    .plugin(tauri_plugin_store::Builder::default().build())
    // Plugin: Window State
    .plugin(tauri_plugin_window_state::Builder::new().build())
    // Setup: Application
    .setup(|app| {
      let app_handle = app.handle();
      spawn(setup_tauri(app_handle.clone()));
      Ok(())
    })
    // Manage: Commands
    .invoke_handler(tauri::generate_handler![
      // Commands: App
      setup_complete,
      // Commands: Interface
      coinbase_products_list,
      coinbase_subscribe,
      // Commands: Connector
      drop_coinbase_cmd,
      save_coinbase_cmd,
      drop_database_cmd,
      save_database_cmd,
      // Commands: Subscriber
      subscriber_cmds::save_subscription_cmd,
      subscriber_cmds::delete_subscription_cmd
    ])
    // Run: ChartBuddha Application
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

/* ---------------------------------------------------------------------------------------------- */
