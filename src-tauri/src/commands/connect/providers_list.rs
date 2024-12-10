//! # ChartBuddha library
//! - Module: `providers_list`
//! - Description: List of configured providers.
//! ### Structs
//! - `ConnectConfig`
//! - `ProviderStatus`
//! ### Functions
//! - `get_configured_providers`
//! ##### interface/connect/providers_list.rs
//
// Rust
use std::collections::HashMap;
use std::fs::File;
use std::io::Read;
// Library Dependencies
use serde::{Deserialize, Serialize};
//
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct to hold the configuration of the providers
#[derive(Debug, Serialize, Deserialize)]
struct ConnectConfig {
    providers: HashMap<String, ProviderStatus>,
}
//
/// Struct to hold the status of the provider
#[derive(Debug, Serialize, Deserialize)]
struct ProviderStatus {
    configured: bool,
}
//
/* ---------------------------------- < Function > ---------------------------------- */
/// Tauri command to get the list of configured providers
#[tauri::command]
pub fn get_configured_providers() -> Result<Vec<String>, String> {
    let file_path = "runtime/config/interface.json";

    // Read and parse the connect_config.json file
    let mut file = File::open(file_path)
        .map_err(|e| format!("Failed to open connect_config.json: {:?}", e))?;
    let mut content = String::new();
    file.read_to_string(&mut content)
        .map_err(|e| format!("Failed to read connect_config.json: {:?}", e))?;

    let config: ConnectConfig = serde_json::from_str(&content)
        .map_err(|e| format!("Failed to parse connect_config.json: {:?}", e))?;

    // Collect providers where "configured" is true
    let configured_providers: Vec<String> = config
        .providers
        .into_iter()
        .filter(|(_, status)| status.configured)
        .map(|(provider, _)| provider)
        .collect();

    Ok(configured_providers)
}
//
/* ---------------------------------- < End--Code >---------------------------------- */
