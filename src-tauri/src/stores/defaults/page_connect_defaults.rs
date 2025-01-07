/* ---------------------------------------------------------------------------------------------- */
//! # page_connect_defaults.rs
//!
//! Defaults for page_connect store.
/* ---------------------------------------------------------------------------------------------- */
//! ### Functions
//! - page_connect_defaults
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

pub fn page_connect_defaults() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  defaults.insert("page_connect".to_string(), json!({
    "data_api": null,
  }));

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
