//! # ChartBuddha library
//!
//! - Module: Connect Coinbase API
//! - Description: Save the keys for the Coinbase API.
//!
//! ### Functions
//! - `connect_coinbase_api`
//!
//! ##### coinbase/commands/connect_coinbase_api.rs
//
// Rust
use serde::Serialize;
use std::collections::HashMap;
// Tauri
use tauri::{AppHandle, Wry};
use tauri_plugin_store::StoreExt;
// Dependencies
// use serde_json::json;
// Local
use crate::coinbase::apis::data_api::get_api_key_permissions::get_api_key_permissions;
use crate::coinbase::apis::products::list_products::list_products;
use crate::coinbase::coinbase_authenticator::authenticate_api_request;
use crate::coinbase::coinbase_authenticator::Authenticator;
//
/* ----------------------------------------------------------------------- < Struct > */
/// Struct to represent the Product Data
#[derive(Serialize)]
pub struct CoinbaseProductData {
    product_id: String,
    product_type: Option<String>,
    quote_currency_id: Option<String>,
    base_currency_id: Option<String>,
    display_name: String,
}
/* --------------------------------------------------------------------- < Function > */
/// Function to test the connection to the Coinbase API
#[tauri::command]
pub async fn connect_coinbase_api(
    app_handle: AppHandle<Wry>,
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

    // Step 3: Call get_api_key_permissions with the JWT token
    log::info!("Step 3: Call get_api_key_permissions with the JWT token");
    let api_permissions_response = match get_api_key_permissions(jwt_token.clone())
        .await
    {
        Ok(api_permissions) => {
            log::info!("permissions validated successfully.");

            // Format the response
            format!(
                "can_view: {}\ncan_trade: {}\ncan_transfer: {}\nportfolio_uuid: {}\nportfolio_type: {}",
                api_permissions.can_view,
                api_permissions.can_trade,
                api_permissions.can_transfer,
                api_permissions.portfolio_uuid,
                api_permissions.portfolio_type
            )
        }
        Err(e) => {
            log::error!("Failed to get API key permissions: {:?}", e);
            return Err(format!("Failed to get API key permissions: {}", e));
        }
    };

    // Step 4: Create an instance of Authenticator
    log::info!("Step 4: Create an instance of Authenticator");
    let authenticator = Authenticator {
        request_method: "GET".to_string(),
        request_path: "/api/v3/brokerage/products".to_string(),
    };

    // Step 5: Generate JWT Token
    log::info!("Step 5: Generate JWT Token");
    let jwt_token =
        match authenticate_api_request(app_handle.clone(), &authenticator).await {
            Ok(token) => token,
            Err(e) => {
                log::error!("Failed to authenticate API request: {:?}", e);
                return Err(format!("Failed to authenticate API request: {}", e));
            }
        };

    // Step 6: Call list_products with the JWT token
    log::info!("Step 6: Call list_products with the JWT token");
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

    log::info!("Step 7: Save product list to store");
    let mut grouped_products: HashMap<String, Vec<CoinbaseProductData>> =
        HashMap::new();

    // Populate the grouped map
    for product in product_list.products.clone() {
        let product_data = CoinbaseProductData {
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
    let combined_response =
        format!("{}\n\n{}", api_permissions_response, product_list_response);

    // Return combined response
    Ok(combined_response)
}
/* --------------------------------------------------------------------- < End-Code > */
