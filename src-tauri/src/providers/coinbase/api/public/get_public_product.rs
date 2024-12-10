//! # ChartBuddha library
//! - Module: `get_public_product`
//! - Description: Get information on a single product by product ID.
//! ### Structs
//! - `FcmTradingSessionDetails`
//! - `Maintenance`
//! - `FutureProductDetails`
//! - `PerpetualDetails`
//! - `ProductDetails`
//! - `ErrorResponse`
//! - `Detail`
//! ### Functions
//! - `get_public_product`
//! ##### provider/coinbase/api/public/get_public_product.rs
//
// Rust
use std::error::Error;
// Library Dependencies
use reqwest::Client;
use serde::{Deserialize, Serialize};
//
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct for trading session details
#[derive(Debug, Serialize, Deserialize)]
pub struct FcmTradingSessionDetails {
    pub is_session_open: bool,
    pub open_time: String,  // RFC3339 Timestamp
    pub close_time: String, // RFC3339 Timestamp
    pub session_state: String,
    pub after_hours_order_entry_disabled: bool,
    pub closed_reason: String,
}
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct for maintenance details
#[derive(Debug, Serialize, Deserialize)]
pub struct Maintenance {
    pub start_time: String, // RFC3339 Timestamp
    pub end_time: String,   // RFC3339 Timestamp
}
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct for future product details
#[derive(Debug, Serialize, Deserialize)]
pub struct FutureProductDetails {
    pub venue: String,
    pub contract_code: String,
    pub contract_expiry: String, // RFC3339 Timestamp
    pub contract_size: String,
    pub contract_root_unit: String,
    pub group_description: String,
    pub contract_expiry_timezone: String,
    pub group_short_description: String,
    pub risk_managed_by: String,
    pub contract_expiry_type: String,
}
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct for perpetual details
#[derive(Debug, Serialize, Deserialize)]
pub struct PerpetualDetails {
    pub open_interest: String,
    pub funding_rate: String,
    pub funding_time: String, // RFC3339 Timestamp
    pub max_leverage: String,
    pub base_asset_uuid: String,
    pub underlying_type: String,
    pub contract_display_name: String,
    pub time_to_expiry_ms: i64,
    pub non_crypto: bool,
    pub contract_expiry_name: String,
    pub twenty_four_by_seven: bool,
}
/* ----------------------------------- < Struct > ----------------------------------- */
/// Main response struct for product details
#[derive(Debug, Serialize, Deserialize)]
pub struct ProductDetails {
    pub product_id: String, // The trading pair (e.g., 'BTC-USD')
    pub price: String,      // The current price for the product
    pub price_percentage_change_24h: String, // Price change percentage in last 24 hours
    pub volume_24h: String, // Trading volume in last 24 hours
    pub volume_percentage_change_24h: String, // Volume change percentage in last 24 hours
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
    pub product_type: String,
    pub quote_currency_id: String,
    pub base_currency_id: String,
    pub mid_market_price: String,
    pub alias: Option<String>,
    pub base_display_symbol: String,
    pub quote_display_symbol: String,
    pub view_only: bool,
    pub price_increment: String,
    pub display_name: String,
    pub product_venue: String,
    pub approximate_quote_24h_volume: String,
    pub fcm_trading_session_details: Option<FcmTradingSessionDetails>,
    pub maintenance: Option<Maintenance>,
    pub future_product_details: Option<FutureProductDetails>,
    pub perpetual_details: Option<PerpetualDetails>,
}
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct for unexpected error responses
#[derive(Debug, Serialize, Deserialize)]
pub struct ErrorResponse {
    pub error: String,
    pub code: i32,
    pub message: String,
    pub details: Vec<Detail>,
}
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct for error details
#[derive(Debug, Serialize, Deserialize)]
pub struct Detail {
    pub type_url: String,
    pub value: Vec<u8>,
}
//
/* ---------------------------------- < Function > ---------------------------------- */
/// Get information on a single product by product ID.
pub async fn get_public_product(
    product_id: &str,
) -> Result<ProductDetails, Box<dyn Error>> {
    let url = format!(
        "https://api.coinbase.com/api/v3/brokerage/market/products/{}",
        product_id
    );
    let client = Client::new();

    let response =
        client.get(&url).header("Content-Type", "application/json").send().await?;

    // Extract the status code first before consuming the response
    let status = response.status();

    let raw_body = response.text().await?;
    log::info!("Raw response body: {}", raw_body);

    if status.is_success() {
        let product_details: ProductDetails = serde_json::from_str(&raw_body)?;
        Ok(product_details)
    } else {
        let error_response: ErrorResponse = serde_json::from_str(&raw_body)?;
        Err(format!("Failed to get product details: {:?}", error_response).into())
    }
}
//
/* ---------------------------------- < End--Code >---------------------------------- */
