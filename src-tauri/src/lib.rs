//! # lib
//!
//! ### Functions
//! - run
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// Tauri
use tauri::Manager;
use tauri_plugin_store::StoreExt;
// Dependencies
use serde_json::json;
// Local Modules
pub mod apis;
pub mod commands;
//
/* ------------------------------------------------------------------------------------------------------------------ */
/// Main entry point for the ChartBuddha library
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder
    ::default()

    // Tauri Plugin Shell Setup
    .plugin(tauri_plugin_shell::init())

    // Tauri Store Setup
    .plugin(tauri_plugin_store::Builder::new().build())

    // Tauri Store: Interface
    .setup(|app| {
      let store_interface = app.store(".interface.json")?;
      app.manage(store_interface.clone());
      // Set the initial interface state
      store_interface.set("interface", json!({
        "selectedPage": "home"
      }));

      // Tauri Store: keys
      let store_keys = app.store(".keys.json")?;
      app.manage(store_keys);

      // Tauri Store: Subscriptions
      let store_subscriptions = app.store(".subscriptions.json")?;
      app.manage(store_subscriptions);

      Ok(())
    })
    // .plugin(tauri_plugin_log::Builder::new().build())
    // Tauri Window State Setup
    .plugin(tauri_plugin_window_state::Builder::new().build())
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
        commands::coinbase::coinbase_test_api::coinbase_test_api,
        commands::coinbase::coinbase_list_products::coinbase_list_products,
        commands::coinbase::coinbase_get_selected_product::coinbase_get_selected_product
      ]
    )
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
/* ------------------------------------------------------------------------------------------------------------------ */
