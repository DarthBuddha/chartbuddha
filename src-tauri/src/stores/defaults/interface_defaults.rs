/* ---------------------------------------------------------------------------------------------- */
//! # interface_defaults.rs
//!
//! Defaults for interface store.
/* ---------------------------------------------------------------------------------------------- */
//! ### Functions
//! - interface_defaults
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

pub fn interface_defaults() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  defaults.insert("interface".to_string(), json!({
    "selected_page": "home",
  }));

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
