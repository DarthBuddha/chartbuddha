/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/products/get_product_book.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - GetProductBook
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{ Deserialize, Serialize };
// Crates
use crate::apis::coinbase::products::product_book::price_book::PriceBook;

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent maintenance details
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct GetProductBook {
  pub price_book: Vec<PriceBook>,
  pub last: String,
  pub mid_market: String,
  pub spread_bps: String,
  pub spread_absolute: String,
}

/* ---------------------------------------------------------------------------------------------- */
