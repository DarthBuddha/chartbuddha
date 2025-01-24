/* ---------------------------------------------------------------------------------------------- */
//! # Module: Broker Coinbase - coinbase_authenticator
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * use_authenticator
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: broker/coinbase/coinbase_authenticator.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::error::Error;
use std::time::{SystemTime, UNIX_EPOCH};
// Tauri
use tauri::AppHandle;
use tauri_plugin_store::StoreExt;
// Dependencies
use jsonwebtoken::{encode, EncodingKey, Header};
use log::error;
use log::info;
use rand::{distributions::Alphanumeric, Rng};
use serde::Deserialize;
use serde::Serialize;
use serde_json::Value;
// Crates
use crate::app::store::store_manager::APIS_STORE;

/* ---------------------------------------------------------------------------------------------- */

/// Struct: Authenticator
#[derive(Debug, Serialize, Deserialize)]
pub struct Authenticator {
  pub request_method: String,
  pub request_path: String,
}

/// Struct: Claims for JWT token
#[derive(Debug, Serialize)]
pub struct Claims {
  pub iss: String,
  pub sub: String,
  pub nbf: u64,
  pub exp: u64,
  pub uri: String,
  pub nonce: String,
}

/* ---------------------------------------------------------------------------------------------- */

/// Authenticate the API request by generating a JWT token
pub async fn use_authenticator(
  app: AppHandle,
  authenticator: &Authenticator,
) -> Result<String, Box<dyn Error + Send + Sync>> {
  info!("Get API key and secret from apis store...");
  let store = app.store(APIS_STORE).map_err(|e| {
    error!("Failed to get store: {}", e);
    Box::<dyn Error + Send + Sync>::from(e)
  })?;

  let coinbase: Value = store
    .get("coinbase")
    .expect("Failed to get value from store");

  let api_key: String = coinbase
    .get("api_key")
    .expect("Failed to get api_key from coinbase object")
    .as_str()
    .expect("Failed to convert api_key to string")
    .to_string();

  let api_secret: String = coinbase
    .get("api_key_secret")
    .expect("Failed to get api_secret from coinbase object")
    .as_str()
    .expect("Failed to convert api_secret to string")
    .to_string();

  // Convert the API Secret to Ensure Proper PEM Format
  let api_secret = api_secret.to_string().replace("\\n", "\n");

  // Get the current UNIX time
  let now = match SystemTime::now().duration_since(UNIX_EPOCH) {
    Ok(duration) => duration.as_secs(),
    Err(e) => {
      error!("Failed to get current time: {:?}", e);
      return Err("Failed to get current time".into());
    }
  };

  // Generate a random nonce
  let nonce: String = rand::thread_rng()
    .sample_iter(&Alphanumeric)
    .take(16)
    .map(char::from)
    .collect();

  // Define claims for JWT
  let uri = format!(
    "{} {}{}",
    &authenticator.request_method.to_string(),
    "api.coinbase.com",
    &authenticator.request_path.to_string()
  );
  let claims = Claims {
    iss: "cdp".to_string(),
    sub: api_key.clone(),
    nbf: now,
    exp: now + 120, // Token is valid for 2 minutes
    uri,
    nonce,
  };

  // Define the JWT header with the appropriate algorithm and key ID
  let mut header = Header::new(jsonwebtoken::Algorithm::ES256);
  header.kid = Some(api_key.to_string());

  // Convert EC private key from PEM format to EncodingKey
  let encoding_key = match EncodingKey::from_ec_pem(api_secret.as_bytes()) {
    Ok(key) => key,
    Err(e) => {
      error!("Failed to parse EC private key: {:?}", e);
      return Err("Failed to parse EC private key".into());
    }
  };

  // Encode JWT token
  match encode(&header, &claims, &encoding_key) {
    Ok(token) => Ok(token),
    Err(e) => {
      error!("Failed to encode JWT: {:?}", e);
      Err("Failed to encode JWT".into())
    }
  }
}

/* ---------------------------------------------------------------------------------------------- */
