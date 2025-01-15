/* ------------------------------------------------------------------------------------------------------------------ */
//! # lib.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! ### Functions
//! - run
/* ------------------------------------------------------------------------------------------------------------------ */

// Tauri
use tauri::Manager;
pub mod commands;
pub mod entities;
pub mod stores;
pub mod structs;
// Crates
use crate::stores::initialize_stores::initialize_stores;

/* ------------------------------------------------------------------------------------------------------------------ */

/// Main entry point for the ChartBuddha library
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder
    ::default()
    // Tauri Plugin Shell Setup
    .plugin(tauri_plugin_shell::init())
    // Tauri Window State Setup
    .plugin(tauri_plugin_window_state::Builder::new().build())
    // Tauri Store Setup
    .plugin(tauri_plugin_store::Builder::default().build())
    .setup(|app| {
      if let Err(e) = initialize_stores(app.app_handle().clone()) {
        eprintln!("Error during startup: {:?}", e);
      }
      Ok(())
    })
    // Tauri Logging Setup
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
        commands::coinbase::connect::coinbase_store_api_keys::coinbase_store_api_keys,
        commands::coinbase::subscribe::coinbase_products_list::coinbase_products_list,
        commands::coinbase::subscribe::coinbase_subscribe::coinbase_subscribe
      ]
    )
    // Run ChartBuddha Application
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

/* ------------------------------------------------------------------------------------------------------------------ */
