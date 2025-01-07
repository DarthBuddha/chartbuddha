/* ---------------------------------------------------------------------------------------------- */
//! # page_dashboard_defaults.rs
//!
//! Defaults for page_dashboard store.
/* ---------------------------------------------------------------------------------------------- */
//! ### Functions
//! - page_dashboard_defaults
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::Value;
use serde_json::Value::Null;

/* ---------------------------------------------------------------------------------------------- */

pub fn page_dashboard_defaults() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  defaults.insert("selectedApi".to_string(), Null.into());
  defaults.insert("selectedProductName".to_string(), Null.into());
  defaults.insert("selectedProductType".to_string(), Null.into());
  defaults.insert("selectedContractType".to_string(), Null.into());

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
