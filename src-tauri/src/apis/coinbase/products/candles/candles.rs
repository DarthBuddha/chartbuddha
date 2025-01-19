/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/products/candles/candles.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - Candles
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{ Deserialize, Serialize };

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent the response from the list products endpoint
#[derive(Debug, Deserialize, Serialize)]
pub struct Candles {
  pub start: String,
  pub low: String,
  pub high: String,
  pub open: String,
  pub close: String,
  pub volume: String,
}

/* ---------------------------------------------------------------------------------------------- */
