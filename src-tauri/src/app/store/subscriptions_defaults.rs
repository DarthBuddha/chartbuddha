/* ---------------------------------------------------------------------------------------------- */
//! stores/defaults/app_subscriptions_defaults.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - app_settings_defaults
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
      "binance": [],
      "coinbase": []
    })
  );

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
