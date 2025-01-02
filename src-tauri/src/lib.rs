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
    .setup(|app| {
      // Tauri Store: Interface
      let store_window = app.store(".window.json")?;
      app.manage(store_window.clone());
      store_window.set("window", json!({
          "selected_Page": "Home"
        }));

      // Tauri Store: Broker
      let store_broker = app.store(".broker.json")?;
      app.manage(store_broker.clone());
      store_broker.set(
        "broker",
        json!({
        "selected_Broker": "none",
        "selected_BrokerProduct": "none",
        "selected_BrokerProductType": "none"
      })
      );

      // Tauri Store: keys
      let store_keys = app.store(".keys.json")?;
      app.manage(store_keys);

      // Tauri Store: Subscriptions
      let store_subscriptions = app.store(".subscriptions.json")?;
      app.manage(store_subscriptions);

      // Store: Coinbase Products
      // let store_coinbase_products = app.store("coinbase_products.json")?;
      // app.manage(store_coinbase_products);

      //
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
        // .target(tauri_plugin_log::Target::new(tauri_plugin_log::TargetKind::Stdout))
        // TODO - Add stderr target
        // .target(tauri_plugin_log::Target::new(
        //     tauri_plugin_log::TargetKind::Stderr,
        // ))
        // .format(|out, message, record| out.finish(format_args!("[{}] {}", record.level(), message)))
        .format(|out, message, record| {
          let target = record.target();
          let shortened_target = if let Some(pos) = target.find("src/") { &target[pos..] } else { target };
          out.finish(format_args!("[{} {}] {}", record.level(), shortened_target, message))
        })
        .build()
    )
    // Tauri Command Register
    .invoke_handler(
      tauri::generate_handler![
        commands::coinbase::connect::coinbase_test_api::coinbase_test_api,
        commands::coinbase::subscribe::coinbase_list_products::coinbase_list_products,
        commands::coinbase::subscribe::coinbase_get_selected_product::coinbase_get_selected_product
      ]
    )
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
/* ------------------------------------------------------------------------------------------------------------------ */
