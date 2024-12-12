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
// Modules
pub mod apis;
pub mod commands;
pub mod config;
pub mod providers;
// Modules
pub mod stream_manager;
// Rust
// Library Dependencies
use tauri_plugin_log::{Target, TargetKind};
// Local Dependencies
//
/* ---------------------------------- < Function > ---------------------------------- */
/// Main entry point for the ChartBuddha library.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::new()
                .target(tauri_plugin_log::Target::new(
                    tauri_plugin_log::TargetKind::Stdout,
                ))
                .build(),
        )
        // .plugin(tauri_plugin_log::Builder::new().build())
        // .setup(|app| {
        //     if cfg!(debug_assertions) {
        //         app.handle().plugin(
        //             tauri_plugin_log::Builder::default()
        //                 .level(log::LevelFilter::Info)
        //                 .build(),
        //         )?;
        //     }
        //     Ok(())
        // })
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            commands::coinbase::coinbase_delete_keys::coinbase_delete_keys,
            commands::coinbase::coinbase_save_keys::coinbase_save_keys,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
/* ---------------------------------- < End--Code >---------------------------------- */
