//! # ChartBuddha library
//! - Module: `lib`
//! - Description: ChartBuddha Library.
//! ### Functions
//! - `run`
//! ##### lib.rs
//
// Sub-Modules
// pub mod config;
pub mod commands;
pub mod providers;
// Modules
pub mod stream_manager;
// Rust
// use std::collections::HashMap;
// Library Dependencies
// use tauri::State;
// Local Dependencies
// use crate::config::config_manager::config_manager;
// use crate::config::interface::ConnectPage;
// use crate::config::state::AppState;
// use provider::provider_list::ProviderInfo;
//
/* ---------------------------------- < Function > ---------------------------------- */
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

/// Main entry point for the backend
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        // .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
/* ---------------------------------- < End--Code >---------------------------------- */
