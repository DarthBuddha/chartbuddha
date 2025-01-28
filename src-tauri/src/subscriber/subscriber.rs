/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Subscriber - subscriber
/* ---------------------------------------------------------------------------------------------- */
//! #### Structs:
//! * Subscriber
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/structs/subscriber.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::fmt::Display;
use std::fmt::Formatter;
use std::fmt::Result;
// SeaOrm
use sea_orm::prelude::DateTimeWithTimeZone;
use sea_orm::prelude::DateTime;
// Dependencies
use serde::{ Deserialize, Serialize };

/* ---------------------------------------------------------------------------------------------- */

/// Subscription struct
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Subscriber {
  pub subscription_type: SubscriptionType,
  pub exchange_type: ExchangeType,
  pub platform: String,
  pub symbol: String,
  pub tick: f64,
  pub granularity: f64,
  pub historical: String,
  pub created_at: DateTimeWithTimeZone,
  pub updated_at: DateTime,
}

/* ---------------------------------------------------------------------------------------------- */

/// SubscriptionType enum
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "PascalCase")]
pub enum SubscriptionType {
  UnknownSubscriptionType,
  Broker,
  Market,
  News,
}

/// Display trait for SubscriptionType
impl Display for SubscriptionType {
  fn fmt(&self, f: &mut Formatter<'_>) -> Result {
    write!(f, "{:?}", self)
  }
}

/// SubscriptionType implementation
impl SubscriptionType {
  pub fn from_str(s: &str) -> Self {
    match s.to_lowercase().as_str() {
      "Broker" => SubscriptionType::Broker,
      "Market" => SubscriptionType::Market,
      "News" => SubscriptionType::News,
      _ => SubscriptionType::UnknownSubscriptionType,
    }
  }
}

/// ExchangeType enum
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "PascalCase")]
pub enum ExchangeType {
  UnknownExchangeType,
  Equity,
  Future,
  Spot,
  Perpetual,
}

/// Display trait for ExchangeType
impl Display for ExchangeType {
  fn fmt(&self, f: &mut Formatter<'_>) -> Result {
    write!(f, "{:?}", self)
  }
}

/// ExchangeType implementation
impl ExchangeType {
  pub fn from_str(s: &str) -> Self {
    match s.to_lowercase().as_str() {
      "Equity" => ExchangeType::Equity,
      "Future" => ExchangeType::Future,
      "Spot" => ExchangeType::Spot,
      "Perpetual" => ExchangeType::Perpetual,
      _ => ExchangeType::UnknownExchangeType,
    }
  }
}

/* ---------------------------------------------------------------------------------------------- */
