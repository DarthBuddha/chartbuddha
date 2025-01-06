/* ------------------------------------------------------------------------------------------------------------------ */
//! # Get Market Trades
//!
//! Get snapshot information by product ID about the last trades (ticks) and best bid/ask.
/* ------------------------------------------------------------------------------------------------------------------ */
//! ### Structs
//! - Trade
//! - MarketTradeResponse
//!
//! ### Functions
//! - get_market_trades
/* ------------------------------------------------------------------------------------------------------------------ */

// Dependencies
use reqwest::Client;
use serde::Deserialize;
use serde_json::Value;

/* ------------------------------------------------------------------------------------------------------------------ */

/// Struct to represent a single trade entry in the market trades response
#[derive(Debug, Deserialize)]
pub struct MarketTradeResponse {
  pub trades: Vec<Trade>,
  pub best_bid: String,
  pub best_ask: String,
}

/* ------------------------------------------------------------------------------------------------------------------ */

/// Struct to represent a single trade entry in the market trades response
#[derive(Debug, Deserialize)]
pub struct Trade {
  pub trade_id: String,
  pub product_id: String,
  pub price: String,
  pub size: String,
  pub time: String, // You can use `chrono` to deserialize this into a DateTime if needed
  pub side: String,
  pub exchange: String,
}

/* ------------------------------------------------------------------------------------------------------------------ */

pub async fn get_market_trades(
  client: &Client,
  product_id: &str,
  limit: u32
) -> Result<MarketTradeResponse, Box<dyn std::error::Error>> {
  let url = format!("https://api.coinbase.com/api/v3/brokerage/products/{}/ticker", product_id);

  let response = client
    .get(&url)
    .query(&[("limit", limit.to_string())])
    .header("Content-Type", "application/json")
    .send().await?;

  if response.status().is_success() {
    let body = response.json::<MarketTradeResponse>().await?;
    Ok(body)
  } else {
    let status = response.status();
    let error_body = response.json::<Value>().await?;
    Err(format!("Error: {} - {}", status, error_body).into())
  }
}

/* ------------------------------------------------------------------------------------------------------------------ */
