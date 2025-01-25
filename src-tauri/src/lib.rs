/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Module: lib
/* ---------------------------------------------------------------------------------------------- */
//! #### Main Function:
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

// Tauri
use tauri::async_runtime::spawn;
// Crates
use crate::app::setup::setup_tauri;
use crate::app::setup::setup_complete;
use crate::app::subscriber::subscriber_cmds::save_subscription_cmd;
use crate::app::subscriber::subscriber_cmds::delete_subscription_cmd;
use crate::broker::coinbase::commands::coinbase_products_list::coinbase_products_list;
use crate::broker::coinbase::commands::coinbase_store_api_keys::coinbase_store_api_keys;
use crate::broker::coinbase::commands::coinbase_subscribe::coinbase_subscribe;

/* ---------------------------------------------------------------------------------------------- */

// Our main entrypoint in a version 2 mobile compatible app
#[cfg_attr(mobile, tauri::mobile_entry_point)]
#[tokio::main]
pub async fn run() -> () {
  // Manage: Tauri Plugins
  tauri::Builder
    ::default()
    .plugin(tauri_plugin_log::Builder::new().build())
    .plugin(tauri_plugin_shell::init())
    .plugin(tauri_plugin_process::init())
    .plugin(tauri_plugin_sql::Builder::new().build())
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
        // Commands: Subscriber
        save_subscription_cmd,
        delete_subscription_cmd,
        // Commands: Coinbase
        coinbase_store_api_keys,
        coinbase_products_list,
        coinbase_subscribe
      ]
    )
    // Run: ChartBuddha Application
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

/* ---------------------------------------------------------------------------------------------- */
