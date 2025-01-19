/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/products/get_best_bid_ask.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - GetBestBidAsk
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{ Deserialize, Serialize };
// Crates
use crate::apis::coinbase::products::product_book::price_book::PriceBook;

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent maintenance details
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct GetBestBidAsk {
  pub price_book: Vec<PriceBook>,
}

/* ---------------------------------------------------------------------------------------------- */
