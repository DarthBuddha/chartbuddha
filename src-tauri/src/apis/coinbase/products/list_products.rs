//! # List Products
//! Get a list of the available currency pairs for trading.
//!
//! ### Structs
//! - `ListProductsResponse`
//! - `Product`
//!
//! ### Functions
//! - `list_products`
//!
/* ---------------------------------------------------------------------------------- */
//
// Dependencies
use reqwest::Client;
use serde::{ Deserialize, Serialize };
use serde_json::Value;
use std::error::Error;
//
/* ---------------------------------------------------------------------------------- */
/// Struct to represent the response from the list products endpoint
#[derive(Debug, Deserialize, Serialize)]
pub struct ListProductsResponse {
  pub products: Vec<Product>,
  pub num_products: Option<i32>, // Number of products returned, if provided
}
/* ---------------------------------------------------------------------------------- */
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
}
//
/* ---------------------------------------------------------------------------------- */
/// Get a list of the available currency pairs for trading.
pub async fn list_products(
  jwt_token: String,
  limit: Option<u32>,
  offset: Option<u32>,
  product_type: Option<&str>,
  product_ids: Option<Vec<&str>>,
  get_all_products: Option<bool>
) -> Result<ListProductsResponse, Box<dyn Error>> {
  let base_url = "https://api.coinbase.com/api/v3/brokerage/products";
  let client = Client::new();

  let mut query_params = vec![];

  // Add query parameters
  if let Some(lim) = limit {
    query_params.push(format!("limit={}", lim));
  }
  if let Some(off) = offset {
    query_params.push(format!("offset={}", off));
  }
  if let Some(p_type) = product_type {
    query_params.push(format!("product_type={}", p_type));
  }
  if let Some(p_ids) = product_ids {
    query_params.push(format!("product_ids={}", p_ids.join(",")));
  }
  if let Some(all_products) = get_all_products {
    if all_products {
      query_params.push("get_all_products=true".to_string());
    }
  }

  // Construct the final URL with query parameters
  let final_url = if query_params.is_empty() {
    base_url.to_string()
  } else {
    format!("{}?{}", base_url, query_params.join("&"))
  };

  // Log the final request URL
  // log::info!("Final request URL: {}", final_url);

  let request = client
    .get(&final_url)
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
    let error_body: Option<Value> = response.json().await.ok();

    Err(
      format!(
        "Request failed with status: {}. Error: {:?}",
        status,
        error_body.unwrap_or_else(|| serde_json::json!({"error": "Unknown error"}))
      ).into()
    )
  }
}
//
/* ---------------------------------------------------------------------------------- */
