//! # ChartBuddha library
//! - Module: `state`
//! - Description: Global state for the provider list.
//! ### Structs
//! - `AppState`
//! ### Functions
//! - `AppState.new`
//! ##### config/state.rs
//
// Rust
use std::collections::HashMap;
use std::sync::{Arc, Mutex};
// Local Dependencies
// use crate::provider::provider_list::ProviderInfo;
use crate::config::interface::ConnectPage;
//
/* ----------------------------------- < Models > ----------------------------------- */
// Global state for the provider list
pub struct AppState {
    pub providers: Arc<Mutex<HashMap<String, ConnectPage>>>,
}
//
/* ------------------------------------ < Impl > ------------------------------------ */
impl AppState {
    pub fn new(providers: HashMap<String, ConnectPage>) -> Self {
        Self { providers: Arc::new(Mutex::new(providers)) }
    }
}
//
/* ---------------------------------- < End--Code >---------------------------------- */
