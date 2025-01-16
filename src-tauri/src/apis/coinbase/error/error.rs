/* ------------------------------------------------------------------------------------------------------------------ */
//! apis/coinbase/error/error_response.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Structs
//! - ErrorResponse
/* ------------------------------------------------------------------------------------------------------------------ */

// Dependencies
use serde::{ Deserialize, Serialize };
// Crates
use crate::apis::coinbase::error::details::Details;

/* ------------------------------------------------------------------------------------------------------------------ */

/// Struct for unexpected error responses
#[derive(Debug, Serialize, Deserialize)]
pub struct ErrorResponse {
  pub error: String,
  pub code: i32,
  pub message: String,
  pub details: Vec<Details>,
}

/* ------------------------------------------------------------------------------------------------------------------ */
