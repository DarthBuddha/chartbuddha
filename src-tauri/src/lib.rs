/* ---------------------------------------------------------------------------------------------- */
//! # lib.rs
//!
//! Main entry point for the ChartBuddha library
/* ---------------------------------------------------------------------------------------------- */
//! ### Functions
//! - run
/* ---------------------------------------------------------------------------------------------- */

// Tauri
use tauri::Manager;
// Library Modules
pub mod coinbase;
pub mod commands;
pub mod stores;
// Crates
use crate::stores::initialize_stores::initialize_stores;

/* ---------------------------------------------------------------------------------------------- */

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
        commands::connect::coinbase_api_save::coinbase_api_save,
        commands::subscribe::coinbase_product_list::coinbase_product_list
        // coinbase::commands::coinbase_get_selected_product::coinbase_get_selected_product
      ]
    )

    // Run ChartBuddha Application
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

/* ---------------------------------------------------------------------------------------------- */
