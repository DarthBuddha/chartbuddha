/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/products/product_book/price_book.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - PriceBook
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{Deserialize, Serialize};
// Crates
use crate::apis::coinbase::products::product_book::asks::Asks;
use crate::apis::coinbase::products::product_book::bids::Bids;

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent maintenance details
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct PriceBook {
    pub product_id: Option<String>,
    pub asks: Vec<Asks>,
    pub bids: Vec<Bids>,
    pub time: Option<String>,
}

/* ---------------------------------------------------------------------------------------------- */
