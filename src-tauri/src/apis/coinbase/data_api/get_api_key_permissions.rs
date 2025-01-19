/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/data_api/api_key_permissions_response.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - GetApiKeyPermissions
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{ Deserialize, Serialize };
// Crates
use crate::apis::coinbase::data_api::api_key_permissions::api_key_permissions::ApiKeyPermissions;

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent the API key permissions response
#[derive(Debug, Serialize, Deserialize)]
pub struct GetApiKeyPermissions {
  pub api_key_permissions: Vec<ApiKeyPermissions>,
}

/* ---------------------------------------------------------------------------------------------- */
