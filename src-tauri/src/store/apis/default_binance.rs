/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Store - default_binance
/* ---------------------------------------------------------------------------------------------- */
//! #### Default:
//! * default_binance
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: store/apis/default_binance.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

pub fn default_binance() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  // Binance
  defaults.insert(
    "Binance".to_string(),
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
