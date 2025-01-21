/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/products/product/maintenance.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - Maintenance
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{Deserialize, Serialize};

/* ---------------------------------------------------------------------------------------------- */

/// Fcm specific scheduled maintenance details.
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Maintenance {
    pub start_time: Option<String>, // RFC3339 Timestamp
    pub end_time: Option<String>,   // RFC3339 Timestamp
}

/* ---------------------------------------------------------------------------------------------- */
