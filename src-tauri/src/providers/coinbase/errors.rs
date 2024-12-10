//! # ChartBuddha library
//! - Module: `errors`
//! - Description: Contains all errors produced by the Coinbase API.
//! ### Enums
//! - `CbAdvError`
//! ### Functions
//! - `fmt::Display for CbAdvError`
//! ##### provider/coinbase/errors.rs
//
// Rust
use std::fmt;
//
/* ------------------------------------ < Enum > ------------------------------------ */
/// Types of errors that can occur.
#[derive(Debug)]
pub enum CbAdvError {
    /// Unable to parse JSON successfully.
    BadParse(String),
    /// Non-200 status code received.
    BadStatus(String),
    /// Could not connect to the service.
    BadConnection(String),
    /// Unable to locate resource.
    NotFound(String),
    /// Could not build the signature.
    BadSignature(String),
    /// Could not identify the API Secret key type.
    BadPrivateKey(String),
    /// Could not serialize the body of a message.
    BadSerialization,
    /// General unknown error.
    Unknown(String),
}
//
/* ------------------------------------ < Impl > ------------------------------------ */
//
impl fmt::Display for CbAdvError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            CbAdvError::Unknown(value) => {
                write!(f, "Unknown error occurred: {}", value)
            }
            CbAdvError::BadSignature(value) => {
                write!(f, "Could not create signature: {}", value)
            }
            CbAdvError::BadSerialization => {
                write!(f, "Could not serialize the message body")
            }
            CbAdvError::BadPrivateKey(value) => {
                write!(f, "Invalid private key: {}", value)
            }
            CbAdvError::BadParse(value) => write!(f, "Could not parse: {}", value),
            CbAdvError::NotFound(value) => write!(f, "Could not find: {}", value),
            CbAdvError::BadStatus(value) => {
                write!(f, "Non-zero status occurred: {}", value)
            }
            CbAdvError::BadConnection(value) => {
                write!(f, "Could not connect: {}", value)
            }
        }
    }
}
//
/* ---------------------------------- < End--Code >---------------------------------- */
