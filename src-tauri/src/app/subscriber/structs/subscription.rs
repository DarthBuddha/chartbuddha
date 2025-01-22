/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Structs - subscription
/* ---------------------------------------------------------------------------------------------- */
//! #### Structs:
//! * Subscription
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/structs/subscription.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::fmt::Display;
use std::fmt::Formatter;
use std::fmt::Result;
// Dependencies
use serde::{ Deserialize, Serialize };

/* ---------------------------------------------------------------------------------------------- */

/// SubscriptionType enum
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum SubscriptionType {
  UnknownSubscriptionType,
  Broker,
  Market,
  News,
}

impl Display for SubscriptionType {
  fn fmt(&self, f: &mut Formatter<'_>) -> Result {
    write!(f, "{:?}", self)
  }
}

impl SubscriptionType {
  pub fn from_str(s: &str) -> Self {
    match s.to_uppercase().as_str() {
      "BROKER" => SubscriptionType::Broker,
      "MARKET" => SubscriptionType::Market,
      "NEWS" => SubscriptionType::News,
      _ => SubscriptionType::UnknownSubscriptionType,
    }
  }
}

/// Subscription struct
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Subscription {
  pub exchange: String,
  pub granularity: f64,
  pub historical: String,
  pub platform: String,
  pub subscription_type: SubscriptionType,
  pub symbol: String,
  pub tick: f64,
}

/* ---------------------------------------------------------------------------------------------- */
