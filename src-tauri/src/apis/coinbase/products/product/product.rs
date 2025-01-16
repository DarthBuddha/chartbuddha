/* ------------------------------------------------------------------------------------------------------------------ */
//! apis/coinbase/products/product/product.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Structs
//! - Product
/* ------------------------------------------------------------------------------------------------------------------ */

// Dependencies
use serde::{ Deserialize, Serialize };
// Crate
use crate::apis::coinbase::products::product::trading_session_details::FcmTradingSessionDetails;
use crate::apis::coinbase::products::product::future_product_details::FutureProductDetails;

/* ------------------------------------------------------------------------------------------------------------------ */

#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum ProductType {
  UnknownProductType,
  Spot,
  Future,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum VenueType {
  UnknownVenueType,
  Spot,
  Future,
  Cbe,
}

/* ------------------------------------------------------------------------------------------------------------------ */

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
  pub product_type: ProductType,
  pub quote_currency_id: Option<String>,
  pub base_currency_id: Option<String>,
  pub fcm_trading_session_details: Option<FcmTradingSessionDetails>,
  pub mid_market_price: Option<String>,
  pub alias: Option<String>,
  pub alias_to: Option<Vec<String>>,
  pub base_display_symbol: String,
  pub quote_display_symbol: String,
  pub view_only: Option<bool>,
  pub price_increment: Option<String>,
  pub display_name: Option<String>,
  pub product_venue: VenueType,
  pub approximate_quote_24h_volume: Option<String>,
  pub future_product_details: Option<FutureProductDetails>,
}

/* ------------------------------------------------------------------------------------------------------------------ */
