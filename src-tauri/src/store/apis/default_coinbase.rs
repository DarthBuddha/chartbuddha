/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Store Broker - default_coinbase
/* ---------------------------------------------------------------------------------------------- */
//! #### Default:
//! * default_coinbase
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: store/apis/default_coinbase.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

pub fn default_coinbase() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  // Coinbase
  defaults.insert(
    "Coinbase".to_string(),
    json!({
      "api_configured": false,
      "api_key": null,
      "api_key_secret": null,
      "api_permissions": {
        "perm_can_trade": false,
        "perm_can_transfer": false,
        "perm_can_view": false,
        "perm_portfolio_type": "",
        "perm_portfolio_uuid": ""
      }
    })
  );

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
