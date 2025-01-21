/* ---------------------------------------------------------------------------------------------- */
//! commands/coinbase/subscribe/list_products.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - list_products
/* ---------------------------------------------------------------------------------------------- */

// Tauri
use tauri::{AppHandle, Wry};
// use tauri_plugin_store::StoreExt;
// Dependencies
// use log::{ info, error };
// use serde_json::json;
// use serde_json::Value;
// Crates
use crate::apis::coinbase::coinbase_authenticator::use_authenticator;
use crate::apis::coinbase::coinbase_authenticator::Authenticator;
use crate::apis::coinbase::products::list_products::ListProductsResponse;

/* ---------------------------------------------------------------------------------------------- */

/// Store the API keys in the app_apis store and get API key permissions
#[tauri::command]
pub async fn coinbase_products_list(
    app_handle: AppHandle<Wry>,
    product_type: String,
) -> Result<String, String> {
    log::info!(
        "Command: products_list\n
    product_type: {}",
        product_type
    );

    // Query Params
    // let params = match product_type.as_str() {
    //     "spot" => "?product_type=SPOT",
    //     "future" => "?product_type=FUTURE&contract_expiry_type=EXPIRING",
    //     "perps" => "?product_type=FUTURE&contract_expiry_type=PERPETUAL",
    //     _ => {
    //         return Err("Invalid product type".to_string());
    //     }
    // };

    // Request Path
    let request_path = format!("/api/v3/brokerage/products");

    // TODO: products_list type logic for request path

    // Create an instance of Authenticator with correct request method and path
    let authenticator =
        Authenticator { request_method: "GET".to_string(), request_path: request_path.to_string() };

    // Generate JWT Token with the Authenticator
    let jwt_token = match use_authenticator(app_handle.clone(), &authenticator).await {
        Ok(token) => token,
        Err(e) => {
            log::error!("Failed to authenticate API request: {:?}", e);
            return Err(format!("Failed to authenticate API request: {}", e));
        }
    };

    log::debug!("JWT Token: {:?}", jwt_token);

    // Call get_api_key_permissions with the JWT token
    let url = format!("https://api.coinbase.com{}", request_path);

    log::info!("Url: {}", url);

    let client = reqwest::Client::new();

    // Make the request
    let response = client
        .get(url)
        .header("Content-Type", "application/json")
        .header("Authorization", format!("Bearer {}", jwt_token))
        .send()
        .await;

    // Handle the response
    let products_list_response = match response {
        Ok(resp) => {
            if resp.status().is_success() {
                match resp.json::<ListProductsResponse>().await {
                    Ok(products_response) => {
                        log::info!("Products list retrieved successfully.");
                        let response_body = serde_json::json!({
                          "products": products_response.products,
                          "num_products": products_response.num_products
                        });
                        Ok(response_body.to_string())
                    }
                    Err(parse_err) => {
                        log::error!("Failed to parse response body: {:?}", parse_err);
                        Err("Error parsing response body".to_string())
                    }
                }
            } else {
                let status = resp.status();
                let error_body =
                    resp.text().await.unwrap_or_else(|_| "Unable to read error body".to_string());
                log::error!("Error: Status code: {:?}, Response: {:?}", status, error_body);
                Err(format!("Failed with status code: {:?}", status))
            }
        }
        Err(req_err) => {
            log::error!("Request error: {:?}", req_err);
            Err(format!("Failed to make the request: {:?}", req_err))
        }
    };

    products_list_response
}

/* ---------------------------------------------------------------------------------------------- */
