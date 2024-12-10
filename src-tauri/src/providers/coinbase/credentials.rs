//! # ChartBuddha library
//! - Module: `credentials`
//! - Description: Handles the saving, loading, and deleting of API credentials for the Coinbase provider.
//! ### Functions
//! - `credentials.save`
//! - `credentials.load`
//! - `credentials.delete`
//! - `credentials.is_configured`
//! ##### provider/coinbase/credentials.rs
//
// Rust
use std::fs::{File, OpenOptions};
use std::io::{Read, Write};
use std::path::Path;
// Library Dependencies
use serde::{Deserialize, Serialize};
use serde_json::{self, Map, Value};
// Local Dependencies
//
/* --------------------------------- < Start-Code > --------------------------------- */
//
// const PROVIDER: &str = "coinbase";
const PROVIDERS_CONFIG_PATH: &str = "runtime/config/providers.json";
// const INTERFACE_CONFIG_PATH: &str = "runtime/config/interface.json";
//
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct to represent the API key and secret
#[derive(Debug, Serialize, Deserialize)]
pub struct CoinbaseCredentials {
    pub provider: String,
    pub api_key: String,
    pub api_secret: String,
}
//
/* ------------------------------------ < Impl > ------------------------------------ */
impl CoinbaseCredentials {
    /// Save the API key and secret for Coinbase into `providers.json`.
    /// If no Coinbase entry exists, it creates one.
    pub fn save(&self) -> Result<(), String> {
        // Load the existing providers configuration
        let mut providers_config = Self::load_providers_config()?;

        // Update or insert the Coinbase entry
        let coinbase_entry = providers_config
            .entry("coinbase".to_string())
            .or_insert_with(|| Value::Object(Map::new()));

        // Ensure the entry is an Object and update the API credentials
        if let Value::Object(coinbase_object) = coinbase_entry {
            coinbase_object
                .insert("api_key".to_string(), Value::String(self.api_key.clone()));
            coinbase_object.insert(
                "api_secret".to_string(),
                Value::String(self.api_secret.clone()),
            );
        } else {
            return Err(
                "Invalid format for Coinbase entry in providers.json.".to_string()
            );
        }

        // Save the updated configuration back to the file
        Self::save_providers_config(&providers_config)?;

        println!("Coinbase credentials saved successfully.");
        Ok(())
    }

    /// Load the Coinbase credentials from `providers.json`.
    pub fn load() -> Result<Self, String> {
        // Load the existing providers configuration
        let providers_config = Self::load_providers_config()?;

        // Check for the Coinbase entry
        if let Some(Value::Object(coinbase_entry)) = providers_config.get("coinbase") {
            // Retrieve the `api_key` and `api_secret`
            let api_key = coinbase_entry
                .get("api_key")
                .and_then(|v| v.as_str())
                .ok_or_else(|| "API key not found for Coinbase".to_string())?
                .to_string();

            let api_secret = coinbase_entry
                .get("api_secret")
                .and_then(|v| v.as_str())
                .ok_or_else(|| "API secret not found for Coinbase".to_string())?
                .to_string();

            Ok(Self { provider: "coinbase".to_string(), api_key, api_secret })
        } else {
            Err("Coinbase entry not found in providers.json.".to_string())
        }
    }

    /// Delete the Coinbase credentials by removing `api_key` and `api_secret` from `providers.json`.
    pub fn delete() -> Result<(), String> {
        // Load the existing providers configuration
        let mut providers_config = Self::load_providers_config()?;

        // Check for the Coinbase entry
        if let Some(Value::Object(coinbase_entry)) =
            providers_config.get_mut("coinbase")
        {
            // Remove the API credentials
            coinbase_entry.remove("api_key");
            coinbase_entry.remove("api_secret");

            // Save the updated configuration back to the file
            Self::save_providers_config(&providers_config)?;

            println!("Coinbase credentials deleted successfully.");
            Ok(())
        } else {
            Err("Coinbase entry not found in providers.json.".to_string())
        }
    }

    /// Helper function to load the providers configuration
    fn load_providers_config() -> Result<Map<String, Value>, String> {
        if Path::new(PROVIDERS_CONFIG_PATH).exists() {
            let mut file = File::open(PROVIDERS_CONFIG_PATH)
                .map_err(|e| format!("Failed to open providers.json: {:?}", e))?;
            let mut content = String::new();
            file.read_to_string(&mut content)
                .map_err(|e| format!("Failed to read providers.json: {:?}", e))?;
            serde_json::from_str(&content)
                .map_err(|e| format!("Failed to parse providers.json: {:?}", e))
        } else {
            Ok(Map::new()) // Return an empty configuration if the file doesn't exist
        }
    }

    /// Helper function to save the providers configuration
    fn save_providers_config(config: &Map<String, Value>) -> Result<(), String> {
        let serialized = serde_json::to_string_pretty(config)
            .map_err(|e| format!("Failed to serialize providers.json: {:?}", e))?;
        let mut file = OpenOptions::new()
            .write(true)
            .create(true)
            .truncate(true)
            .open(PROVIDERS_CONFIG_PATH)
            .map_err(|e| {
                format!("Failed to open providers.json for writing: {:?}", e)
            })?;
        file.write_all(serialized.as_bytes())
            .map_err(|e| format!("Failed to write to providers.json: {:?}", e))
    }
}
/* ---------------------------------- < End--Code >---------------------------------- */
