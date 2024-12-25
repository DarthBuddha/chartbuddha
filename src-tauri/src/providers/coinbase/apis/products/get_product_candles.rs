//! # Get Product Candles
//! Get rates for a single product by product ID, grouped in buckets.
//!
//! ### Structs
//! - `CandlesResponse`
//! - `Candle`
//!
//! ### Functions
//! - `get_product_candles`
//!
/* ---------------------------------------------------------------------------------- */
//
// Dependencies
use reqwest::Client;
use serde::Deserialize;
use serde_json::Value;
//
/* ---------------------------------------------------------------------------------- */
/// Struct to represent the response from the product endpoint
#[derive(Debug, Deserialize)]
pub struct CandlesResponse {
    pub candles: Vec<Candle>,
}
/* ---------------------------------------------------------------------------------- */
/// Struct to represent a single candle entry in the candles response
#[derive(Debug, Deserialize)]
pub struct Candle {
    pub start: String, // UNIX timestamp as a string
    pub low: String,
    pub high: String,
    pub open: String,
    pub close: String,
    pub volume: String,
}
//
/* ---------------------------------------------------------------------------------- */
/// Get candles for a product
pub async fn get_product_candles(
    client: &Client,
    product_id: &str,
    start: &str,
    end: &str,
    granularity: &str,
    limit: Option<u32>,
) -> Result<CandlesResponse, Box<dyn std::error::Error>> {
    let url = format!(
        "https://api.coinbase.com/api/v3/brokerage/products/{}/candles",
        product_id
    );

    let mut request = client
        .get(&url)
        .header("Content-Type", "application/json")
        .query(&[("start", start), ("end", end), ("granularity", granularity)]);

    // Optional query parameter
    if let Some(lim) = limit {
        request = request.query(&[("limit", lim.to_string())]);
    }

    let response = request.send().await?;

    if response.status().is_success() {
        match response.json::<CandlesResponse>().await {
            Ok(body) => Ok(body),
            Err(err) => Err(format!("Failed to parse response: {}", err).into()),
        }
    } else {
        let status = response.status();
        let error_body: Option<Value> = response.json().await.ok(); // Attempt to parse error body

        Err(format!(
            "Request failed with status: {}. Error: {:?}",
            status,
            error_body.unwrap_or_else(|| serde_json::json!({"error": "Unknown error"}))
        )
        .into())
    }
}
//
/* ---------------------------------------------------------------------------------- */
