/* ------------------------------------------------------------------------------------------------------------------ */
//! apis/coinbase/data_api/permissions/api_key_permissions.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Structs
//! - ApiKeyPermissions
/* ------------------------------------------------------------------------------------------------------------------ */

// Dependencies
use serde::{ Deserialize, Serialize };

/* ------------------------------------------------------------------------------------------------------------------ */

/// Enum to represent the possible values for portfolio type
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum PortfolioType {
  Undefined,
  Default,
  Consumer,
  Intx,
}

/* ------------------------------------------------------------------------------------------------------------------ */

/// Struct to represent the API key permissions response
#[derive(Debug, Serialize, Deserialize)]
pub struct ApiKeyPermissions {
  pub can_view: bool, // Indicates if the API key has view permissions
  pub can_trade: bool, // Indicates if the API key has trade permissions
  pub can_transfer: bool, // Indicates if the API key has transfer permissions
  pub portfolio_uuid: String, // The portfolio ID associated with the API key
  pub portfolio_type: PortfolioType, // The type of portfolio
}

/* ------------------------------------------------------------------------------------------------------------------ */
