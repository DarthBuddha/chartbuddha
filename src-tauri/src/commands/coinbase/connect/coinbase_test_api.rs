//! # Coinbase Test API
//! Save the keys for the Coinbase API.
//!
//! ### Functions
//! - connect_test_api
//!
/* ---------------------------------------------------------------------------------- */
//
// Rust
use serde::Serialize;
// Tauri
use tauri::{AppHandle, Wry};
// Local
use crate::apis::coinbase::coinbase_authenticator::authenticate_api_request;
use crate::apis::coinbase::coinbase_authenticator::Authenticator;
use crate::apis::coinbase::data_api::get_api_key_permissions::get_api_key_permissions;
//
/* ---------------------------------------------------------------------------------- */
/// Struct to represent the Product Data
#[derive(Serialize)]
pub struct CoinbaseProductData {
    product_id: String,
    product_type: Option<String>,
    quote_currency_id: Option<String>,
    base_currency_id: Option<String>,
    display_name: String,
}
/* ---------------------------------------------------------------------------------- */
/// Function to test the connection to the Coinbase API
#[tauri::command]
pub async fn coinbase_test_api(app_handle: AppHandle<Wry>) -> Result<String, String> {
    // Step 1: Create an instance of Authenticator
    log::info!("Step 1: Create an instance of Authenticator");
    let authenticator = Authenticator {
        request_method: "GET".to_string(),
        request_path: "/api/v3/brokerage/key_permissions".to_string(),
    };

    // Step 2: Generate JWT Token
    log::info!("Step 2: Generate JWT Token");
    let jwt_token =
        match authenticate_api_request(app_handle.clone(), &authenticator).await {
            Ok(token) => token,
            Err(e) => {
                log::error!("Failed to authenticate API request: {:?}", e);
                return Err(format!("Failed to authenticate API request: {}", e));
            }
        };

    // Step 3: Call get_api_key_permissions with the JWT token
    log::info!("Step 3: Call get_api_key_permissions with the JWT token");
    let api_permissions_response = match get_api_key_permissions(jwt_token.clone())
        .await
    {
        Ok(api_permissions) => {
            log::info!("permissions validated successfully.");

            // Format the response
            format!(
                "can_view: {}\ncan_trade: {}\ncan_transfer: {}\nportfolio_uuid: {}\nportfolio_type: {}",
                api_permissions.can_view,
                api_permissions.can_trade,
                api_permissions.can_transfer,
                api_permissions.portfolio_uuid,
                api_permissions.portfolio_type
            )
        }
        Err(e) => {
            log::error!("Failed to get API key permissions: {:?}", e);
            return Err(format!("Failed to get API key permissions: {}", e));
        }
    };
    // Return combined response
    Ok(api_permissions_response)
}
/* ---------------------------------------------------------------------------------- */
