//! # lib
//!
//! ### Functions
//! - run
//!
/* ---------------------------------------------------------------------------------- */
//
// Tauri
use tauri::Manager;
use tauri_plugin_store::StoreExt;
// Local Modules
pub mod apis;
pub mod commands;
//
/* ---------------------------------------------------------------------------------- */
/// Main entry point for the ChartBuddha library
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // Tauri Plugin Shell Setup
        .plugin(tauri_plugin_shell::init())
        // Tauri Store Setup
        .plugin(tauri_plugin_store::Builder::new().build())
        .setup(|app| {
            // Tauri Store for Providers
            // Store: Interface
            let store_interface = app.store(".interface.json")?;
            app.manage(store_interface);
            // Store: Providers
            let store_providers = app.store(".providers.json")?;
            app.manage(store_providers);
            // Store: Subscriptions
            let store_subscriptions = app.store(".subscriptions.json")?;
            app.manage(store_subscriptions);
            // Store: Coinbase Products
            let store_coinbase_products = app.store("coinbase_products.json")?;
            app.manage(store_coinbase_products);
            Ok(())
        })
        // .plugin(tauri_plugin_log::Builder::new().build())
        // Tauri Window State Setup
        .plugin(tauri_plugin_window_state::Builder::new().build())
        // Tauri Logging Setup
        .plugin(
            tauri_plugin_log::Builder::new()
                // .level(log::LevelFilter::Info)
                .clear_targets()
                .target(tauri_plugin_log::Target::new(
                    tauri_plugin_log::TargetKind::Stdout,
                ))
                // TODO - Add stderr target
                // .target(tauri_plugin_log::Target::new(
                //     tauri_plugin_log::TargetKind::Stderr,
                // ))
                .format(|out, message, record| {
                    out.finish(format_args!("[{}] {}", record.level(), message))
                })
                .build(),
        )
        // Tauri Command Register
        .invoke_handler(tauri::generate_handler![
            commands::coinbase::connect::coinbase_test_api::coinbase_test_api,
            commands::coinbase::subscribe::coinbase_list_products::coinbase_list_products,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
/* ---------------------------------------------------------------------------------- */
