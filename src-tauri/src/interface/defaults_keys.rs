/* ------------------------------------------------------------------------------------------------------------------ */
//! # defaults_keys.rs
//!
//! ### Functions
//! - defaults_keys
/* ------------------------------------------------------------------------------------------------------------------ */

// Dependencies
use serde_json::json;

/* ------------------------------------------------------------------------------------------------------------------ */

pub fn defaults_keys() -> std::collections::HashMap<String, serde_json::Value> {
  let mut defaults = std::collections::HashMap::new();

  defaults.insert(
    "binance".to_string(),
    json!({
      "apiConfigured": false,
      "apiKey": null,
      "apiSecret": null
    })
  );

  defaults.insert(
    "coinbase".to_string(),
    json!({
      "apiConfigured": false,
      "apiKey": null,
      "apiSecret": null,
      "permCanTrade": null,
      "permCanTransfer": null,
      "permCanView": null,
      "permPortfolioUuid": null,
      "permPortfolioType": null
    })
  );

  defaults
}

/* ------------------------------------------------------------------------------------------------------------------ */
