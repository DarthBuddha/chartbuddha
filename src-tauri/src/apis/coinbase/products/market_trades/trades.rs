/* ------------------------------------------------------------------------------------------------------------------ */
//! apis/coinbase/products/trades.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Structs
//! - Trades
/* ------------------------------------------------------------------------------------------------------------------ */

// Dependencies
use serde::{ Deserialize, Serialize };

/* ------------------------------------------------------------------------------------------------------------------ */

/// Struct to represent the response from the list products endpoint
#[derive(Debug, Deserialize, Serialize)]
pub struct Trades {
  pub trade_id: String,
  pub product_id: String,
  pub price: String,
  pub size: String,
  pub time: Option<String>,
  pub side: String,
  pub exchange: String,
}

/* ------------------------------------------------------------------------------------------------------------------ */
