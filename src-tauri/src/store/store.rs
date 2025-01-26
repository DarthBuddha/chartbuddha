/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Module: Store - store
/* ---------------------------------------------------------------------------------------------- */
//! Functions:
//! * initialize_store
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: store/store.rs
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
// Tauri Store Defaults: App
use crate::store::app::default_app_config::default_app_config;
use crate::store::app::default_app_state::default_app_state;
use crate::store::app::default_list_api::default_list_api;
use crate::store::app::default_list_sub::default_list_sub;
// Tauri Store Defaults: Apis
use crate::store::apis::default_binance::default_binance;
use crate::store::apis::default_coinbase::default_coinbase;

/* ---------------------------------------------------------------------------------------------- */

// Stores: App
pub const APP_CONFIG_STORE: &str = "app_config.json";
pub const APP_STATE_STORE: &str = "app_state.json";
// Stores: Interface
pub const LIST_API_STORE: &str = "list_api.json";
pub const LIST_SUB_STORE: &str = "list_sub.json";
// Stores: Broker
pub const BINANCE_STORE: &str = "binance.json";
pub const COINBASE_STORE: &str = "coinbase.json";

/* ---------------------------------------------------------------------------------------------- */

pub fn initialize_store(app: AppHandle<Wry>) -> Result<(), Box<dyn Error>> {
  // Store: Settings Store Initialization
  info!("Initialize Store: App Config...");
  let store_app_config = tauri_plugin_store::StoreBuilder
    ::new(&app, APP_CONFIG_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(default_app_config())
    .build()?;
  app.manage(store_app_config.clone());
  store_app_config.save()?;

  // Store: Apis Store Initialization
  info!("Initialize Store: App State...");
  let store_app_state = tauri_plugin_store::StoreBuilder
    ::new(&app, APP_STATE_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(default_app_state())
    .build()?;
  app.manage(store_app_state.clone());
  store_app_state.reset(); // Reset the store to defaults
  store_app_state.save()?;

  // Store: Apis Store Initialization
  info!("Initialize Store: List Api...");
  let store_list_api = tauri_plugin_store::StoreBuilder
    ::new(&app, LIST_API_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(default_list_api())
    .build()?;
  app.manage(store_list_api.clone());
  store_list_api.save()?;

  // Store: List Subscription Store Initialization
  info!("Initialize Store: List Subscription...");
  let store_list_sub = tauri_plugin_store::StoreBuilder
    ::new(&app, LIST_SUB_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(default_list_sub())
    .build()?;
  app.manage(store_list_sub.clone());
  store_list_sub.save()?;

  // Store: Subscriptions Store Initialization
  info!("Initialize Store: Broker - Binance...");
  let store_binance = tauri_plugin_store::StoreBuilder
    ::new(&app, BINANCE_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(default_binance())
    .build()?;
  app.manage(store_binance.clone());
  store_binance.save()?;

  // Store: Subscriptions Store Initialization
  info!("Initialize Store: Broker - Coinbase...");
  let store_coinbase = tauri_plugin_store::StoreBuilder
    ::new(&app, COINBASE_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(default_coinbase())
    .build()?;
  app.manage(store_coinbase.clone());
  store_coinbase.save()?;

  info!("Store Initialized!");

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
