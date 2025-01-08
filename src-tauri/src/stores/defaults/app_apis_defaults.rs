/* ---------------------------------------------------------------------------------------------- */
//! # app_apis_defaults.rs
//!
//! Defaults for app_apis store.
/* ---------------------------------------------------------------------------------------------- */
//! ### Functions
//! - app_apis_defaults
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

pub fn app_apis_defaults() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  // Binance
  defaults.insert(
    "binance".to_string(),
    json!({
      "api_configured": false,
      "api_key": null,
      "api_secret": null
    })
  );

  // Coinbase
  defaults.insert(
    "coinbase".to_string(),
    json!({
      "api_configured": false,
      "api_key": null,
      "api_secret": null,
      "perm_can_view": false,
      "perm_can_trade": false,
      "perm_can_transfer": false,
      "perm_portfolio_uuid": null,
      "perm_portfolio_type": null
    })
  );

  defaults
}

/* ---------------------------------------------------------------------------------------------- */