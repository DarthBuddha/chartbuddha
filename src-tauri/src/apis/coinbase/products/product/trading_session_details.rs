/* ------------------------------------------------------------------------------------------------------------------ */
//! apis/coinbase/products/product/trading_session.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Structs
//! - FcmTradingSessionDetails
/* ------------------------------------------------------------------------------------------------------------------ */

// Dependencies
use serde::{ Deserialize, Serialize };
// Crate
use crate::apis::coinbase::products::product::maintenance::Maintenance;

/* ------------------------------------------------------------------------------------------------------------------ */

#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum TradingSessionStateType {
  FcmTradingSessionStateUndefined,
  FcmTradingSessionStatePreOpen,
  FcmTradingSessionStatePreOpenNoCancel,
  FcmTradingSessionStateOpen,
  FcmTradingSessionStateClosed,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum TradingSessionClosedReasonType {
  FcmTradingSessionClosedReasonUndefined,
  FcmTradingSessionClosedReasonRegularMarketClose,
  FcmTradingSessionClosedReasonExchangeMaintenance,
  FcmTradingSessionClosedReasonVendorMaintenance,
}

/* ------------------------------------------------------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------------------------------------------------------ */
