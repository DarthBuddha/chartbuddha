/* ---------------------------------------------------------------------------------------------- */
//! # page_subscribe_defaults.rs
//!
//! Defaults for page_subscribe store.
/* ---------------------------------------------------------------------------------------------- */
//! ### Functions
//! - page_subscribe_defaults
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

pub fn page_subscribe_defaults() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  defaults.insert("page_subscribe".to_string(), json!({
    "data_api": null,
  }));

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
