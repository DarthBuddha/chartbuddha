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
use serde_json::Value;
use std::error::Error;

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
}

/* ---------------------------------------------------------------------------------------------- */

/// Get a list of the available currency pairs for trading.
pub async fn list_products(
  jwt_token: String,
  selected_request_path: String
  // limit: Option<u32>,
  // offset: Option<u32>,
  // product_type: Option<&str>,
  // product_ids: Option<Vec<&str>>,
  // contract_expiry_type: Option<&str>,
  // expiring_contract_status: Option<&str>,
  // get_tradability_status: Option<bool>,
  // get_all_products: Option<bool>
) -> Result<ListProductsResponse, Box<dyn Error>> {
  // let base_url = "https://api.coinbase.com/api/v3/brokerage/products";
  let base_url = "https://api.coinbase.com/api/v3/brokerage/products";
  let client = Client::new();

  // Construct the final URL with query parameters
  let final_url = base_url.to_string() + &selected_request_path.to_string();

  // Log the final request URL
  log::info!("Final request URL: {}", final_url);

  // Make the request
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

    let error_message = if let Some(body) = error_body {
      if let Some(error) = body.get("error") {
        let unknown_code = Value::String("Unknown code".to_string());
        let code = {
          let unknown_code_ref = &unknown_code;
          error.get("code").unwrap_or(unknown_code_ref)
        };
        let unknown_message = Value::String("Unknown message".to_string());
        let unknown_message_ref = &unknown_message;
        let message = error.get("message").unwrap_or(unknown_message_ref);
        let details_value = Value::Array(vec![]);
        let details = error.get("details").unwrap_or(&details_value);
        format!(
          "Request failed with status: {}. Error code: {}. Message: {}. Details: {:?}",
          status,
          code,
          message,
          details
        )
      } else {
        format!("Request failed with status: {}. Error: {:?}", status, body)
      }
    } else {
      format!("Request failed with status: {}. Error: Unknown error", status)
    };

    Err(error_message.into())
  }
}

/* ---------------------------------------------------------------------------------------------- */
