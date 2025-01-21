/* ---------------------------------------------------------------------------------------------- */
//! # Coinbase Structs Products Module
/* ---------------------------------------------------------------------------------------------- */
//! #### Endpoints:
//! * GetBestBidAsk
//! * GetProductBook
//! * ListProductsResponse
//! * GetProduct
//! * GetProductCandles
//! * GetMarketTrades
//! #### Structs: Products
//! * Product <ProductType, VenueType>
//! * FutureProductDetails <RiskManagementType, ContractExpiryType>
//! * PerpetualDetails
//! * FcmTradingSessionDetails <TradingSessionStateType, TradingSessionClosedReasonType>
//! * Maintenance
//! #### Structs: PriceBook
//! * PriceBook
//! * Asks
//! * Bids
//! #### Structs: Trades
//! * Trades
//! #### Structs: Candles
//! * Candles
/* ---------------------------------------------------------------------------------------------- */
//! ##### coinbase/structs/products.rs
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{ Deserialize, Serialize };

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent maintenance details
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct GetBestBidAsk {
  pub price_book: Vec<PriceBook>,
}

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent maintenance details
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct GetProductBook {
  pub price_book: Vec<PriceBook>,
  pub last: String,
  pub mid_market: String,
  pub spread_bps: String,
  pub spread_absolute: String,
}

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent the response from the list products endpoint
#[derive(Debug, Deserialize, Serialize)]
pub struct ListProductsResponse {
  pub products: Vec<Product>,
  pub num_products: Option<i32>, // Number of products returned, if provided
}

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent a single product in the list products response
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct GetProduct {
  pub product: Option<Product>,
}

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent maintenance details
#[derive(Debug, Deserialize, Serialize)]
pub struct GetProductCandles {
  pub candles: Vec<Candles>,
}

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent the response from the list products endpoint
#[derive(Debug, Deserialize, Serialize)]
pub struct GetMarketTrades {
  pub trades: Vec<Trades>,
  pub best_bid: String,
  pub best_ask: String,
}

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent maintenance details
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum ProductType {
  UnknownProductType,
  Spot,
  Future,
}

/// Enum to represent the venue type of a product
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum VenueType {
  UnknownVenueType,
  Spot,
  Future,
  Cbe,
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

/// Enum to represent the risk management type of a product
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum RiskManagementType {
  UnknownRiskManagementType,
  ManagedByFcm,
  ManagedByVenue,
}

/// Enum to represent the contract expiry type of a product
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum ContractExpiryType {
  UnknownContractExpiryType,
  Expiring,
  Perpetual,
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
  pub risk_managed_by: Option<RiskManagementType>,
  pub contract_expiry_type: Option<ContractExpiryType>,
  pub perpetual_details: Option<PerpetualDetails>,
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

/// Struct to represent maintenance details
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum TradingSessionStateType {
  FcmTradingSessionStateUndefined,
  FcmTradingSessionStatePreOpen,
  FcmTradingSessionStatePreOpenNoCancel,
  FcmTradingSessionStateOpen,
  FcmTradingSessionStateClosed,
}

/// Enum to represent the reason a trading session is closed
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum TradingSessionClosedReasonType {
  FcmTradingSessionClosedReasonUndefined,
  FcmTradingSessionClosedReasonRegularMarketClose,
  FcmTradingSessionClosedReasonExchangeMaintenance,
  FcmTradingSessionClosedReasonVendorMaintenance,
}

/// Struct to represent FCM trading session details
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct FcmTradingSessionDetails {
  pub is_session_open: Option<bool>,
  pub open_time: Option<String>, // RFC3339 Timestamp
  pub close_time: Option<String>, // RFC3339 Timestamp
  pub session_state: Option<TradingSessionStateType>, // Use enum instead of string
  pub after_hours_order_entry_disabled: Option<bool>,
  pub closed_reason: Option<TradingSessionClosedReasonType>, // Use enum instead of string
  pub maintenance: Option<Maintenance>,
}

/// Fcm specific scheduled maintenance details.
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Maintenance {
  pub start_time: Option<String>, // RFC3339 Timestamp
  pub end_time: Option<String>, // RFC3339 Timestamp
}

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent maintenance details
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct PriceBook {
  pub product_id: Option<String>,
  pub asks: Vec<Asks>,
  pub bids: Vec<Bids>,
  pub time: Option<String>,
}

/// Struct to represent maintenance details
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Asks {
  pub price: String,
  pub size: String,
}

/// Struct to represent maintenance details
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Bids {
  pub price: String,
  pub size: String,
}

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent the response from the list products endpoint
#[derive(Debug, Deserialize, Serialize)]
pub struct Trades {
  pub trade_id: String,
  pub product_id: String,
  pub price: String,
  pub size: String,
  pub time: Option<String>,
  pub side: String,
  pub exchange: String,
}

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent the response from the list products endpoint
#[derive(Debug, Deserialize, Serialize)]
pub struct Candles {
  pub start: String,
  pub low: String,
  pub high: String,
  pub open: String,
  pub close: String,
  pub volume: String,
}

/* ---------------------------------------------------------------------------------------------- */
