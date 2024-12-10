//! # ChartBuddha library
//! - Module: load_providers
//! - Description: Providers configuration handler.
//! ### Structs
//! - `ProvidersConfig`
//! ### Impl
//! - `ProvidersConfig`
//! - - `new`
//! ### Functions
//! - `load_providers_config`
//! - `save_providers_config`
//! ##### config/load_providers.rs
//
// Rust
use std::collections::HashMap;
use std::fs::File;
use std::io::{Read, Write};
use std::path::Path;
// Library Dependencies
use serde::{Deserialize, Serialize};
// Local Dependencies
//
/* --------------------------------- < Start-Code > --------------------------------- */
/// Default runtime path for coinbase_config.json
const PROVIDERS_CONFIG_PATH: &str = "runtime/config/providers.json";
//
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct representing the configuration for a specific provider
#[derive(Debug, Serialize, Deserialize)]
pub struct ProviderDetails {
    pub configured: bool,
    pub api_key: String,
    pub api_secret: String,
}
//
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct representing the providers configuration
#[derive(Debug, Serialize, Deserialize)]
pub struct ProvidersConfig {
    pub providers: HashMap<String, ProviderDetails>,
}
//
/* ------------------------------------ < Impl > ------------------------------------ */
/// Providers Config implementation
impl ProvidersConfig {
    /// Create a new Provider Config with default values
    pub fn new() -> Self {
        let mut default_providers = HashMap::new();
        default_providers.insert(
            "coinbase".to_string(),
            ProviderDetails {
                configured: false,
                api_key: "none".to_string(),
                api_secret: "none".to_string(),
            },
        );

        Self { providers: default_providers }
    }
}
//
/* ---------------------------------- < Function > ---------------------------------- */
/// Load the providers configuration file
pub fn load_providers_config() -> Result<ProvidersConfig, Box<dyn std::error::Error>> {
    // Check if the config file exists
    if !Path::new(PROVIDERS_CONFIG_PATH).exists() {
        println!("Providers config file not found. Creating a new one...");
        let default_config = ProvidersConfig::new();
        save_providers_config(&default_config)?;
        return Ok(default_config);
    }

    // Load the existing config file
    let mut file = File::open(PROVIDERS_CONFIG_PATH)?;
    let mut content = String::new();
    file.read_to_string(&mut content)?;

    // Parse the config
    let config: ProvidersConfig = serde_json::from_str(&content)?;
    Ok(config)
}
//
/* ---------------------------------- < Function > ---------------------------------- */
/// Save the providers configuration to the providers.json
pub fn save_providers_config(
    config: &ProvidersConfig,
) -> Result<(), Box<dyn std::error::Error>> {
    let serialized = serde_json::to_string_pretty(config)?;
    let mut file = File::create(PROVIDERS_CONFIG_PATH)?;
    file.write_all(serialized.as_bytes())?;
    println!("Providers config file saved.");
    Ok(())
}
//
/* ---------------------------------- < End--Code >---------------------------------- */
