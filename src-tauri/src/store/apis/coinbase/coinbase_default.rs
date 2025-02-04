/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library - Backend
/* ---------------------------------------------------------------------------------------------- */
//! # Module: Store Apis -> coinbase_default
/* ---------------------------------------------------------------------------------------------- */
//! #### Default:
//! * coinbase_default
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * store/apis/coinbase/coinbase_default.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
// Dependencies
use serde_json::json;
use serde_json::Value;

/* ---------------------------------------------------------------------------------------------- */

pub fn coinbase_default() -> HashMap<String, Value> {
  let mut defaults = HashMap::new();

  // Coinbase
  defaults.insert(
    "Coinbase".to_string(),
    json!({
      "broker_data_api": {
        "api_key": null,
        "api_key_secret": null,
        "api_permissions": {
          "perm_can_trade": false,
          "perm_can_transfer": false,
          "perm_can_view": false,
          "perm_portfolio_type": "",
          "perm_portfolio_uuid": ""
        }
      }
    })
  );

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
