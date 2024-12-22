//! # ChartBuddha library
//! - Module: `get_product_book`
//! - Description: Get a list of bids/asks for a single product. The amount of detail shown can be customized with the limit parameter.
//! ### Structs
//! - `ProductBookResponse`
//! - `PriceBook`
//! - `Order`
//! ### Functions
//! - `get_product_book`
//! ##### provider/coinbase/api/products/get_product_book.rs
//
// Library Dependencies
use reqwest::Client;
use serde::Deserialize;
use serde_json::Value;
//
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct to represent the response from the product book endpoint
#[derive(Debug, Deserialize)]
pub struct ProductBookResponse {
    pub pricebook: PriceBook,
}
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct to represent a single price book entry in the product book response
#[derive(Debug, Deserialize)]
pub struct PriceBook {
    pub product_id: String,
    pub bids: Vec<Order>,
    pub asks: Vec<Order>,
    pub time: String, // You can use `chrono` for RFC3339 timestamps if needed
    pub last: Option<String>,
    pub mid_market: Option<String>,
    pub spread_bps: Option<String>,
    pub spread_absolute: Option<String>,
}
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct to represent a single order in the price book
#[derive(Debug, Deserialize)]
pub struct Order {
    pub price: String,
    pub size: String,
}
//
/* ---------------------------------- < Function > ---------------------------------- */
/// Get a list of bids/asks for a single product. The amount of detail shown can be customized with the limit parameter.
pub async fn get_product_book(
    client: &Client,
    product_id: &str,
    limit: Option<u32>,
    aggregation_price_increment: Option<&str>,
) -> Result<ProductBookResponse, Box<dyn std::error::Error>> {
    let url = "https://api.coinbase.com/api/v3/brokerage/product_book";

    let mut request = client
        .get(url)
        .header("Content-Type", "application/json")
        .query(&[("product_id", product_id)]); // Required query param

    // Optional query parameters
    if let Some(lim) = limit {
        request = request.query(&[("limit", lim.to_string())]);
    }

    if let Some(agg_price) = aggregation_price_increment {
        request = request.query(&[("aggregation_price_increment", agg_price)]);
    }

    let response = request.send().await?;

    if response.status().is_success() {
        match response.json::<ProductBookResponse>().await {
            Ok(body) => Ok(body),
            Err(err) => {
                // Handle parsing error
                Err(format!("Failed to parse response: {}", err).into())
            }
        }
    } else {
        let status = response.status();
        let error_body: Option<Value> = response.json().await.ok(); // Try parsing error body

        Err(format!(
            "Request failed with status: {}. Error: {:?}",
            status,
            error_body.unwrap_or_else(|| serde_json::json!({"error": "Unknown error"}))
        )
        .into())
    }
}
//
/* ---------------------------------- < End--Code >---------------------------------- */
