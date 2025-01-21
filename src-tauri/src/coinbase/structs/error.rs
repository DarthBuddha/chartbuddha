/* ---------------------------------------------------------------------------------------------- */
//! # Coinbase Structs Error
/* ---------------------------------------------------------------------------------------------- */
//! #### Structs: Error
//! - ErrorResponse
//! - Details
/* ---------------------------------------------------------------------------------------------- */
//! ##### coinbase/structs/error.rs
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{ Deserialize, Serialize };

/* ---------------------------------------------------------------------------------------------- */

/// Struct for unexpected error responses
#[derive(Debug, Serialize, Deserialize)]
pub struct ErrorResponse {
  pub error: String,
  pub code: i32,
  pub message: String,
  pub details: Vec<Details>,
}

/// Struct for error details
#[derive(Debug, Serialize, Deserialize)]
pub struct Details {
  pub type_url: String,
  pub value: Vec<u8>,
}

/* ---------------------------------------------------------------------------------------------- */
