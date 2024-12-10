//! # ChartBuddha library
//! - Module: Config Manager
//! - Description: Configuration manager for ChartBuddha.
//! ### Structs
//! - `ConfigManager`
//! ### Functions
//! - `initialize_app`
//! ##### config/config_manager.rs
//
// Rust
// use std::collections::HashMap;
// use std::fs::File;
// use std::io::Read;
// Library Dependencies
// Local Dependencies
use crate::config::app_config::load_app_config;
use crate::config::app_config::AppConfig;
use crate::config::interface::load_interface_config;
use crate::config::interface::InterfaceConfig;
use crate::config::providers::load_providers_config;
use crate::config::providers::ProvidersConfig;
//
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct to encapsulate the configuration process
pub struct ConfigManager {
    pub app_config: Option<AppConfig>,
    pub providers_config: Option<ProvidersConfig>,
    pub interface_config: Option<InterfaceConfig>,
}
/* ------------------------------------ < Impl > ------------------------------------ */
/// Initializes the application
pub fn config_manager() -> Result<(), Box<dyn std::error::Error>> {
    println!("Starting application...");

    // Step 1: Load App Config
    let app_config = load_app_config()?;
    println!("Loaded App Config: {:?}", app_config);

    // Step 2: Load Providers Config
    let providers_config = load_providers_config()?;
    println!("Loaded Providers Config: {:?}", providers_config);

    // Step 3: Load Interface Config
    let interface_config = load_interface_config()?;
    println!("Loaded Interface Config: {:?}", interface_config);

    // Proceed with further initialization steps if needed
    println!("Application initialization complete.");
    Ok(())
}
//
/* ---------------------------------- < End--Code >---------------------------------- */
