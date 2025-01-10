/* ---------------------------------------------------------------------------------------------- */
//! # get_server_time.rs
//!
//! Get the current time from the Coinbase Advanced API.
/* ---------------------------------------------------------------------------------------------- */
//! ### Structs
//! - ServerTimeResponse
//! - ErrorResponse
//! - Detail
//!
//! ### Functions
//! - get_server_time
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::str::FromStr;
// Dependencies
use reqwest::Client;
use serde::de::{ self, Deserializer };
use serde::{ Deserialize, Serialize };

/* ---------------------------------------------------------------------------------------------- */

/// Deserialize a numeric string into a numeric type.
fn deserialize_numeric<'de, D, T>(deserializer: D) -> Result<T, D::Error>
  where D: Deserializer<'de>, T: FromStr, T::Err: std::fmt::Display
{
  let s = String::deserialize(deserializer)?;
  s.parse::<T>().map_err(de::Error::custom)
}

/* ---------------------------------------------------------------------------------------------- */

/// ServerTimeResponse struct for the Coinbase API
#[derive(Debug, Serialize, Deserialize)]
pub struct ServerTimeResponse {
  pub iso: String, // ISO-8601 representation of the timestamp

  #[serde(rename(deserialize = "epochSeconds"))]
  #[serde(deserialize_with = "deserialize_numeric")]
  pub epoch_seconds: u64, // Convert the string field to u64

  #[serde(rename(deserialize = "epochMillis"))]
  #[serde(deserialize_with = "deserialize_numeric")]
  pub epoch_millis: u64, // Convert the string field to u64
}

/// ErrorResponse struct for the Coinbase API
#[derive(Debug, Serialize, Deserialize)]
pub struct ErrorResponse {
  pub error: String, // General error description
  pub code: i32, // Error code (int32)
  pub message: String, // Error message describing the issue
  pub details: Vec<Detail>, // Array of details (if any)
}

/// Detail struct for the ErrorResponse
#[derive(Debug, Serialize, Deserialize)]
pub struct Detail {
  pub type_url: String, // URL representing the type of serialized protocol buffer message
  pub value: Vec<u8>, // Serialized protocol buffer of the above type
}

/* ---------------------------------------------------------------------------------------------- */

/// Get the current time from the Coinbase Advanced API.
pub async fn get_server_time() -> Result<ServerTimeResponse, Box<dyn std::error::Error>> {
  let url = "https://api.coinbase.com/api/v3/brokerage/time";
  let client = Client::new();
  let response = client.get(url).header("Content-Type", "application/json").send().await?;

  // Log the raw response body for debugging
  let raw_body = response.text().await?;
  log::info!("Raw response body: {}", raw_body);

  // Attempt to deserialize the raw body
  let server_time: ServerTimeResponse = serde_json::from_str(&raw_body)?;
  Ok(server_time)
}

/* ---------------------------------------------------------------------------------------------- */
