/* ------------------------------------------------------------------------------------------------------------------ */
//! # Module: get_best_bid_ask
//!
//! Get the best bid/ask for all products.
//! A subset of all products can be returned instead by using the product_ids input.
/* ------------------------------------------------------------------------------------------------------------------ */
//! ### Structs
//! - `BestBidAskResponse`
//! - `PriceBook`
//! - `Order`
//!
//! ### Functions
//! - `get_best_bid_ask`
/* ------------------------------------------------------------------------------------------------------------------ */

// Dependencies
use reqwest::Client;
use serde::Deserialize;
use serde_json::Value;

/* ------------------------------------------------------------------------------------------------------------------ */

/// Struct to represent the response from the best bid/ask endpoint
#[derive(Debug, Deserialize)]
pub struct BestBidAskResponse {
  pub pricebooks: Vec<PriceBook>,
}

/// Struct to represent a single price book entry in the best bid/ask response
#[derive(Debug, Deserialize)]
pub struct PriceBook {
  pub product_id: String,
  pub bids: Vec<Order>,
  pub asks: Vec<Order>,
  pub time: String, // Optionally parse this into a proper timestamp
}

/// Struct to represent a single order in the price book
#[derive(Debug, Deserialize)]
pub struct Order {
  pub price: String,
  pub size: String,
}

/* ------------------------------------------------------------------------------------------------------------------ */
/// Get the best bid and ask for a list of product IDs
pub async fn get_best_bid_ask(
  client: &Client,
  product_ids: Vec<&str>
) -> Result<BestBidAskResponse, Box<dyn std::error::Error>> {
  let url = "https://api.coinbase.com/api/v3/brokerage/best_bid_ask";

  let response = client
    .get(url)
    .query(&[("product_ids", product_ids.join(","))]) // Serialize product_ids as a comma-separated list
    .header("Content-Type", "application/json")
    .send().await?;

  if response.status().is_success() {
    let body = response.json::<BestBidAskResponse>().await?;
    Ok(body)
  } else {
    let status = response.status();
    let error_body = response.json::<Value>().await?;
    Err(format!("Error: {} - {}", status, error_body).into())
  }
}

/* ------------------------------------------------------------------------------------------------------------------ */
