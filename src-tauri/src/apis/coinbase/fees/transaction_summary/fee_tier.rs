/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/fees/transaction_summary/fee_tier.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - FeeTier
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{ Deserialize, Serialize };

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent the response from the list products endpoint
#[derive(Debug, Deserialize, Serialize)]
pub struct FeeTier {
  pub pricing_tier: String,
  pub usd_from: String,
  pub usd_to: String,
  pub taker_fee_rate: String,
  pub maker_fee_rate: Option<String>,
  pub aop_from: String,
  pub aop_to: String,
}

/* ---------------------------------------------------------------------------------------------- */
