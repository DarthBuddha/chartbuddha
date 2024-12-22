//! # ChartBuddha library
//! - Module: `list_products`
//! - Description: Get a list of the available currency pairs for trading.
//! ### Structs
//! - `ListProductsResponse`
//! - `Product`
//! ### Functions
//! - `list_products`
//! ##### provider/coinbase/api/products/list_products.rs
//
// Rust
// Library Dependencies
use reqwest::Client;
use serde::Deserialize;
use serde_json::Value;
//
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct to represent the response from the list products endpoint
#[derive(Debug, Deserialize)]
pub struct ListProductsResponse {
    pub products: Vec<Product>,
    pub num_products: Option<i32>, // Number of products returned, if provided
}
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct to represent a single product in the list products response
#[derive(Debug, Deserialize)]
pub struct Product {
    pub product_id: String,
    pub price: String,
    pub price_percentage_change_24h: String,
    pub volume_24h: String,
    pub volume_percentage_change_24h: String,
    pub base_increment: String,
    pub quote_increment: String,
    pub quote_min_size: String,
    pub quote_max_size: String,
    pub base_min_size: String,
    pub base_max_size: String,
    pub base_name: String,
    pub quote_name: String,
    pub watched: bool,
    pub is_disabled: bool,
    pub new: bool,
    pub status: String,
    pub cancel_only: bool,
    pub limit_only: bool,
    pub post_only: bool,
    pub trading_disabled: bool,
    pub auction_mode: bool,
    pub product_type: Option<String>,
    pub quote_currency_id: Option<String>,
    pub base_currency_id: Option<String>,
    pub display_name: Option<String>,
}
//
/* ---------------------------------- < Function > ---------------------------------- */
/// Get a list of the available currency pairs for trading.
pub async fn list_products(
    client: &Client,
    limit: Option<u32>,
    offset: Option<u32>,
    product_type: Option<&str>,
    product_ids: Option<Vec<&str>>,
    get_all_products: Option<bool>,
) -> Result<ListProductsResponse, Box<dyn std::error::Error>> {
    let url = "https://api.coinbase.com/api/v3/brokerage/products";

    let mut request = client.get(url).header("Content-Type", "application/json");

    // Add query parameters
    if let Some(lim) = limit {
        request = request.query(&[("limit", lim.to_string())]);
    }
    if let Some(off) = offset {
        request = request.query(&[("offset", off.to_string())]);
    }
    if let Some(p_type) = product_type {
        request = request.query(&[("product_type", p_type)]);
    }
    if let Some(p_ids) = product_ids {
        request = request.query(&[("product_ids", p_ids.join(","))]);
    }
    if let Some(all_products) = get_all_products {
        request = request.query(&[("get_all_products", all_products.to_string())]);
    }

    let response = request.send().await?;

    if response.status().is_success() {
        match response.json::<ListProductsResponse>().await {
            Ok(body) => Ok(body),
            Err(err) => Err(format!("Failed to parse response: {}", err).into()),
        }
    } else {
        let status = response.status();
        let error_body: Option<Value> = response.json().await.ok();

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
