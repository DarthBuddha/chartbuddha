/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Module: Store App Config -> config
/* ---------------------------------------------------------------------------------------------- */
//! Default:
//! * config_default
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: store/app/config/config.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

/// Default App Config
pub fn config_default() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  // app
  defaults.insert(
    "Config".to_string(),
    json!({
      "app_init_run": false,
      "app_version": null,
      "app_update": null,
      "database_type": null,
      "database_name": null,
      "database_url": null
    })
  );

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
