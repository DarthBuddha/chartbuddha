//! # ChartBuddha library
//! - Module: load_interface_config
//! - Description: Interface configuration handler.
//! ### Structs
//! - `InterfaceConfig`
//! ### Impl
//! - `InterfaceConfig`
//! - - `new`
//! ### Functions
//! - `load_interface_config`
//! - `save_interface_config`
//! ##### config/load_interface_config.rs
//
// Rust
use std::collections::HashMap;
use std::fs::File;
use std::io::{Read, Write};
use std::path::Path;
// use std::sync::{Arc, Mutex};
// Library Dependencies
use serde::{Deserialize, Serialize};
// Local Dependencies
//
/* --------------------------------- < Start-Code > --------------------------------- */
/// Default runtime path for connect_config.json
const INTERFACE_CONFIG_PATH: &str = "runtime/config/interface.json";
//
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct representing the interface configuration
#[derive(Debug, Serialize, Deserialize)]
pub struct InterfaceConfig {
    pub init_startup: bool,
}
//
/* ----------------------------------- < Struct > ----------------------------------- */
/// Represents a provider's configuration state
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ConnectPage {
    pub providers: String,
    pub configured: bool,
    // pub providers: Arc<Mutex<HashMap<String, ConnectPage>>>,
}
//
/* ------------------------------------ < Impl > ------------------------------------ */
/// Interface Config implementation
impl InterfaceConfig {
    /// Create a new Interface Config with default values
    pub fn new() -> Self {
        Self { init_startup: true }
    }
}
//
/* ---------------------------------- < Function > ---------------------------------- */
/// Load app configuration file
pub fn load_interface_config() -> Result<InterfaceConfig, Box<dyn std::error::Error>> {
    // Check if the config file exists
    if !Path::new(INTERFACE_CONFIG_PATH).exists() {
        println!("Config file not found. Creating a new one...");
        let default_config = InterfaceConfig::new();
        save_interface_config(&default_config)?;
        return Ok(default_config);
    }

    // Load the existing config file
    let mut file = File::open(INTERFACE_CONFIG_PATH)?;
    let mut content = String::new();
    file.read_to_string(&mut content)?;

    // Parse the config
    let config: InterfaceConfig = serde_json::from_str(&content)?;
    Ok(config)
}

/// Save App Configurations to the app_config.json
pub fn save_interface_config(
    config: &InterfaceConfig,
) -> Result<(), Box<dyn std::error::Error>> {
    let serialized = serde_json::to_string_pretty(config)?;
    let mut file = File::create(INTERFACE_CONFIG_PATH)?;
    file.write_all(serialized.as_bytes())?;
    println!("Config file saved.");
    Ok(())
}
//
/* ---------------------------------- < Function > ---------------------------------- */
/// Returns a list of all available providers
pub fn get_all_providers() -> HashMap<String, ConnectPage> {
    let mut providers = HashMap::new();
    // providers.insert(
    //     "binance".to_string(),
    //     ProviderInfo { name: "Binance".to_string(), configured: false },
    // );
    providers.insert(
        "coinbase".to_string(),
        ConnectPage { providers: "Coinbase".to_string(), configured: false },
    );
    // Add more providers here
    providers
}
//
/* ---------------------------------- < End--Code >---------------------------------- */
