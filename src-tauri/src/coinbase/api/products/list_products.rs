/* ---------------------------------------------------------------------------------------------- */
//! # Module: list_products.rs
//!
//! Get a list of the available currency pairs for trading.
/* ---------------------------------------------------------------------------------------------- */
//! ### Structs
//! - ListProductsResponse
//! - Product
//!
//! ### Functions
//! - list_products
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use reqwest::Client;
use serde::{ Deserialize, Serialize };
use std::error::Error;

/* ---------------------------------------------------------------------------------------------- */

const BASE_URL: &str = "https://api.coinbase.com";

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent the response from the list products endpoint
#[derive(Debug, Deserialize, Serialize)]
pub struct ListProductsResponse {
  pub products: Vec<Product>,
  pub num_products: Option<i32>, // Number of products returned, if provided
}

/// Struct to represent a single product in the list products response
#[derive(Debug, Deserialize, Serialize, Clone)]
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
  pub fcm_trading_session_details: Option<FcmTradingSessionDetails>,
  pub maintenance: Option<Maintenance>,
  pub mid_market_price: Option<String>,
  pub alias: Option<String>,
  pub alias_to: Option<Vec<String>>,
  pub base_display_symbol: String,
  pub quote_display_symbol: String,
  pub view_only: Option<bool>,
  pub price_increment: Option<String>,
  pub product_venue: Option<String>,
  pub approximate_quote_24h_volume: Option<String>,
  pub future_product_details: Option<FutureProductDetails>,
  pub perpetual_details: Option<PerpetualDetails>,
}

/// Struct to represent FCM trading session details
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct FcmTradingSessionDetails {
  pub is_session_open: Option<bool>,
  pub open_time: Option<String>,
  pub close_time: Option<String>,
  pub session_state: Option<String>,
  pub after_hours_order_entry_disabled: Option<bool>,
  pub closed_reason: Option<String>,
}

/// Struct to represent maintenance details
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Maintenance {
  pub start_time: Option<String>,
  pub end_time: Option<String>,
}

/// Struct to represent future product details
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct FutureProductDetails {
  pub venue: Option<String>,
  pub contract_code: Option<String>,
  pub contract_expiry: Option<String>,
  pub contract_size: Option<String>,
  pub contract_root_unit: Option<String>,
  pub group_description: Option<String>,
  pub contract_expiry_timezone: Option<String>,
  pub group_short_description: Option<String>,
  pub risk_managed_by: Option<String>,
  pub contract_expiry_type: Option<String>,
}

/// Struct to represent perpetual details
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct PerpetualDetails {
  pub open_interest: Option<String>,
  pub funding_rate: Option<String>,
  pub funding_time: Option<String>,
  pub max_leverage: Option<String>,
  pub base_asset_uuid: Option<String>,
  pub underlying_type: Option<String>,
  pub contract_display_name: Option<String>,
  pub time_to_expiry_ms: Option<i64>,
  pub non_crypto: Option<bool>,
  pub contract_expiry_name: Option<String>,
  pub twenty_four_by_seven: Option<bool>,
}

/* ---------------------------------------------------------------------------------------------- */

/// Get a list of the available currency pairs for trading.
pub async fn list_products(
  jwt_token: String,
  selected_request_path: String
) -> Result<ListProductsResponse, Box<dyn Error>> {
  // let url = BASE_URL.to_string() + &selected_request_path;
  let url = "https://api.coinbase.com/api/v3/brokerage/products";
  let client = Client::new();

  // Log the final request URL
  log::info!("Final request URL: {}", url);

  // Make the request
  let request = client
    .get(url)
    .header("Content-Type", "application/json")
    .header("Authorization", format!("Bearer {}", jwt_token));

  let response = request.send().await?;

  if response.status().is_success() {
    match response.json::<ListProductsResponse>().await {
      Ok(body) => Ok(body),
      Err(err) => Err(format!("Failed to parse response: {}", err).into()),
    }
  } else {
    let status = response.status();
    let error_body = response.text().await.unwrap_or_else(|_| "Unable to read error body".to_string());
    log::error!("Error: Status code: {:?}, Response: {:?}", status, error_body);
    Err(format!("Failed with status code: {:?}", status).into())
  }
}

/* ---------------------------------------------------------------------------------------------- */
