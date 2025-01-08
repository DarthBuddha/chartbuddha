/* ---------------------------------------------------------------------------------------------- */
//! # nav_dashboard_defaults.rs
//!
//! Defaults for nav_dashboard store.
/* ---------------------------------------------------------------------------------------------- */
//! ### Functions
//! - nav_dashboard_defaults
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

pub fn nav_dashboard_defaults() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  defaults.insert("nav_dashboard".to_string(), json!({
    "selected_subscription": null,
  }));

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
