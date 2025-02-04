/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library - Backend
/* ---------------------------------------------------------------------------------------------- */
//! # Module: Store - store
/* ---------------------------------------------------------------------------------------------- */
//! Functions:
//! * initialize_store
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src-tauri/src/store/store.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::error::Error;
use std::time::Duration;
// Tauri
use tauri::AppHandle;
use tauri::Manager;
use tauri::Wry;
// Dependencies
use log::info;
// Crates
use crate::constants::{
  // BINANCE_STORE,
  COINBASE_STORE,
  CONFIG_STORE,
  API_LIST_STORE,
  SUB_LIST_STORE,
  STATE_STORE,
};
// Tauri Store Defaults: App
use crate::store::config::config::config_default;
use crate::store::state::state::state_default;
// Tauri Store Defaults: Interface
use crate::store::interface::api_list::api_list_default::default_list_api;
use crate::store::interface::sub_list::sub_list_default::default_list_sub;
// Tauri Store Defaults: Apis
// use crate::store::apis::default_binance::default_binance;
use crate::store::apis::coinbase::coinbase_default::coinbase_default;

/* ---------------------------------------------------------------------------------------------- */

pub fn initialize_store(app: AppHandle<Wry>) -> Result<(), Box<dyn Error>> {
  // Store: Settings Store Initialization
  info!("Initialize Store: App Config...");
  let store_app_config = tauri_plugin_store::StoreBuilder
    ::new(&app, CONFIG_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(config_default())
    .build()?;
  app.manage(store_app_config.clone());
  store_app_config.save()?;

  // Store: Apis Store Initialization
  info!("Initialize Store: App State...");
  let store_app_state = tauri_plugin_store::StoreBuilder
    ::new(&app, STATE_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(state_default())
    .build()?;
  app.manage(store_app_state.clone());
  store_app_state.reset(); // Reset the store to defaults
  store_app_state.save()?;

  // Store: Apis Store Initialization
  info!("Initialize Store: List Api...");
  let store_list_api = tauri_plugin_store::StoreBuilder
    ::new(&app, API_LIST_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(default_list_api())
    .build()?;
  app.manage(store_list_api.clone());
  store_list_api.save()?;

  // Store: List Subscription Store Initialization
  info!("Initialize Store: List Subscription...");
  let store_list_sub = tauri_plugin_store::StoreBuilder
    ::new(&app, SUB_LIST_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(default_list_sub())
    .build()?;
  app.manage(store_list_sub.clone());
  store_list_sub.save()?;

  // Store: Subscriptions Store Initialization
  // info!("Initialize Store: Broker - Binance...");
  // let store_binance = tauri_plugin_store::StoreBuilder
  //   ::new(&app, BINANCE_STORE)
  //   .auto_save(Duration::from_millis(100))
  //   .defaults(default_binance())
  //   .build()?;
  // app.manage(store_binance.clone());
  // store_binance.save()?;

  // Store: Subscriptions Store Initialization
  info!("Initialize Store: Broker - Coinbase...");
  let store_coinbase = tauri_plugin_store::StoreBuilder
    ::new(&app, COINBASE_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(coinbase_default())
    .build()?;
  app.manage(store_coinbase.clone());
  store_coinbase.save()?;

  info!("Store Initialized!");

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
