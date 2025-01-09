/* ---------------------------------------------------------------------------------------------- */
//! # nav_connect_defaults.rs
//!
//! Defaults for nav_connect store.
/* ---------------------------------------------------------------------------------------------- */
//! ### Functions
//! - nav_connect_defaults
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

pub fn nav_connect_defaults() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  defaults.insert("nav_connect".to_string(), json!({
    "api_data": null,
  }));

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
