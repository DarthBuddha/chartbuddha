/* ---------------------------------------------------------------------------------------------- */
//! # app_settings_defaults.rs
//!
//! Defaults for app_settings store.
/* ---------------------------------------------------------------------------------------------- */
//! ### Functions
//! - app_settings_defaults
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

pub fn app_settings_defaults() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  // App settings
  // defaults.insert("appInitRun".to_string(), Null.into());
  // defaults.insert("appVersion".to_string(), Null.into());

  // Binance
  defaults.insert(
    "binance".to_string(),
    json!({
        "ApiConfigured": false,
        "ApiKey": null,
        "ApiSecrets": null
      })
  );

  // Profile settings
  // defaults.insert("userName".to_string(), Null.into());
  // defaults.insert("userPassword".to_string(), Null.into());

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
