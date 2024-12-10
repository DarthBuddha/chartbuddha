//! # ChartBuddha library
//! - Module: `transformer`
//! - Description: Coinbase provider websocket transformer.
//! ### Structs
//! - `TradeData`
//! ### Functions
//! - `transform_raw_to_trade_data`
//! ##### provider/coinbase/transformer.rs
//
// Library Dependencies
use serde::Deserialize;
//
/* ----------------------------------- < Struct > ----------------------------------- */
/// Trade data struct
#[derive(Debug, Deserialize)]
pub struct TradeData {
    pub product_id: String,
    pub price: f64,
    pub size: f64,
    pub side: String,
    pub timestamp: String,
}
//
/* ---------------------------------- < Function > ---------------------------------- */
/// Transform raw data to trade data
pub async fn transform_raw_to_trade_data(raw: &str) -> Option<TradeData> {
    if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(raw) {
        if let Some(type_value) = parsed.get("type") {
            if type_value == "ticker" {
                return Some(TradeData {
                    product_id: parsed["product_id"].as_str()?.to_string(),
                    price: parsed["price"].as_str()?.parse().ok()?,
                    size: parsed["last_size"].as_str()?.parse().ok()?,
                    side: parsed["side"].as_str()?.to_string(),
                    timestamp: parsed["time"].as_str()?.to_string(),
                });
            }
        }
    }
    None
}
/* ---------------------------------- < End--Code >---------------------------------- */
