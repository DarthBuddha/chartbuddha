/* ---------------------------------------------------------------------------------------------- */
//! stores/defaults/app_settings_defaults.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
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

  // app
  defaults.insert(
    "app".to_string(),
    json!({
          "app_init_run": false,
          "app_version": null,
          "app_update": null
        })
  );

  // database
  defaults.insert(
    "database".to_string(),
    json!({
        "database_name": null,
        "database_pass": null,
        "database_url": null
      })
  );

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
