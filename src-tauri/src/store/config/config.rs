/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library - Backend
/* ---------------------------------------------------------------------------------------------- */
//! # Module: Store Config -> config
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Config default for our tauri store.
/* ---------------------------------------------------------------------------------------------- */
//! Default:
//! * config_default
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src-tauri/src/store/config/config.rs
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

  // Section: App
  defaults.insert(
    "App".to_string(),
    json!({
      "init_run": false,
      "version": null,
      "update": null
    })
  );

  // Section: Database
  defaults.insert(
    "Database".to_string(),
    json!({
        "database_type": null,
        "database_name": null,
        "database_url": null
      })
  );

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
