/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/fees/transaction_summary/goods_and_services_tax.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - GoodsAndServicesTax
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{ Deserialize, Serialize };

/* ---------------------------------------------------------------------------------------------- */

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "UPPERCASE")]
pub enum TaxType {
  Inclusive,
  Exclusive,
}

/* ---------------------------------------------------------------------------------------------- */

/// Margin rate, only applicable to product_type `FUTURE`.
#[derive(Debug, Deserialize, Serialize)]
pub struct GoodsAndServicesTax {
  pub rate: String,
  #[serde(rename = "type")]
  pub tax_type: TaxType,
}

/* ---------------------------------------------------------------------------------------------- */
