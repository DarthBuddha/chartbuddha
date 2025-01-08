/* ---------------------------------------------------------------------------------------------- */
//! # coinbase_connect_api_save.rs
//!
//! Command: Save and Test Coinbase Api keys.
/* ---------------------------------------------------------------------------------------------- */
//! ### Functions
//! - coinbase_connect_api_save
/* ---------------------------------------------------------------------------------------------- */

// Rust
use serde::Serialize;
// Tauri
use tauri::{ AppHandle, Wry };
use tauri_plugin_store::StoreExt;
// Dependencies
use log::{ info, error };
use serde_json::json;
// use serde_json::Value;
// Crates
use crate::coinbase::coinbase_authenticator::authenticate_api_request;
use crate::coinbase::coinbase_authenticator::Authenticator;
use crate::coinbase::api::get_api_key_permissions::get_api_key_permissions;

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent the Product Data
#[derive(Serialize)]
pub struct CoinbaseProductData {
  product_id: String,
  product_type: Option<String>,
  quote_currency_id: Option<String>,
  base_currency_id: Option<String>,
  display_name: String,
}

/* ---------------------------------------------------------------------------------------------- */

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

/* ---------------------------------------------------------------------------------------------- */

/// Function to test the connection to the Coinbase API
#[tauri::command(rename_all = "snake_case")]
pub async fn coinbase_connect_api_save(
  app_handle: AppHandle<Wry>,
  api_key: String,
  api_secret: String
) -> Result<String, String> {
  // initialize app_apis store
  info!("Initializing app_apis store");
  let store = app_handle.store("app_apis.json").map_err(|e| e.to_string())?;

  // Convert the API secret
  let formatted_api_secret = convert_api_secret(&api_secret);
  info!("{}", formatted_api_secret.to_string());

  // Save the API keys to the store
  let mut coinbase = store.get("coinbase").unwrap_or(json!({}));
  coinbase["api_key"] = json!(api_key);
  coinbase["api_secret"] = json!(formatted_api_secret);
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
      coinbase["perm_can_view"] = json!(api_permissions.can_view);
      coinbase["perm_can_trade"] = json!(api_permissions.can_trade);
      coinbase["perm_can_transfer"] = json!(api_permissions.can_transfer);
      coinbase["perm_portfolio_uuid"] = json!(api_permissions.portfolio_uuid);
      coinbase["perm_portfolio_type"] = json!(api_permissions.portfolio_type);
      store.set("coinbase", coinbase);
      store.save().map_err(|e| e.to_string())?;
      info!("Coinbase API Permissions Saved");

      api_permissions_response
    }
    Err(e) => {
      error!("Failed to get API key permissions: {:?}", e);
      store.reset();
      return Err(format!("Failed to get API key permissions: {}", e));
    }
  };

  Ok(api_permissions_response)
}

/* ---------------------------------------------------------------------------------------------- */
