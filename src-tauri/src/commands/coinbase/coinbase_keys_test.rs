//! # ChartBuddha library
//!
//! - Module: Coinbase - Keys Save
//! - Description: Save the keys for the Coinbase API.
//!
//! ### Functions
//! - `coinbase_keys_save`
//!
//! ##### commands/coinbase/coinbase_keys_save.rs
//
// Rust
// Tauri
// use serde_json::json;
use tauri::{AppHandle, Wry};
// use tauri_plugin_store::StoreExt;
// Local Dependencies
use crate::apis::coinbase::data_api::get_api_key_permissions::get_api_key_permissions;
use crate::providers::coinbase::authenticator::authenticate_api_request;
use crate::providers::coinbase::authenticator::Authenticator;
//
/* ---------------------------------- < Function > ---------------------------------- */
/// Function to test the connection to the Coinbase API
#[tauri::command]
pub async fn coinbase_keys_test(app_handle: AppHandle<Wry>) -> Result<String, String> {
    // Step 1: Create an instance of Authenticator
    log::info!("coinbase_keys_test.rs | Step 1: Create an instance of Authenticator");
    let authenticator = Authenticator {
        request_method: "GET".to_string(),
        request_path: "/api/v3/brokerage/key_permissions".to_string(),
    };

    // Step 2: Generate JWT Token
    log::info!("coinbase_keys_test.rs | Step 2: Generate JWT Token");
    let jwt_token =
        match authenticate_api_request(app_handle.clone(), &authenticator).await {
            Ok(token) => token,
            Err(e) => {
                log::error!("Failed to authenticate API request: {:?}", e);
                return Err(format!("Failed to authenticate API request: {}", e));
            }
        };

    // Step 3: Call get_api_key_permissions with the JWT token
    log::info!("coinbase_keys_test.rs | Step 3: Call get_api_key_permissions with the JWT token");
    match get_api_key_permissions(jwt_token).await {
        Ok(api_permissions) => {
            log::info!("permissions validated successfully.");

            // Return success message
            Ok(format!("{:?}", api_permissions))
        }
        Err(e) => {
            log::error!("Failed to get API key permissions: {:?}", e);
            Err(format!("Failed to get API key permissions: {}", e))
        }
    }
}
/* ---------------------------------- < End--Code >---------------------------------- */
