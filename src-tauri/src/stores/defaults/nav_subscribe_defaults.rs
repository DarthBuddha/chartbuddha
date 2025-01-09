/* ---------------------------------------------------------------------------------------------- */
//! # nav_subscribe_defaults.rs
//!
//! Defaults for nav_subscribe store.
/* ---------------------------------------------------------------------------------------------- */
//! ### Functions
//! - nav_subscribe_defaults
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

pub fn nav_subscribe_defaults() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  defaults.insert(
    "nav_subscribe".to_string(),
    json!({
    "api_data": null,
    "product_type": "SPOT",
    "contract_type": null,

  })
  );

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
