//! Coinbase Authenticator
//! Authenticator for the Coinbase provider.
//!
//! ### Functions
//! - `authenticate_api_request`
//!
/* ---------------------------------------------------------------------------------- */
//
// Rust
use std::error::Error;
use std::time::{SystemTime, UNIX_EPOCH};
// Tauri
use tauri::{AppHandle, Wry};
use tauri_plugin_store::StoreExt;
// Dependencies
use jsonwebtoken::{encode, EncodingKey, Header};
use rand::{distributions::Alphanumeric, Rng};
use serde::{Deserialize, Serialize};
//
/* ---------------------------------------------------------------------------------- */
/// Struct to represent the Authenticator
#[derive(Debug, Serialize, Deserialize)]
pub struct Authenticator {
    // pub api_key: String,
    // pub api_secret: String,
    pub request_method: String,
    pub request_path: String,
}
/* ---------------------------------------------------------------------------------- */
/// Claims for JWT token
#[derive(Debug, Serialize)]
struct Claims {
    iss: String,
    sub: String,
    nbf: u64,
    exp: u64,
    uri: String,
    nonce: String,
}
//
/* ---------------------------------------------------------------------------------- */
/// Authenticate the API request by generating a JWT token
#[tauri::command]
pub async fn authenticate_api_request(
    app_handle: AppHandle<Wry>,
    authenticator: &Authenticator,
) -> Result<String, Box<dyn Error + Send + Sync>> {
    const PAGE: &str = "authenticator.rs";
    // Step 1: Load API key and secret from the store
    log::info!("{} | Step 1: Load API key and secret from the store", PAGE);
    let store = app_handle.store(".providers.json").map_err(|e| e.to_string())?;
    let api_key: String = store
        .get("coinbase.api_key")
        .expect("Failed to get value from store")
        .as_str()
        .expect("Failed to convert value to string")
        .to_string();
    let api_secret: String = store
        .get("coinbase.api_secret")
        .expect("Failed to get value from store")
        .as_str()
        .expect("Failed to convert value to string")
        .to_string();

    // Convert the API Secret to Ensure Proper PEM Format
    // (Replace `\n` with actual newlines)
    let api_secret = api_secret.replace("\\n", "\n");

    // Log the API Secret Before Using It
    log::info!("{} | Step 2: API Key: \n{}", PAGE, api_key);

    // Log the API Secret Before Using It
    log::info!("{} | Step 3: API Secret after conversion: \n{}", PAGE, api_secret);

    // Get the current UNIX time
    log::info!("{} | Step 4: current UNIX time", PAGE);
    let now = match SystemTime::now().duration_since(UNIX_EPOCH) {
        Ok(duration) => duration.as_secs(),
        Err(e) => {
            log::error!("Failed to get current time: {:?}", e);
            return Err("Failed to get current time".into());
        }
    };

    // Generate a random nonce
    log::info!("{} | Step 5: Generate a random nonce", PAGE);
    let nonce: String = rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(16)
        .map(char::from)
        .collect();

    // Define claims for JWT
    log::info!("{} | Step 6: Define claims for JWT", PAGE);
    let uri = format!(
        "{} {}{}",
        &authenticator.request_method, "api.coinbase.com", &authenticator.request_path
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
    log::info!(
        "{} | Step 7: Define the JWT header with the appropriate algorithm and key ID",
        PAGE
    );
    let mut header = Header::new(jsonwebtoken::Algorithm::ES256);
    header.kid = Some(api_key.to_string());

    // Convert EC private key from PEM format to EncodingKey
    log::info!(
        "{} | Step 8: Convert EC private key from PEM format to EncodingKey",
        PAGE
    );
    let encoding_key = match EncodingKey::from_ec_pem(api_secret.as_bytes()) {
        Ok(key) => key,
        Err(e) => {
            log::error!("Failed to parse EC private key: {:?}", e);
            return Err("Failed to parse EC private key".into());
        }
    };

    // Encode JWT token
    log::info!("{} | Step 9: Encode JWT token", PAGE);
    match encode(&header, &claims, &encoding_key) {
        Ok(token) => Ok(token),
        Err(e) => {
            log::error!("Failed to encode JWT: {:?}", e);
            Err("Failed to encode JWT".into())
        }
    }
}
//
/* ---------------------------------------------------------------------------------- */
