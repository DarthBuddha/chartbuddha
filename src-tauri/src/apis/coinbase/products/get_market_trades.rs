/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/products/get_market_trades.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - GetMarketTrades
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{Deserialize, Serialize};
// Crate
use crate::apis::coinbase::products::market_trades::trades::Trades;

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent the response from the list products endpoint
#[derive(Debug, Deserialize, Serialize)]
pub struct GetMarketTrades {
    pub trades: Vec<Trades>,
    pub best_bid: String,
    pub best_ask: String,
}

/* ---------------------------------------------------------------------------------------------- */
