/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Store Defaults - app_defaults
/* ---------------------------------------------------------------------------------------------- */
//! Functions:
//! * app_defaults
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/store/defaults/app_defaults.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

pub fn app_state_defaults() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  // app
  defaults.insert(
    "app_state".to_string(),
    json!({
          "tauri_ready": false,
          "react_ready": false
        })
  );

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
