//! # Get Public Market Trades
//! Get snapshot information by product ID about the last trades (ticks) and best bid/ask.
//!
//! ### Structs
//! - `Trade`
//! - `MarketTradesResponse`
//! - `ErrorResponse`
//! - `Detail`
//!
//! ### Functions
//! - `get_public_market_trades`
//!
/* ---------------------------------------------------------------------------------- */
//
// Rust
use std::error::Error;
// Library Dependencies
use reqwest::Client;
use serde::{Deserialize, Serialize};
//
/* ---------------------------------------------------------------------------------- */
/// Struct to represent a single trade entry in the market trades response
#[derive(Debug, Serialize, Deserialize)]
pub struct Trade {
    pub trade_id: String,   // The ID of the trade that was placed
    pub product_id: String, // The trading pair (e.g., 'BTC-USD')
    pub price: String,      // The price of the trade, in quote currency
    pub size: String,       // The size of the trade, in base currency
    pub time: String,       // RFC3339 Timestamp of the trade
    pub side: String,       // Possible values: BUY, SELL
    pub exchange: String,   // The exchange where the trade was placed
}
/* ---------------------------------------------------------------------------------- */
/// Struct to represent the full response of the market trades API
#[derive(Debug, Serialize, Deserialize)]
pub struct MarketTradesResponse {
    pub trades: Vec<Trade>, // List of trades
    pub best_bid: String,   // Best bid for the product_id, in quote currency
    pub best_ask: String,   // Best ask for the product_id, in quote currency
}
/* ---------------------------------------------------------------------------------- */
/// Error response structure for unexpected errors
#[derive(Debug, Serialize, Deserialize)]
pub struct ErrorResponse {
    pub error: String,
    pub code: i32,
    pub message: String,
    pub details: Vec<Detail>,
}
/* ---------------------------------------------------------------------------------- */
/// Detail structure for the error response
#[derive(Debug, Serialize, Deserialize)]
pub struct Detail {
    pub type_url: String,
    pub value: Vec<u8>,
}
//
/* ---------------------------------------------------------------------------------- */
/// Get snapshot information by product ID about the last trades (ticks) and best bid/ask.
pub async fn get_public_market_trades(
    product_id: &str,
    limit: u32,
) -> Result<MarketTradesResponse, Box<dyn Error>> {
    let url = format!(
        "https://api.coinbase.com/api/v3/brokerage/market/products/{}/ticker?limit={}",
        product_id, limit
    );
    let client = Client::new();

    let response =
        client.get(&url).header("Content-Type", "application/json").send().await?;

    if response.status().is_success() {
        let market_trades: MarketTradesResponse = response.json().await?;
        Ok(market_trades)
    } else {
        let err_body = response.text().await?;
        Err(format!("Failed to get market trades: {}", err_body).into())
    }
}
//
/* ---------------------------------------------------------------------------------- */
