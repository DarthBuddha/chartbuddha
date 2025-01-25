/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Store - default_app_config
/* ---------------------------------------------------------------------------------------------- */
//! Function:
//! * default_app_config
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/store/default_app_config.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

pub fn default_app_config() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  // app
  defaults.insert(
    "App".to_string(),
    json!({
      "app_init_run": false,
      "app_version": null,
      "app_update": null
    })
  );

  // database
  defaults.insert(
    "Database".to_string(),
    json!({
      "database_name": null,
      "database_url": null
    })
  );

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
