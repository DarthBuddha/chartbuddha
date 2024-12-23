//! # ChartBuddha library
//!
//! - Module: lib
//! - Description: ChartBuddha Library.
//!
//! ### Functions
//! - `run`
//!
//! ##### lib.rs
//
// Rust
// Tauri
use tauri::Manager;
use tauri_plugin_store::StoreExt;
// Modules
pub mod binance;
pub mod coinbase;
//
/* --------------------------------------------------------------------- < Function > */
/// Main entry point for the ChartBuddha library.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .setup(|app| {
            // Tauri Store for Date Providers. Holds list of API Keys.
            let store_providers = app.store("providers.json")?;
            app.manage(store_providers);
            // Tauri Store for Coinbase Provider. Holds list of products.
            let store_coinbase_products = app.store("coinbase_products.json")?;
            app.manage(store_coinbase_products);
            Ok(())
        })
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_window_state::Builder::new().build())
        // Tauri Logging Plugin
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
            coinbase::commands::connect_coinbase_api::connect_coinbase_api,
            // coinbase::commands::coinbase_list_products::coinbase_list_products,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
/* --------------------------------------------------------------------- < End-Code > */
