//! # Get Public Product Candles
//! Get rates for a single product by product ID, grouped in buckets.
//!
//! ### Structs
//! - `Candle`
//! - `ProductCandlesResponse`
//! - `ErrorResponse`
//! - `Detail`
//!
//! ### Functions
//! - `get_public_product_candles`
//!
/* ---------------------------------------------------------------------------------- */
//
// Rust
use std::error::Error;
// Dependencies
use reqwest::Client;
use serde::{Deserialize, Serialize};
//
/* ---------------------------------------------------------------------------------- */
/// Struct for individual candle
#[derive(Debug, Serialize, Deserialize)]
pub struct Candle {
    pub start: String, // The UNIX timestamp indicating the start of the time interval
    pub low: String,   // Lowest price during the bucket interval
    pub high: String,  // Highest price during the bucket interval
    pub open: String,  // Opening price (first trade) in the bucket interval
    pub close: String, // Closing price (last trade) in the bucket interval
    pub volume: String, // Volume of trading activity during the bucket interval
}
/* ---------------------------------------------------------------------------------- */
/// Struct for the entire response
#[derive(Debug, Serialize, Deserialize)]
pub struct ProductCandlesResponse {
    pub candles: Vec<Candle>, // List of candlesticks for the product
}
/* ---------------------------------------------------------------------------------- */
/// Struct for error response in case the request fails
#[derive(Debug, Serialize, Deserialize)]
pub struct ErrorResponse {
    pub error: String,
    pub code: i32,
    pub message: String,
    pub details: Vec<Detail>,
}
/* ---------------------------------------------------------------------------------- */
/// Struct for error response details
#[derive(Debug, Serialize, Deserialize)]
pub struct Detail {
    pub type_url: String,
    pub value: Vec<u8>,
}
//
/* ---------------------------------------------------------------------------------- */
/// Get rates for a single product by product ID, grouped in buckets.
pub async fn get_public_product_candles(
    product_id: &str,
    start: &str,
    end: &str,
    granularity: &str,
    limit: Option<i32>,
) -> Result<ProductCandlesResponse, Box<dyn Error>> {
    // Construct the URL with query parameters
    let url = format!(
        "https://api.coinbase.com/api/v3/brokerage/market/products/{}/candles?start={}&end={}&granularity={}",
        product_id, start, end, granularity
    );

    // Append `limit` to the URL if it is specified
    let url = if let Some(l) = limit { format!("{}&limit={}", url, l) } else { url };

    // Create the HTTP client
    let client = Client::new();

    // Send the GET request
    let response =
        client.get(&url).header("Content-Type", "application/json").send().await?;

    // Extract the status code first before consuming the response
    let status = response.status();
    let raw_body = response.text().await?;
    log::info!("Raw response body: {}", raw_body);

    // Handle the response based on status
    if status.is_success() {
        let candles: ProductCandlesResponse = serde_json::from_str(&raw_body)?;
        Ok(candles)
    } else {
        let error_response: ErrorResponse = serde_json::from_str(&raw_body)?;
        Err(format!("Failed to get product candles: {:?}", error_response).into())
    }
}
//
/* ---------------------------------------------------------------------------------- */
