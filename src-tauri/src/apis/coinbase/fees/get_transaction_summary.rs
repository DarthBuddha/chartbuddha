/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/products/get_market_trades.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - GetMarketTrades
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{ Deserialize, Serialize };
// Crate
use crate::apis::coinbase::fees::transaction_summary::fee_tier::FeeTier;
use crate::apis::coinbase::fees::transaction_summary::goods_and_services_tax::GoodsAndServicesTax;
use crate::apis::coinbase::fees::transaction_summary::margin_rate::MarginRate;

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent the response from the list products endpoint
#[derive(Debug, Deserialize, Serialize)]
pub struct GetMarketTrades {
  pub total_volume: f64,
  pub total_fees: f64,
  pub fee_tier: Vec<FeeTier>,
  pub margin_rate: Vec<MarginRate>,
  pub goods_and_services_tax: Vec<GoodsAndServicesTax>,
  pub advanced_trade_only_volume: f64,
  pub advanced_trade_only_fees: f64,
  pub coinbase_pro_volume: f64,
  pub coinbase_pro_fees: f64,
  pub total_balance: String,
}

/* ---------------------------------------------------------------------------------------------- */
