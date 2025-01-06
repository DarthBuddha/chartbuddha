/* ---------------------------------------------------------------------------------------------- */
//! # defaults_interface.rs
//!
//! Tauri Store Defaults for the Interface.
/* ---------------------------------------------------------------------------------------------- */
//! ### Functions
//! - defaults_interface
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde_json::json;

/* ---------------------------------------------------------------------------------------------- */

pub fn defaults_interface() -> std::collections::HashMap<String, serde_json::Value> {
  let mut defaults = std::collections::HashMap::new();

  defaults.insert("interface".to_string(), json!({
      "selectedPage": "home"
    }));

  defaults.insert("pageConnect".to_string(), json!({
      "selectedApi": null
    }));

  defaults.insert(
    "pageSubscribe".to_string(),
    json!({
      "selectedApi": null,
      "selectedProductName": null,
      "selectedProductType": null,
      "selectedContractType": null
    })
  );

  defaults
}

/* ---------------------------------------------------------------------------------------------- */