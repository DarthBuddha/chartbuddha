/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/products/product/future_product_details.rs
/* ---------------------------------------------------------------------------------------------- */
//! Structs
//! - FutureProductDetails
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use serde::{Deserialize, Serialize};
// Crate
use crate::apis::coinbase::products::product::perpetual_details::PerpetualDetails;

/* ---------------------------------------------------------------------------------------------- */

#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum RiskManagementType {
    UnknownRiskManagementType,
    ManagedByFcm,
    ManagedByVenue,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum ContractExpiryType {
    UnknownContractExpiryType,
    Expiring,
    Perpetual,
}

/* ---------------------------------------------------------------------------------------------- */

/// Struct to represent future product details
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct FutureProductDetails {
    pub venue: Option<String>,
    pub contract_code: Option<String>,
    pub contract_expiry: Option<String>,
    pub contract_size: Option<String>,
    pub contract_root_unit: Option<String>,
    pub group_description: Option<String>,
    pub contract_expiry_timezone: Option<String>,
    pub group_short_description: Option<String>,
    pub risk_managed_by: Option<RiskManagementType>,
    pub contract_expiry_type: Option<ContractExpiryType>,
    pub perpetual_details: Option<PerpetualDetails>,
}

/* ---------------------------------------------------------------------------------------------- */
