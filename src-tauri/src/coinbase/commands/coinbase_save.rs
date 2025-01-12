/* ------------------------------------------------------------------------------------------------------------------ */
//! # coinbase_save.rs
//!
//! Command: Save and Test Coinbase Api keys.
/* ------------------------------------------------------------------------------------------------------------------ */
//! ### Functions
//! - coinbase_save
/* ------------------------------------------------------------------------------------------------------------------ */

// Tauri
use tauri::{ AppHandle, Wry };
use tauri_plugin_store::StoreExt;
// Dependencies
use log::{ info, error };
use serde_json::json;
// use serde_json::Value;
// Crates
use crate::coinbase::authenticate_api_request::authenticate_api_request;
use crate::coinbase::authenticate_api_request::Authenticator;
use crate::coinbase::api::data_api::get_api_key_permissions::get_api_key_permissions;

/* ------------------------------------------------------------------------------------------------------------------ */

/// Function to convert an EC private key from SEC1 PEM format to PKCS8 PEM format
pub fn convert_api_secret(api_secret: &str) -> String {
  let mut formatted_secret = api_secret.replace("\\n", "\n");
  formatted_secret = formatted_secret
    .replace("-----BEGIN EC PRIVATE KEY-----", "-----BEGIN PRIVATE KEY-----")
    .replace("-----END EC PRIVATE KEY-----", "-----END PRIVATE KEY-----");
  formatted_secret = format!(
    "-----BEGIN PRIVATE KEY-----\n{}\n-----END PRIVATE KEY-----\n",
    formatted_secret
      .replace("-----BEGIN PRIVATE KEY-----", "")
      .replace("-----END PRIVATE KEY-----", "")
      .replace("\n", "")
      .chars()
      .collect::<Vec<_>>()
      .chunks(64)
      .map(|chunk| chunk.iter().collect::<String>())
      .collect::<Vec<_>>()
      .join("\n")
  );
  formatted_secret
}

/* ------------------------------------------------------------------------------------------------------------------ */

/// Function to test the connection to the Coinbase API
#[tauri::command]
pub async fn coinbase_save(
  app_handle: AppHandle<Wry>,
  coinbase_api_key: String, // Use snake_case key
  coinbase_api_secret: String // Use snake_case key
) -> Result<String, String> {
  info!(
    "Command: coinbase_product_list\n
    coinbase_api_key: {}\n
    coinbase_api_secret: {}",
    coinbase_api_key,
    coinbase_api_secret
  );

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
    request_path: "/api/v3/brokerage/key_permissions".to_string(),
  };

  // Generate JWT Token with the Authenticator
  let jwt_token = match authenticate_api_request(app_handle.clone(), &authenticator).await {
    Ok(token) => token,
    Err(e) => {
      error!("Failed to authenticate API request: {:?}", e);
      return Err(format!("Failed to authenticate API request: {}", e));
    }
  };

  log::info!("JWT Token: {:?}", jwt_token);

  // Call get_api_key_permissions with the JWT token
  let api_permissions_response = match get_api_key_permissions(jwt_token.clone()).await {
    Ok(api_permissions) => {
      info!("permissions validated successfully.");

      // Format the response
      let api_permissions_response = format!(
        "can_view: {}\ncan_trade: {}\ncan_transfer: {}\nportfolio_uuid: {}\nportfolio_type: {}",
        api_permissions.can_view,
        api_permissions.can_trade,
        api_permissions.can_transfer,
        api_permissions.portfolio_uuid,
        api_permissions.portfolio_type
      );

      // Save the API permissions to the store
      let mut coinbase = store.get("coinbase").unwrap_or(json!({}));
      coinbase["api_configured"] = json!(true);
      coinbase["api_key"] = json!(coinbase_api_key);
      coinbase["api_key_secret"] = json!(formatted_api_secret);
      coinbase["api_permissions"] =
        json!({
        "perm_can_view": api_permissions.can_view,
        "perm_can_trade": api_permissions.can_trade,
        "perm_can_transfer": api_permissions.can_transfer,
        "perm_portfolio_uuid": api_permissions.portfolio_uuid,
        "perm_portfolio_type": api_permissions.portfolio_type
      });
      store.set("coinbase", coinbase);
      store.save().map_err(|e| e.to_string())?;
      info!("Coinbase API Permissions Saved");

      Ok(api_permissions_response)
    }
    Err(e) => {
      error!("Failed to get API key permissions: {:?}", e);
      store.reset();
      Err(format!("Failed to get API key permissions: {}", e))
    }
  };

  api_permissions_response
}

/* ------------------------------------------------------------------------------------------------------------------ */
