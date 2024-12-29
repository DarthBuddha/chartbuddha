//! # Get Product
//! Get information on a single product by product ID.
//!
//! ### Structs
//! - `ProductResponse`
//!
//! ### Functions
//! - `get_product`
//!
/* ---------------------------------------------------------------------------------- */
//
// Dependencies
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::Value;
//
/* ---------------------------------------------------------------------------------- */
/// Struct to represent the response from the product endpoint
#[derive(Debug, Deserialize, Serialize)]
pub struct ProductResponse {
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
    pub mid_market_price: Option<String>,
    pub display_name: Option<String>,
}
//
/* ---------------------------------------------------------------------------------- */
/// Get information on a single product by product ID
pub async fn get_product(
    jwt_token: String,
    product_id: &str,
    get_tradability_status: Option<bool>,
) -> Result<ProductResponse, Box<dyn std::error::Error>> {
    let url =
        format!("https://api.coinbase.com/api/v3/brokerage/products/{}", product_id);
    let client = Client::new();

    let mut request = client
        .get(&url)
        .header("Content-Type", "application/json")
        .header("Authorization", format!("Bearer {}", jwt_token));

    if let Some(status) = get_tradability_status {
        request = request.query(&[("get_tradability_status", status.to_string())]);
    }

    let response = request.send().await?;

    if response.status().is_success() {
        let body = response.json::<ProductResponse>().await?;
        Ok(body)
    } else {
        let status = response.status();
        let error_body = response.json::<Value>().await?;
        Err(format!("Error: {} - {}", status, error_body).into())
    }
}
//
/* ---------------------------------------------------------------------------------- */
