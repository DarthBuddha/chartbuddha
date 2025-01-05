//! # Coinbase Get Selected Product
//!
//! ### Functions
//! - coinbase_get_selected_product
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// Rust
// use std::collections::HashMap;
// Tauri
use tauri::{ AppHandle, Wry };
use tauri_plugin_store::StoreExt;
// Local
use crate::apis::coinbase::coinbase_authenticator::authenticate_api_request;
use crate::apis::coinbase::coinbase_authenticator::Authenticator;
use crate::apis::coinbase::products::get_product::get_product;
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
/// Function to test the connection to the Coinbase API
#[tauri::command]
pub async fn coinbase_get_selected_product(app_handle: AppHandle<Wry>, product_id: String) -> Result<String, String> {
  // Step 1: Create an instance of Authenticator
  let authenticator = Authenticator {
    request_method: "GET".to_string(),
    request_path: format!("/api/v3/brokerage/products/{}", product_id),
  };

  // Step 2: Generate JWT Token
  let jwt_token = match authenticate_api_request(app_handle.clone(), &authenticator).await {
    Ok(token) => token,
    Err(e) => {
      log::error!("Failed to authenticate API request: {:?}", e);
      return Err(format!("Failed to authenticate API request: {}", e));
    }
  };

  // Step 3: Call get_product with the JWT token
  let product = match get_product(jwt_token, &product_id, Some(true)).await {
    Ok(product) => {
      log::info!("Product successfully retrieved.");
      product
    }
    Err(e) => {
      log::error!("Failed to get Product: {:?}", e);
      return Err(format!("Failed to get Product: {}", e));
    }
  };

  // Serialize the product response into JSON
  let serialized_data = serde_json::to_value(&product).map_err(|e| format!("Failed to serialize product data: {}", e))?;

  // Save to Tauri store
  let store_interface = app_handle.store(".interface.json").map_err(|e| e.to_string())?;
  store_interface.set("selectedProduct", serialized_data);

  // Save the store and handle potential errors
  if let Err(e) = store_interface.save() {
    log::error!("Failed to save store to disk: {}", e);
    return Err(format!("Failed to save store to disk: {}", e));
  }

  // log::info!("Product data successfully saved.");

  // Serialize product response
  let product_response = serde_json
    ::to_string_pretty(&product)
    .map_err(|e| format!("Failed to serialize product: {}", e))?;

  // Return product response
  Ok(product_response)
}
//
/* ------------------------------------------------------------------------------------------------------------------ */