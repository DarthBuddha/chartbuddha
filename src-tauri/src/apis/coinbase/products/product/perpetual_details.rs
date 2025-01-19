/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/products/product/perpetual_details.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - PerpetualDetails
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{ Deserialize, Serialize };

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent perpetual details
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct PerpetualDetails {
  pub open_interest: Option<String>,
  pub funding_rate: Option<String>,
  pub funding_time: Option<String>,
  pub max_leverage: Option<String>,
  pub base_asset_uuid: Option<String>,
  pub underlying_type: Option<String>,
  pub contract_display_name: Option<String>,
  pub time_to_expiry_ms: Option<i64>,
  pub non_crypto: Option<bool>,
  pub contract_expiry_name: Option<String>,
  pub twenty_four_by_seven: Option<bool>,
}

/* ---------------------------------------------------------------------------------------------- */
