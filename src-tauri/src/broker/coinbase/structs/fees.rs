/* ---------------------------------------------------------------------------------------------- */
//! # Coinbase Structs Fees Module
/* ---------------------------------------------------------------------------------------------- */
//! #### Endpoints:
//! * GetTransactionSummary
//! #### Structs: Fees
//! * FeeTier
//! * MarginRate
//! * GoodsAndServicesTax <TaxType>
/* ---------------------------------------------------------------------------------------------- */
//! ##### coinbase/structs/fees.rs
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{Deserialize, Serialize};

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent the response from the list products endpoint
#[derive(Debug, Deserialize, Serialize)]
pub struct GetTransactionSummary {
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

/// Struct to represent the response from the list products endpoint
#[derive(Debug, Deserialize, Serialize)]
pub struct FeeTier {
  pub pricing_tier: String,
  pub usd_from: String,
  pub usd_to: String,
  pub taker_fee_rate: String,
  pub maker_fee_rate: Option<String>,
  pub aop_from: String,
  pub aop_to: String,
}

/// Margin rate, only applicable to product_type `FUTURE`.
#[derive(Debug, Deserialize, Serialize)]
pub struct MarginRate {
  pub value: String,
}

/// Enum to represent the tax type
#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "UPPERCASE")]
pub enum TaxType {
  Inclusive,
  Exclusive,
}

/// Margin rate, only applicable to product_type `FUTURE`.
#[derive(Debug, Deserialize, Serialize)]
pub struct GoodsAndServicesTax {
  pub rate: String,
  #[serde(rename = "type")]
  pub tax_type: TaxType,
}

/* ---------------------------------------------------------------------------------------------- */
