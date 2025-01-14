/* ------------------------------------------------------------------------------------------------------------------ */
//! structs/coinbase/data_api/get_permissions.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Structs
//! - ApiKeyPermissionsResponse
//! - ErrorResponse
//! - Detail
/* ------------------------------------------------------------------------------------------------------------------ */

// Dependencies
// use reqwest;
use serde::{Deserialize, Serialize};

/* ------------------------------------------------------------------------------------------------------------------ */

/// Struct to represent the API key permissions response
#[derive(Debug, Serialize, Deserialize)]
pub struct ApiKeyPermissionsResponse {
    pub can_view: bool,         // Indicates if the API key has view permissions
    pub can_trade: bool,        // Indicates if the API key has trade permissions
    pub can_transfer: bool,     // Indicates if the API key has transfer permissions
    pub portfolio_uuid: String, // The portfolio ID associated with the API key
    pub portfolio_type: String, // The type of portfolio
}

/* ------------------------------------------------------------------------------------------------------------------ */

/// Struct for unexpected error responses
#[derive(Debug, Serialize, Deserialize)]
pub struct ErrorResponse {
    pub error: String,
    pub code: i32,
    pub message: String,
    pub details: Vec<Detail>,
}

/* ------------------------------------------------------------------------------------------------------------------ */

/// Struct for error details
#[derive(Debug, Serialize, Deserialize)]
pub struct Detail {
    pub type_url: String,
    pub value: Vec<u8>,
}

/* ------------------------------------------------------------------------------------------------------------------ */
