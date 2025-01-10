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
// Tauri
use tauri::{ AppHandle, Emitter, Wry };
// use tauri_plugin_store::StoreExt;
// Dependencies
use log::info;
// use serde_json::Value;
// Crates
use crate::coinbase::authenticate_api_request::Authenticator;
use crate::coinbase::authenticate_api_request::authenticate_api_request;
use crate::coinbase::api::products::list_products::list_products;

/* ---------------------------------------------------------------------------------------------- */

/// Function to load coinbase product list
#[tauri::command]
pub async fn coinbase_product_list(
  app_handle: AppHandle<Wry>,
  product_type: String
) -> Result<String, String> {
  info!("Command: coinbase_product_list\nParameter: product_type: {}", product_type);

  // product_type: SPOT, FUTURE, PERPETUAL

  // Determine the selected product type
  let selected_product_type = if product_type == "SPOT" { "SPOT" } else { "FUTURE" };

  info!("Selected Product Type: {}", selected_product_type.to_string());

  // Determine the selected contract expiry type
  let selected_contract_expiry_type = if product_type == "FUTURE" {
    Some("EXPIRING")
  } else if product_type == "PERPETUAL" {
    Some("PERPETUAL")
  } else {
    None
  };

  info!("Selected Contract Expiry Type: {:?}", selected_contract_expiry_type);

  // Determine the Request Path based on selected_product_type and selected_contract_expiry_type
  let selected_request_path = if product_type == "FUTURE" {
    "/api/v3/brokerage/products?product_type=FUTURE&contract_expiry_type=EXPIRING"
  } else if product_type == "PERPETUAL" {
    "/api/v3/brokerage/products?product_type=FUTURE&contract_expiry_type=PERPETUAL"
  } else {
    // "/api/v3/brokerage/products?product_type=SPOT&get_tradability_status"
    "?product_type=SPOT"
  };

  info!("Selected Request Path: {}", selected_request_path.to_string());

  // Create an instance of Authenticator
  let authenticator = Authenticator {
    request_method: "GET".to_string(),
    request_path: "/api/v3/brokerage/products?product_type=SPOT".to_string(),
    // request_path: selected_request_path.to_string(),
    // request_path: "/api/v3/brokerage/products".to_string(),
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
  let product_list = match
    list_products(
      // jwt_token
      jwt_token.clone(),
      // request_path
      selected_request_path.to_string()
    ).await
  {
    Ok(product_list) => { product_list }
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

  // // Serialize the grouped product list response into JSON
  // let serialized_data = serde_json
  //   ::to_value(&grouped_products)
  //   .map_err(|e| format!("Failed to serialize product data: {}", e))?;

  // // Save to Tauri store
  // store.set("products", serialized_data);

  // // Save the store and handle potential errors
  // if let Err(e) = store.save() {
  //   log::error!("Failed to save store to disk: {}", e);
  //   return Err(format!("Failed to save store to disk: {}", e));
  // }

  // Serialize product list response
  let coinbase_product_list_response = serde_json
    ::to_string_pretty(&grouped_products)
    .map_err(|e| format!("Failed to serialize product list: {}", e))?;

  app_handle
    .emit("coinbase_list_products_loaded", "Products loaded successfully")
    .map_err(|e| format!("Failed to emit event: {}", e))?;

  // Return the response
  Ok(coinbase_product_list_response)
}

/* ---------------------------------------------------------------------------------------------- */
