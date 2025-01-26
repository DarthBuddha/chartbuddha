/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Module: Store App - default_app_config
/* ---------------------------------------------------------------------------------------------- */
//! Default:
//! * default_app_config
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: store/app/default_app_config.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

/// Default App Config
pub fn default_app_config() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  // app
  defaults.insert(
    "App".to_string(),
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
