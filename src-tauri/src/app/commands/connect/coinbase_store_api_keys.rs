/* ---------------------------------------------------------------------------------------------- */
//! commands/coinbase/connect/store_api_keys.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - store_api_keys
/* ---------------------------------------------------------------------------------------------- */

// Tauri
use tauri::{ AppHandle, Wry };
use tauri_plugin_store::StoreExt;
// Dependencies
use log::{ error, info };
use serde_json::json;
use serde_json::to_string;
// Crates
use crate::coinbase::coinbase_authenticator::use_authenticator;
use crate::coinbase::coinbase_authenticator::Authenticator;
use crate::coinbase::structs::data_api::ApiKeyPermissions;
use crate::app::commands::connect::common::convert_api_secret::convert_api_secret;

/* ---------------------------------------------------------------------------------------------- */

/// Store the API keys in the app_apis store and get API key permissions
#[tauri::command]
pub async fn coinbase_store_api_keys(
  app_handle: AppHandle<Wry>,
  coinbase_api_key: String,
  coinbase_api_secret: String
) -> Result<String, String> {
  info!(
    "Command: store_api_keys\n
    coinbase_api_key: {}\n
    coinbase_api_secret: {}",
    coinbase_api_key,
    coinbase_api_secret
  );

  // Request Path
  let request_path = "/api/v3/brokerage/key_permissions";

  // Convert the API secret
  let formatted_api_secret = convert_api_secret(&coinbase_api_secret);
  info!("{}", formatted_api_secret.to_string());

  // initialize app_apis store
  info!("Initializing app_apis store");
  let store = app_handle.store("app_apis.json").map_err(|e| e.to_string())?;

  // Save the API keys to the store
  let mut coinbase = store.get("coinbase").unwrap_or(json!({}));
  coinbase["api_key"] = json!(coinbase_api_key);
  coinbase["api_key_secret"] = json!(formatted_api_secret);
  store.set("coinbase", coinbase);
  store.save().map_err(|e| e.to_string())?;
  info!("Coinbase API Keys Saved");

  // Create an instance of Authenticator with correct request method and path
  let authenticator = Authenticator {
    request_method: "GET".to_string(),
    // request_path: "/api/v3/brokerage/key_permissions".to_string(),
    request_path: request_path.to_string(),
  };

  // Generate JWT Token with the Authenticator
  let jwt_token = match use_authenticator(app_handle.clone(), &authenticator).await {
    Ok(token) => token,
    Err(e) => {
      error!("Failed to authenticate API request: {:?}", e);
      return Err(format!("Failed to authenticate API request: {}", e));
    }
  };

  log::info!("JWT Token: {:?}", jwt_token);

  // Call get_api_key_permissions with the JWT token
  let url = format!("https://api.coinbase.com{}", request_path);
  let client = reqwest::Client::new();

  // Make the request
  let response = client
    .get(url)
    .header("Content-Type", "application/json")
    .header("Authorization", format!("Bearer {}", jwt_token))
    .send().await;

  // Handle the response
  let api_permissions_response = match response {
    Ok(resp) => {
      if resp.status().is_success() {
        match resp.json::<ApiKeyPermissions>().await {
          Ok(api_permissions) => {
            info!("permissions validated successfully.");

            // Format the response using JSON serialization
            let api_permissions_response = to_string(&api_permissions).map_err(|e|
              format!("Failed to serialize API permissions: {}", e)
            )?;

            // Save the API permissions to the store
            let mut coinbase = store.get("coinbase").unwrap_or(json!({}));
            coinbase["api_configured"] = json!(true);
            coinbase["api_key"] = json!(coinbase_api_key);
            coinbase["api_key_secret"] = json!(formatted_api_secret);
            coinbase["api_permissions"] = json!(api_permissions);
            store.set("coinbase", coinbase);
            store.save().map_err(|e| e.to_string())?;
            info!("Coinbase API Permissions Saved");

            Ok(api_permissions_response)
          }
          Err(parse_err) => {
            log::error!("Failed to parse response body: {:?}", parse_err);
            Err("Error parsing response body".to_string())
          }
        }
      } else {
        let status = resp.status();
        let error_body = resp
          .text().await
          .unwrap_or_else(|_| "Unable to read error body".to_string());
        log::error!("Error: Status code: {:?}, Response: {:?}", status, error_body);
        Err(format!("Failed with status code: {:?}", status))
      }
    }
    Err(req_err) => {
      log::error!("Request error: {:?}", req_err);
      Err(format!("Failed to make the request: {:?}", req_err))
    }
  };

  api_permissions_response
}

/* ---------------------------------------------------------------------------------------------- */
