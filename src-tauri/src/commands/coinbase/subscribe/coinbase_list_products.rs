//! # Coinbase List Products
//!
//! ### Functions
//! - coinbase_load_product_list
//!
/* ---------------------------------------------------------------------------------- */
//
// Rust
use std::collections::HashMap;
// Tauri
use tauri::{AppHandle, Emitter, Wry};
use tauri_plugin_store::StoreExt;
// Local
use crate::apis::coinbase::coinbase_authenticator::authenticate_api_request;
use crate::apis::coinbase::coinbase_authenticator::Authenticator;
use crate::apis::coinbase::products::list_products::list_products;
//
/* ---------------------------------------------------------------------------------- */
/// Function to test the connection to the Coinbase API
#[tauri::command]
pub async fn coinbase_list_products(
    app_handle: AppHandle<Wry>,
) -> Result<String, String> {
    // Step 1: Create an instance of Authenticator
    log::info!("Step 1: Create an instance of Authenticator");
    let authenticator = Authenticator {
        request_method: "GET".to_string(),
        request_path: "/api/v3/brokerage/products".to_string(),
    };

    // Step 2: Generate JWT Token
    log::info!("Step 2: Generate JWT Token");
    let jwt_token =
        match authenticate_api_request(app_handle.clone(), &authenticator).await {
            Ok(token) => token,
            Err(e) => {
                log::error!("Failed to authenticate API request: {:?}", e);
                return Err(format!("Failed to authenticate API request: {}", e));
            }
        };

    // Step 3: Call list_products with the JWT token
    log::info!("Step 3: Call list_products with the JWT token");
    let product_list = match list_products(
        jwt_token,
        None,       // limit
        None,       // offset
        None,       // product_type
        None,       // product_ids
        Some(true), // get_all_products
    )
    .await
    {
        Ok(product_list) => {
            log::info!("Product list successfully retrieved.");
            product_list
        }
        Err(e) => {
            log::error!("Failed to get Product List: {:?}", e);
            return Err(format!("Failed to get Product List: {}", e));
        }
    };

    log::info!("Step 4: Save product list to store");

    // Group products by SPOT, FUTURE, and PERPS
    let mut grouped_products: HashMap<String, Vec<_>> = HashMap::new();
    for product in product_list.products.clone() {
        let product_type =
            product.product_type.clone().unwrap_or_else(|| "unknown".to_string());
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

    // Serialize the grouped product list response into JSON
    let serialized_data = serde_json::to_value(&grouped_products)
        .map_err(|e| format!("Failed to serialize product data: {}", e))?;

    // Save to Tauri store
    let coinbase_product_store =
        app_handle.store("coinbase_products.json").map_err(|e| e.to_string())?;

    coinbase_product_store.set("products", serialized_data);

    // Save the store and handle potential errors
    if let Err(e) = coinbase_product_store.save() {
        log::error!("Failed to save store to disk: {}", e);
        return Err(format!("Failed to save store to disk: {}", e));
    }

    log::info!("Product data successfully saved.");

    // Serialize product list response
    let product_list_response = serde_json::to_string_pretty(&grouped_products)
        .map_err(|e| format!("Failed to serialize product list: {}", e))?;

    app_handle
        .emit("coinbase_products_loaded", "Products loaded successfully")
        .map_err(|e| format!("Failed to emit event: {}", e))?;

    // Return the response
    Ok(product_list_response)
}
/* ---------------------------------------------------------------------------------- */
