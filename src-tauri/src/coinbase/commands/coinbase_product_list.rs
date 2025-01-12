/* ---------------------------------------------------------------------------------------------- */
//! # coinbase_product_list.rs
//!
//! Command: List Coinbase Products.
/* ---------------------------------------------------------------------------------------------- */
//! ### Functions
//! - coinbase_product_list
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::collections::HashMap;
use tauri::Emitter;
// Tauri
use tauri::{ AppHandle, Wry };
// Dependencies
use log::info;
// Crates
use crate::coinbase::authenticate_api_request::Authenticator;
use crate::coinbase::authenticate_api_request::authenticate_api_request;
use crate::coinbase::api::products::list_products::list_products;

/* ---------------------------------------------------------------------------------------------- */

/// Function to load coinbase product list
#[tauri::command]
pub async fn coinbase_product_list(app_handle: AppHandle<Wry>, product_type: String) -> Result<String, String> {
  info!("Command: coinbase_product_list\nParameter: product_type: {}", product_type);

  // Determine the selected request path based on product type
  let selected_request_path = match product_type.as_str() {
    "future" => "/api/v3/brokerage/products?product_type=FUTURE&contract_expiry_type=EXPIRING",
    "perps" => "/api/v3/brokerage/products?product_type=FUTURE&contract_expiry_type=PERPETUAL",
    _ =>
      "/api/v3/brokerage/products?product_type=SPOT&expiring_contract_status=STATUS_UNEXPIRED&get_tradability_status",
  };

  info!("Selected Request Path: {}", selected_request_path);

  // Create an instance of Authenticator
  let authenticator = Authenticator {
    request_method: "GET".to_string(),
    request_path: "/api/v3/brokerage/products".to_string(),
    // request_path: selected_request_path.to_string(),
  };

  // Generate JWT Token
  let jwt_token = match authenticate_api_request(app_handle.clone(), &authenticator).await {
    Ok(token) => token,
    Err(e) => {
      log::error!("Failed to authenticate API request: {:?}", e);
      return Err(format!("Failed to authenticate API request: {}", e));
    }
  };

  log::info!("JWT Token: {:?}", jwt_token);

  // Call list_products with the JWT token
  let product_list = match list_products(jwt_token.clone(), selected_request_path.to_string()).await {
    Ok(product_list) => product_list,
    Err(e) => {
      log::error!("Failed to get Product List: {:?}", e);
      return Err(format!("Failed to get Product List: {}", e));
    }
  };

  // Group products by SPOT, FUTURE, and PERPS
  let mut grouped_products: HashMap<String, Vec<_>> = HashMap::new();
  for product in product_list.products.clone() {
    let product_type = product.product_type.clone().unwrap_or_else(|| "unknown".to_string());
    let status = product.status.clone();

    let group = if product_type == "SPOT" {
      "SPOT"
    } else if product_type == "FUTURE" && status == "STANDARD" {
      "PERPS"
    } else if product_type == "FUTURE" && status.is_empty() {
      "FUTURE"
    } else {
      "unknown"
    };

    grouped_products.entry(group.to_string()).or_default().push(product);
  }

  // Serialize product list response
  let response = serde_json
    ::to_string_pretty(&grouped_products)
    .map_err(|e| format!("Failed to serialize product list: {}", e))?;

  app_handle
    .emit("coinbase_list_products_loaded", "Products loaded successfully")
    .map_err(|e| format!("Failed to emit event: {}", e))?;

  log::info!("{}", response);

  // Return the response
  Ok(response)
}

/* ---------------------------------------------------------------------------------------------- */
