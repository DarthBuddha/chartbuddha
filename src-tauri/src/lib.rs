/* ------------------------------------------------------------------------------------------------------------------ */
//! # lib.rs
//!
//! Main entry point for the ChartBuddha library
/* ------------------------------------------------------------------------------------------------------------------ */
//! ### Functions
//! - run
/* ------------------------------------------------------------------------------------------------------------------ */

// Rust
use std::time::Duration;
// Tauri
use tauri::Manager;
// Dependencies
// use serde_json::json;
// Library Modules
pub mod coinbase;
pub mod interface;
// Store: Defaults
use interface::defaults_interface::defaults_interface;
use interface::defaults_keys::defaults_keys;

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
      // Tauri Store Interface Setup
      let store_interface = tauri_plugin_store::StoreBuilder
        ::new(app, ".interface.json")
        .auto_save(Duration::from_millis(100))
        .defaults(defaults_interface())
        .build()?;
      app.manage(store_interface.clone());
      // Reset the store
      store_interface.reset();

      // Tauri Store Keys Setup
      let store_keys = tauri_plugin_store::StoreBuilder
        ::new(app, ".keys.json")
        .auto_save(Duration::from_millis(100))
        .defaults(defaults_keys())
        .build()?;
      app.manage(store_keys.clone());
      store_keys.save()?;

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
          out.finish(format_args!("[{}]\n{}\n[{}]\n", record.level(), message, shortened_target))
        })
        .build()
    )
    // Tauri Command Register
    .invoke_handler(
      tauri::generate_handler![
        coinbase::commands::coinbase_test_api::coinbase_test_api,
        coinbase::commands::coinbase_list_products::coinbase_list_products,
        coinbase::commands::coinbase_get_selected_product::coinbase_get_selected_product
      ]
    )
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

/* ------------------------------------------------------------------------------------------------------------------ */
