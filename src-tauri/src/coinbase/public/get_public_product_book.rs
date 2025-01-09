/* ---------------------------------------------------------------------------------------------- */
//! # Module: get_public_product_book.rs
//!
//! Get a list of bids/asks for a single product.
//! The amount of detail shown can be customized with the limit parameter.
/* ---------------------------------------------------------------------------------------------- */
//! ### Struct
//! - PriceLevel
//! - PriceBook
//! - OrderBookResponse
//! - ErrorResponse
//! - Detail
//!
//! ### Functions
//! - get_public_product_book
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::error::Error;
// Dependencies
use reqwest::Client;
use serde::{ Deserialize, Serialize };

/* ---------------------------------------------------------------------------------------------- */

/// PriceLevel struct for the Coinbase API
#[derive(Debug, Serialize, Deserialize)]
pub struct PriceLevel {
  pub price: String, // Price at this level (as a string)
  pub size: String, // Size at this level (as a string)
}

/// PriceBook struct for the Coinbase API
#[derive(Debug, Serialize, Deserialize)]
pub struct PriceBook {
  pub product_id: String, // The trading pair (e.g., 'BTC-USD')
  pub bids: Vec<PriceLevel>, // List of bid price levels
  pub asks: Vec<PriceLevel>, // List of ask price levels
  pub time: String, // RFC3339 timestamp
  pub last: String, // Last trade price
  pub mid_market: String, // Mid-market price
  pub spread_bps: String, // Spread in basis points
  pub spread_absolute: String, // Absolute spread
}

/// OrderBookResponse struct for the Coinbase API
#[derive(Debug, Serialize, Deserialize)]
pub struct OrderBookResponse {
  pub pricebook: PriceBook, // The entire pricebook object
}

/// ErrorResponse struct for the Coinbase API
#[derive(Debug, Serialize, Deserialize)]
pub struct ErrorResponse {
  pub error: String,
  pub code: i32,
  pub message: String,
  pub details: Vec<Detail>,
}

/// Detail struct for the ErrorResponse
#[derive(Debug, Serialize, Deserialize)]
pub struct Detail {
  pub type_url: String,
  pub value: Vec<u8>,
}

/* ---------------------------------------------------------------------------------------------- */

/// Get a list of bids/asks for a single product.
pub async fn get_public_product_book(
  product_id: &str
) -> Result<OrderBookResponse, Box<dyn Error>> {
  let url =
    format!("https://api.coinbase.com/api/v3/brokerage/market/product_book?product_id={}", product_id);
  let client = Client::new();

  let response = client.get(&url).header("Content-Type", "application/json").send().await?;

  if response.status().is_success() {
    let order_book: OrderBookResponse = response.json().await?;
    Ok(order_book)
  } else {
    let err_body = response.text().await?;
    Err(format!("Failed to get product book: {}", err_body).into())
  }
}

/* ---------------------------------------------------------------------------------------------- */
