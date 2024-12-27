//! # Module Name
//! Short description.
//!
//! ### Functions
//! - `rust_function`
//!
/* ---------------------------------------------------------------------------------- */
//
// Rust
use serde::Serialize;
use std::collections::HashMap;
// Tauri
use tauri::{AppHandle, Wry};
use tauri_plugin_store::StoreExt;
// Local
use crate::providers::coinbase::api::products::get_product::get_product;
use crate::providers::coinbase::api::products::get_product::ProductResponse;
use crate::providers::coinbase::coinbase_authenticator::authenticate_api_request;
use crate::providers::coinbase::coinbase_authenticator::Authenticator;
//
/* ---------------------------------------------------------------------------------- */
//
/// Function to test the connection to the Coinbase API
#[tauri::command]
pub async fn coinbase_get_selected_product(
    app_handle: AppHandle<Wry>,
    product_id: String,
) -> Result<String, String> {
    // Step 1: Create an instance of Authenticator
    log::info!("Step 1: Create an instance of Authenticator");
    let authenticator = Authenticator {
        request_method: "GET".to_string(),
        request_path: "/api/v3/brokerage/key_permissions".to_string(),
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
    //

    // Step 6: Call list_products with the JWT token
    log::info!("Step 6: Call list_products with the JWT token");
    let product_list = match get_product(
        jwt_token,
        product_id,                    // product_id
        get_tradability_status = true, // get_tradability_status
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

    log::info!("Step 7: Save product list to store");
    let mut grouped_products: HashMap<String, Vec<ProductResponse>> = HashMap::new();

    // Populate the grouped map
    for product in product_list.products.clone() {
        let product_data = ProductResponse {
            product_id: product.product_id.clone(),
            product_type: product.product_type.clone(),
            quote_currency_id: product.quote_currency_id.clone(),
            base_currency_id: product.base_currency_id.clone(),
            display_name: product.display_name.unwrap_or_default(),
        };

        // Determine the product type key
        let product_type_key =
            product.product_type.clone().unwrap_or_else(|| "unknown".to_string());

        // Add to the correct group
        grouped_products
            .entry(product_type_key)
            .or_insert_with(Vec::new)
            .push(product_data);
    }

    // Serialize the grouped data into JSON
    let serialized_data = serde_json::to_value(&grouped_products)
        .map_err(|e| format!("Failed to serialize product data: {}", e))?;

    // Save to Tauri store
    let coinbase_product_store =
        app_handle.store("coinbase_products.json").map_err(|e| e.to_string())?;

    coinbase_product_store.set("products", serialized_data);

    coinbase_product_store
        .save()
        .map_err(|e| format!("Failed to save store to disk: {}", e))?;

    log::info!("Product data successfully saved by product_type.");

    // Serialize product list response
    let product_list_response = serde_json::to_string_pretty(&product_list)
        .map_err(|e| format!("Failed to serialize product list: {}", e))?;

    // Combine both responses
    let combined_response = format!("{}\n", product_list_response);

    // Return combined response
    Ok(combined_response)
}
//
/* ---------------------------------------------------------------------------------- */
