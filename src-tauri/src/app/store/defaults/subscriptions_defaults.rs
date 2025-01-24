/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Store Defaults - subscriptions_defaults
/* ---------------------------------------------------------------------------------------------- */
//! Functions:
//! * settings_defaults
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/store/defaults/subscriptions_defaults.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

pub fn subscriptions_defaults() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  // App Subscriptions
  defaults.insert(
    "subscriptions".to_string(),
    json!({
      "Binance": [],
      "Coinbase": []
    })
  );

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
