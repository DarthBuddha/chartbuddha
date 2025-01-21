/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/products/list_products_response.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - ListProductsResponse
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{Deserialize, Serialize};
// Crate
use crate::apis::coinbase::products::product::product::Product;

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent the response from the list products endpoint
#[derive(Debug, Deserialize, Serialize)]
pub struct ListProductsResponse {
    pub products: Vec<Product>,
    pub num_products: Option<i32>, // Number of products returned, if provided
}

/* ---------------------------------------------------------------------------------------------- */
