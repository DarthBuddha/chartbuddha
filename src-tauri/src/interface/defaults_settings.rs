/* ---------------------------------------------------------------------------------------------- */
//! # Module: defaults_settings.rs
//!
//! Tauri Store Defaults for the Settings.
/* ---------------------------------------------------------------------------------------------- */
//! ### Functions
//! - defaults_settings
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde_json::json;

/* ---------------------------------------------------------------------------------------------- */

pub fn defaults_settings() -> std::collections::HashMap<String, serde_json::Value> {
  let mut defaults = std::collections::HashMap::new();

  defaults.insert("app".to_string(), json!({
      "initRun": false,
      "version": null
    }));

  defaults.insert(
    "configuredApi".to_string(),
    json!({
      "binance": null,
      "coinbase": null
    })
  );

  defaults.insert(
    "profile".to_string(),
    json!({
      "userName": null,
      "userPassword": null
    })
  );

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
