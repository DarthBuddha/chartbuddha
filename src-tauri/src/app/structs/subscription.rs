/* ---------------------------------------------------------------------------------------------- */
//! # App Structs: subscription Module
/* ---------------------------------------------------------------------------------------------- */
//! #### Structs:
//! * Subscription
/* ---------------------------------------------------------------------------------------------- */
//! ##### app/structs/subscription.rs
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{ Deserialize, Serialize };

/* ---------------------------------------------------------------------------------------------- */

/// Subscription struct
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Subscription {
  pub exchange: String,
  pub granularity: f64,
  pub historical: String,
  pub platform: String,
  pub subscription_type: String,
  pub symbol: String,
  pub tick: f64,
}

/* ---------------------------------------------------------------------------------------------- */
