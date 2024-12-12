//! # ChartBuddha library
//!
//! - Module: Save Coinbase Keys
//! - Description: Test the connection with the Coinbase API Keys and save the keys.
//!
//! ### Functions
//! - `coinbase_test_connection`
//! - `convert_api_secret`
//!
//! ##### interface/connect/coinbase_test_connection.rs
//
// Local Dependencies
// use crate::apis::coinbase::data_api::get_api_key_permissions::get_api_key_permissions;
use crate::apis::coinbase::data_api::get_api_key_permissions::get_api_key_permissions;
use crate::providers::coinbase::authenticator::authenticate_api_request;
use crate::providers::coinbase::authenticator::Authenticator;
use crate::providers::coinbase::credentials::CoinbaseCredentials;
//
/* ---------------------------------- < Function > ---------------------------------- */
/// Function to test the connection to the Coinbase API
#[tauri::command]
pub async fn coinbase_save_keys(
    api_key: String,
    api_secret: String,
) -> Result<String, String> {
    // Step 1: Convert the API Secret
    let converted_secret = convert_api_secret(&api_secret)?;

    // Step 2: Create a new instance of the Credentials struct
    let credentials = CoinbaseCredentials {
        provider: "coinbase".to_string(),
        api_key: api_key.to_string(),
        api_secret: converted_secret,
    };

    // Step 3: Save the credentials to a file
    credentials.save()?;

    // Step 4: Create an instance of Authenticator
    let authenticator = Authenticator {
        api_key: api_key.clone(),
        api_secret: api_secret.clone(),
        request_method: "GET".to_string(),
        request_path: "/api/v3/brokerage/key_permissions".to_string(),
    };

    // Step 5: Generate JWT Token
    let jwt_token = match authenticate_api_request(&authenticator).await {
        Ok(token) => token,
        Err(e) => {
            log::error!("Failed to authenticate API request: {:?}", e);
            return Err(format!("Failed to authenticate API request: {}", e));
        }
    };

    // Step 6: Call get_api_key_permissions with the JWT token
    match get_api_key_permissions(jwt_token).await {
        Ok(api_permissions) => {
            log::info!("API Key Permissions: {:?}", api_permissions);

            // Return success message
            Ok("API keys saved and permissions validated successfully.".to_string())
        }
        Err(e) => {
            log::error!("Failed to get API key permissions: {:?}", e);
            Err(format!("Failed to get API key permissions: {}", e))
        }
    }
}

//
/* ---------------------------------- < Function > ---------------------------------- */
/// Function to convert an EC private key from SEC1 PEM format to PKCS8 PEM format
pub fn convert_api_secret(api_secret: &str) -> Result<String, String> {
    // Replace escaped newlines (in case of JSON saved with "\\n") with actual newlines
    let mut api_secret = api_secret.replace("\\n", "\n");

    // Convert the headers and footers if needed
    api_secret = api_secret
        .replace("-----BEGIN EC PRIVATE KEY-----", "-----BEGIN PRIVATE KEY-----")
        .replace("-----END EC PRIVATE KEY-----", "-----END PRIVATE KEY-----");

    // Format the key into proper PEM with newlines
    // Insert line breaks where appropriate for PEM format
    let formatted_secret = format!(
        "-----BEGIN PRIVATE KEY-----\n{}\n-----END PRIVATE KEY-----\n",
        api_secret
            .replace("-----BEGIN PRIVATE KEY-----", "")
            .replace("-----END PRIVATE KEY-----", "")
            .replace("\n", "") // Remove any existing line breaks to standardize
            .as_bytes()
            .chunks(64) // PEM typically splits the content every 64 characters
            .map(|chunk| String::from_utf8_lossy(chunk))
            .collect::<Vec<_>>()
            .join("\n")
    );

    Ok(formatted_secret)
}
//
/* ---------------------------------- < End--Code > ---------------------------------- */
