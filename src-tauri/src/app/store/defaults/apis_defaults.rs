/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Store Defaults - apis_defaults
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * apis_defaults
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/store/defaults/apis_defaults.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

pub fn apis_defaults() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  // Binance
  // defaults.insert(
  //   "binance".to_string(),
  //   json!({
  //     "api_configured": false,
  //     "api_key": null,
  //     "api_secret": null
  //   })
  // );

  // Coinbase
  defaults.insert(
    "coinbase".to_string(),
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
    }),
  );

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
