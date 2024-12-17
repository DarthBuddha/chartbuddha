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
// Local Dependencies
// Modules
pub mod apis;
pub mod commands;
pub mod providers;
pub mod settings;
//
/* ---------------------------------- < Function > ---------------------------------- */
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
            // Tauri Store for Connect page. Holds list of configured providers.
            // let store_interface_connect = app.store("interface_connect.json")?;
            // app.manage(store_interface_connect);
            Ok(())
        })
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_window_state::Builder::new().build())
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
        .invoke_handler(tauri::generate_handler![
            commands::coinbase::coinbase_keys_test::coinbase_keys_test,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
/* ---------------------------------- < End--Code >---------------------------------- */
