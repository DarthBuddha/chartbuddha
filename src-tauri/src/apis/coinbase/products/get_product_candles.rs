/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/products/get_product_candles.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - GetProductCandles
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{ Deserialize, Serialize };
// Crates
use crate::apis::coinbase::products::candles::candles::Candles;

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent maintenance details
#[derive(Debug, Deserialize, Serialize)]
pub struct GetProductCandles {
  pub candles: Vec<Candles>,
}

/* ---------------------------------------------------------------------------------------------- */
