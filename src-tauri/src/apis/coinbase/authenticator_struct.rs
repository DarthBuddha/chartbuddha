/* ------------------------------------------------------------------------------------------------------------------ */
//! structs/coinbase/authenticator_struct.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! ### Functions
//! - Authenticator
//! - Claims
/* ------------------------------------------------------------------------------------------------------------------ */

// Dependencies
use serde::{Deserialize, Serialize};

/* ------------------------------------------------------------------------------------------------------------------ */

/// Struct: Authenticator
#[derive(Debug, Serialize, Deserialize)]
pub struct Authenticator {
    pub request_method: String,
    pub request_path: String,
}

/// Struct: Claims for JWT token
#[derive(Debug, Serialize)]
pub struct Claims {
    pub iss: String,
    pub sub: String,
    pub nbf: u64,
    pub exp: u64,
    pub uri: String,
    pub nonce: String,
}

/* ------------------------------------------------------------------------------------------------------------------ */
