/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library - Backend
/* ---------------------------------------------------------------------------------------------- */
//! # Module: Store Apis Coinbase -> coinbase_save
/* ---------------------------------------------------------------------------------------------- */
//! #### Function:
//! * coinbase_save
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src-tauri/src/store/apis/coinbase/coinbase_save.rs
/* ---------------------------------------------------------------------------------------------- */

// Tauri
use tauri::AppHandle;
use tauri_plugin_store::StoreExt;
// Dependencies
use log::info;
use log::error;
use serde_json::json;
use serde_json::to_string;
// Crates
use crate::constants::{ API_LIST_STORE, COINBASE_STORE };
use crate::api::coinbase::coinbase_authenticator::use_authenticator;
use crate::api::coinbase::coinbase_authenticator::Authenticator;
use crate::api::coinbase::structs::data_api::ApiKeyPermissions;

/* ---------------------------------------------------------------------------------------------- */

/// Store Database Command configuration
pub async fn save_coinbase(
  app: AppHandle,
  coinbase_api_key: String,
  coinbase_api_secret: String
) -> Result<String, String> {
  info!("Initialize Coinbase store and API List store");
  // let api_list_store = app.store(API_LIST_STORE).map_err(|e| e.to_string())?;
  let coinbase_store = app.store(COINBASE_STORE).map_err(|e| e.to_string())?;

  info!(
    "Command: store_api_keys\ncoinbase_api_key: {}\ncoinbase_api_secret: {}",
    coinbase_api_key,
    coinbase_api_secret
  );

  let formatted_api_secret = convert_api_secret(&coinbase_api_secret);
  info!("{}", formatted_api_secret);

  let mut coinbase = coinbase_store.get("Coinbase").unwrap_or(json!({}));
  coinbase["api_key"] = json!(coinbase_api_key);
  coinbase["api_key_secret"] = json!(formatted_api_secret);
  coinbase_store.set("Coinbase", coinbase);
  coinbase_store.save().map_err(|e| e.to_string())?;
  info!("Coinbase API Keys Saved");

  let request_path = "/api/v3/brokerage/key_permissions";
  let authenticator = Authenticator {
    request_method: "GET".to_string(),
    request_path: request_path.to_string(),
  };

  let jwt_token = use_authenticator(app.clone(), &authenticator).await.map_err(|e| {
    error!("Failed to authenticate API request: {:?}", e);
    format!("Failed to authenticate API request: {}", e)
  })?;

  log::info!("JWT Token: {:?}", jwt_token);

  let url = format!("https://api.coinbase.com{}", request_path);
  let client = reqwest::Client::new();
  let response = client
    .get(url)
    .header("Content-Type", "application/json")
    .header("Authorization", format!("Bearer {}", jwt_token))
    .send().await;

  match response {
    Ok(resp) if resp.status().is_success() => {
      let api_permissions = resp.json::<ApiKeyPermissions>().await.map_err(|e| {
        error!("Failed to parse response body: {:?}", e);
        "Error parsing response body".to_string()
      })?;

      info!("permissions validated successfully.");
      let api_permissions_response = to_string(&api_permissions).map_err(|e| {
        format!("Failed to serialize API permissions: {}", e)
      })?;

      // Save the API keys to the store
      save_api_keys_to_coinbase_store(
        &app,
        &coinbase_api_key,
        &formatted_api_secret,
        api_permissions
      )?;
      // Update the API List store
      update_api_list_store(&app)?;

      Ok(api_permissions_response)
    }
    Ok(resp) => {
      let status = resp.status();
      let error_body = resp
        .text().await
        .unwrap_or_else(|_| "Unable to read error body".to_string());
      error!("Error: Status code: {:?}, Response: {:?}", status, error_body);
      Err(format!("Failed with status code: {:?}", status))
    }
    Err(req_err) => {
      error!("Request error: {:?}", req_err);
      Err(format!("Failed to make the request: {:?}", req_err))
    }
  }
}

/* ---------------------------------------------------------------------------------------------- */

/// Function to convert an EC private key from SEC1 PEM format to PKCS8 PEM format
fn convert_api_secret(api_secret: &str) -> String {
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

/// Function to save the API keys to the Coinbase store
fn save_api_keys_to_coinbase_store(
  app: &AppHandle,
  coinbase_api_key: &str,
  formatted_api_secret: &str,
  api_permissions: ApiKeyPermissions
) -> Result<(), String> {
  // let api_list_store = app.store(API_LIST_STORE).map_err(|e| e.to_string())?;
  let coinbase_store = app.store(COINBASE_STORE).map_err(|e| e.to_string())?;

  let mut coinbase = coinbase_store.get("Coinbase").unwrap_or(json!({}));
  coinbase["api_configured"] = json!(true);
  coinbase["api_key"] = json!(coinbase_api_key);
  coinbase["api_key_secret"] = json!(formatted_api_secret);
  coinbase["api_permissions"] = json!(api_permissions);
  coinbase_store.set("Coinbase", coinbase);
  coinbase_store.save().map_err(|e| e.to_string())?;
  info!("Coinbase API Permissions Saved");

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */

/// Function to update the API List store
fn update_api_list_store(app: &AppHandle) -> Result<(), String> {
  let api_list_store = app.store(API_LIST_STORE).map_err(|e| e.to_string())?;

  let mut api_list = api_list_store.get("Broker").unwrap_or(json!({}));
  api_list["coinbase"] = json!(true);
  api_list_store.set("Broker", api_list);
  api_list_store.save().map_err(|e| e.to_string())?;
  info!("API List Store Updated: Coinbase True");

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
