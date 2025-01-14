/* ------------------------------------------------------------------------------------------------------------------ */
//! commands/coinbase/connect/convert_api_secret.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Functions
//! - convert_api_secret
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
