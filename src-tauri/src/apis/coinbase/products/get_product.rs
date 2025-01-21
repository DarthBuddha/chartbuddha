/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/products/get_product.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - get_product
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{Deserialize, Serialize};
// Crate
use crate::apis::coinbase::products::product::product::Product;

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent a single product in the list products response
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct GetProduct {
    pub product: Option<Product>,
}

/* ---------------------------------------------------------------------------------------------- */
