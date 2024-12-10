//! # ChartBuddha library
//! - Module: `authenticator`
//! - Description: Authenticator for the Coinbase provider.
//! ### Functions
//! - `authenticate_api_request`
//! ##### provider/coinbase/authenticator.rs
//
// Library Dependencies
use jsonwebtoken::{encode, EncodingKey, Header};
use log;
use rand::{distributions::Alphanumeric, Rng};
use serde::{Deserialize, Serialize};
use std::error::Error;
use std::time::{SystemTime, UNIX_EPOCH};
// Local Dependencies
use crate::providers::coinbase::credentials::CoinbaseCredentials;
//
/* ----------------------------------- < Struct > ----------------------------------- */
/// Struct to represent the Authenticator
#[derive(Debug, Serialize, Deserialize)]
pub struct Authenticator {
    pub api_key: String,
    pub api_secret: String,
    pub request_method: String,
    pub request_path: String,
}
/* ----------------------------------- < Struct > ----------------------------------- */
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
/* ---------------------------------- < Function > ---------------------------------- */
/// Authenticate the API request by generating a JWT token
#[tauri::command]
pub async fn authenticate_api_request(
    authenticator: &Authenticator,
) -> Result<String, Box<dyn Error + Send + Sync>> {
    // Load Credentials
    let credentials = CoinbaseCredentials::load()?;
    let api_key = credentials.api_key;
    let mut api_secret = credentials.api_secret;

    // Convert the API Secret to Ensure Proper PEM Format (Replace `\n` with actual newlines)
    api_secret = api_secret.replace("\\n", "\n");

    // Log the API Secret Before Using It
    log::info!("API Secret after conversion: \n{}", api_secret);

    // Get the current UNIX time
    let now = match SystemTime::now().duration_since(UNIX_EPOCH) {
        Ok(duration) => duration.as_secs(),
        Err(e) => {
            log::error!("Failed to get current time: {:?}", e);
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
    let mut header = Header::new(jsonwebtoken::Algorithm::ES256);
    header.kid = Some(api_key.to_string());

    // Convert EC private key from PEM format to EncodingKey
    let encoding_key = match EncodingKey::from_ec_pem(api_secret.as_bytes()) {
        Ok(key) => key,
        Err(e) => {
            log::error!("Failed to parse EC private key: {:?}", e);
            return Err("Failed to parse EC private key".into());
        }
    };

    // Encode JWT token
    match encode(&header, &claims, &encoding_key) {
        Ok(token) => Ok(token),
        Err(e) => {
            log::error!("Failed to encode JWT: {:?}", e);
            Err("Failed to encode JWT".into())
        }
    }
}
//
/* ---------------------------------- < End--Code >---------------------------------- */
