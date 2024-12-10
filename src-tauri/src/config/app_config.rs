//! # ChartBuddha library
//! - Module: load_app_config
//! - Description: App configuration handler.
//! ### Structs
//! - `AppConfig`
//! ### Impl
//! - `AppConfig`
//! - - `new`
//! ### Functions
//! - `load_app_config`
//! - `save_app_config`
//! ##### config/load_app_config.rs
//
// Rust
use std::fs::File;
use std::io::{Read, Write};
use std::path::Path;
// Library Dependencies
use serde::{Deserialize, Serialize};
// use serde_json::json;
// Local Dependencies
//
/* --------------------------------- < Start-Code > --------------------------------- */
/// Default runtime path for app_config.json
const APP_CONFIG_PATH: &str = "runtime/config/app_config.json";
//
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct representing the app configurations
#[derive(Debug, Serialize, Deserialize)]
pub struct AppConfig {
    pub init_startup: bool,
}
//
/* ------------------------------------ < Impl > ------------------------------------ */
/// AppConfig implementation
impl AppConfig {
    /// Create a new GlobalConfig with default values
    pub fn new() -> Self {
        Self { init_startup: true }
    }
}
//
/* ---------------------------------- < Function > ---------------------------------- */
/// Load app configuration file
pub fn load_app_config() -> Result<AppConfig, Box<dyn std::error::Error>> {
    // Check if the config file exists
    if !Path::new(APP_CONFIG_PATH).exists() {
        println!("Config file not found. Creating a new one...");
        let default_config = AppConfig::new();
        save_app_config(&default_config)?;
        return Ok(default_config);
    }

    // Load the existing config file
    let mut file = File::open(APP_CONFIG_PATH)?;
    let mut content = String::new();
    file.read_to_string(&mut content)?;

    // Parse the config
    let config: AppConfig = serde_json::from_str(&content)?;
    Ok(config)
}

/// Save App Configurations to the app_config.json
pub fn save_app_config(config: &AppConfig) -> Result<(), Box<dyn std::error::Error>> {
    let serialized = serde_json::to_string_pretty(config)?;
    let mut file = File::create(APP_CONFIG_PATH)?;
    file.write_all(serialized.as_bytes())?;
    println!("Config file saved.");
    Ok(())
}
//
/* ---------------------------------- < End--Code >---------------------------------- */
