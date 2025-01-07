/* ---------------------------------------------------------------------------------------------- */
//! # page_interface_defaults.rs
//!
//! Defaults for page_interface store.
/* ---------------------------------------------------------------------------------------------- */
//! ### Functions
//! - page_interface_defaults
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

pub fn page_interface_defaults() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  defaults.insert("page_interface".to_string(), json!({
    "selected_page": "home",
  }));

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
