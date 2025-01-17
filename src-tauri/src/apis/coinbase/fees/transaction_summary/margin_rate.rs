/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/fees/transaction_summary/margin_rate.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - MarginRate
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{ Deserialize, Serialize };

/* ---------------------------------------------------------------------------------------------- */

/// Margin rate, only applicable to product_type `FUTURE`.
#[derive(Debug, Deserialize, Serialize)]
pub struct MarginRate {
  pub value: String,
}

/* ---------------------------------------------------------------------------------------------- */
