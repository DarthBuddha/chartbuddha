//! # Get Api Key Permissions
//! Get information about your CDP API key permissions.
//!
//! ### Structs
//! - `ApiKeyPermissionsResponse`
//! - `ErrorResponse`
//! - `Detail`
//!
//! ### Functions
//! - `get_api_key_permissions`
//!
/* ---------------------------------------------------------------------------------- */
//
// Dependencies
use reqwest;
use serde::{Deserialize, Serialize};
//
/* ---------------------------------------------------------------------------------- */
/// Struct to represent the API key permissions response
#[derive(Debug, Serialize, Deserialize)]
pub struct ApiKeyPermissionsResponse {
    pub can_view: bool,  // Indicates if the API key has view permissions
    pub can_trade: bool, // Indicates if the API key has trade permissions
    pub can_transfer: bool, // Indicates if the API key has transfer permissions
    pub portfolio_uuid: String, // The portfolio ID associated with the API key
    pub portfolio_type: String, // The type of portfolio
}
/* ---------------------------------------------------------------------------------- */
/// Struct for unexpected error responses
#[derive(Debug, Serialize, Deserialize)]
pub struct ErrorResponse {
    pub error: String,
    pub code: i32,
    pub message: String,
    pub details: Vec<Detail>,
}
/* ---------------------------------------------------------------------------------- */
/// Struct for error details
#[derive(Debug, Serialize, Deserialize)]
pub struct Detail {
    pub type_url: String,
    pub value: Vec<u8>,
}
//
/* ---------------------------------------------------------------------------------- */
/// Get information about your CDP API key permissions.
pub async fn get_api_key_permissions(
    jwt_token: String,
) -> Result<ApiKeyPermissionsResponse, String> {
    let url = "https://api.coinbase.com/api/v3/brokerage/key_permissions";
    let client = reqwest::Client::new();

    let response = client
        .get(url)
        .header("Content-Type", "application/json")
        .header("Authorization", format!("Bearer {}", jwt_token))
        .send()
        .await;

    match response {
        Ok(resp) => {
            if resp.status().is_success() {
                match resp.json::<ApiKeyPermissionsResponse>().await {
                    Ok(parsed_response) => Ok(parsed_response),
                    Err(parse_err) => {
                        log::error!("Failed to parse response body: {:?}", parse_err);
                        Err("Error parsing response body".to_string())
                    }
                }
            } else {
                let status = resp.status();
                let error_body = resp
                    .text()
                    .await
                    .unwrap_or_else(|_| "Unable to read error body".to_string());
                log::error!(
                    "Error: Status code: {:?}, Response: {:?}",
                    status,
                    error_body
                );
                Err(format!("Failed with status code: {:?}", status))
            }
        }
        Err(req_err) => {
            log::error!("Request error: {:?}", req_err);
            Err(format!("Failed to make the request: {:?}", req_err))
        }
    }
}
//
/* ---------------------------------------------------------------------------------- */
