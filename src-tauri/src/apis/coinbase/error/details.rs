/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/error/detail.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - Detail
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{Deserialize, Serialize};

/// Struct for error details
#[derive(Debug, Serialize, Deserialize)]
pub struct Details {
    pub type_url: String,
    pub value: Vec<u8>,
}

/* ---------------------------------------------------------------------------------------------- */
