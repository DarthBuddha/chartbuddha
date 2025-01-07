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
      "ApiConfigured": false,
      "ApiKey": null,
      "ApiSecrets": null
    })
  );

  // Coinbase
  defaults.insert(
    "coinbase".to_string(),
    json!({
      "ApiConfigured": false,
      "ApiKey": null,
      "ApiSecrets": null,
      "PermCanView": null,
      "PermCanTrade": null,
      "PermCanTransfer": null,
      "PermPortfolioUuid": null,
      "PermPortfolioTyp": null
    })
  );

  defaults
}

/* ---------------------------------------------------------------------------------------------- */
