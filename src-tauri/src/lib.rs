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
// use std::collections::HashMap;
// Library Dependencies
// use tauri::State;
// Local Dependencies
use crate::commands::connect::coinbase_delete_keys::coinbase_delete_keys;
use crate::commands::connect::coinbase_save_keys::coinbase_save_keys;
// use crate::config::config_manager::config_manager;
// use crate::config::interface::ConnectPage;
// use crate::config::state::AppState;
// use provider::provider_list::ProviderInfo;
//
/* ---------------------------------- < Function > ---------------------------------- */
/// Main entry point for the ChartBuddha library.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            coinbase_save_keys,
            coinbase_delete_keys
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
/* ---------------------------------- < End--Code >---------------------------------- */
