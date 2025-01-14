/* ------------------------------------------------------------------------------------------------------------------ */
//! stores/defaults/app_settings_defaults.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! ### Functions
//! - app_settings_defaults
/* ------------------------------------------------------------------------------------------------------------------ */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ------------------------------------------------------------------------------------------------------------------ */

pub fn app_settings_defaults() -> HashMap<String, Value> {
    let mut defaults = HashMap::new();

    // App settings
    // defaults.insert("appInitRun".to_string(), Null.into());
    // defaults.insert("appVersion".to_string(), Null.into());

    // Binance
    defaults.insert(
        "app".to_string(),
        json!({
          "app_init_run": false,
          "app_version": null,
          "app_update": null
        }),
    );

    // Profile settings
    // defaults.insert("userName".to_string(), Null.into());
    // defaults.insert("userPassword".to_string(), Null.into());

    defaults
}

/* ------------------------------------------------------------------------------------------------------------------ */
