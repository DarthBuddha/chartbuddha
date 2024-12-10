//! # ChartBuddha library
//! - Module: `coinbase_delete_keys`
//! - Description: Delete the keys of the Coinbase API.
//! ### Functions
//! - `delete_coinbase_credentials`
//! ##### interface/connect/coinbase_delete_keys.rs
//
// Rust
// Library Dependencies
// Local Dependencies
use crate::commands::connect::providers_list::get_configured_providers;
use crate::providers::coinbase::credentials::CoinbaseCredentials;
//
/* ---------------------------------- < Function > ---------------------------------- */
#[tauri::command]
pub fn coinbase_delete_keys() -> Result<Vec<String>, String> {
    // Call the delete function
    CoinbaseCredentials::delete()?;

    // Call get_configured_providers to update the list
    get_configured_providers()
}
//
/* ---------------------------------- < End--Code >---------------------------------- */
