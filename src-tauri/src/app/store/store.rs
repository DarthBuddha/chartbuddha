/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Store - store
/* ---------------------------------------------------------------------------------------------- */
//! Functions:
//! * initialize_store
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/store/store.rs
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
use crate::app::store::default_app_config::default_app_config;
use crate::app::store::default_app_state::default_app_state;
// Tauri Store Defaults: GUI Lists
use crate::app::store::default_list_api::default_list_api;
use crate::app::store::default_list_sub::default_list_sub;
// Tauri Store Defaults: Broker
use crate::app::store::broker::default_coinbase::default_coinbase;
// Tauri Store Defaults: Market
// Tauri Store Defaults: News

/* ---------------------------------------------------------------------------------------------- */

// Stores: App
pub const APP_CONFIG_STORE: &str = "app_config.json";
pub const APP_STATE_STORE: &str = "app_state.json";
// Stores: Interface
pub const LIST_API_STORE: &str = "list_api.json";
pub const LIST_SUB_STORE: &str = "list_sub.json";
// Stores: Broker
pub const COINBASE_STORE: &str = "broker_coinbase.json";

/* ---------------------------------------------------------------------------------------------- */

pub fn initialize_store(app: AppHandle<Wry>) -> Result<(), Box<dyn Error>> {
  // App: Settings Store Initialization
  info!("Initialize Store: App Config...");
  let store_settings = tauri_plugin_store::StoreBuilder
    ::new(&app, APP_CONFIG_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(default_app_config())
    .build()?;
  app.manage(store_settings.clone());
  store_settings.save()?;

  // App: Apis Store Initialization
  info!("Initialize Store: App State...");
  let store_app = tauri_plugin_store::StoreBuilder
    ::new(&app, APP_STATE_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(default_app_state())
    .build()?;
  app.manage(store_app.clone());
  store_app.reset(); // Reset the store to defaults
  store_app.save()?;

  // App: Apis Store Initialization
  info!("Initialize Store: List Api...");
  let store_apis = tauri_plugin_store::StoreBuilder
    ::new(&app, LIST_API_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(default_list_api())
    .build()?;
  app.manage(store_apis.clone());
  store_apis.save()?;

  // App: Subscriptions Store Initialization
  info!("Initialize Store: List Sub...");
  let store_subscriptions = tauri_plugin_store::StoreBuilder
    ::new(&app, LIST_SUB_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(default_list_sub())
    .build()?;
  app.manage(store_subscriptions.clone());
  store_subscriptions.save()?;

  // App: Subscriptions Store Initialization
  info!("Initialize Store: Broker - Coinbase...");
  let store_subscriptions = tauri_plugin_store::StoreBuilder
    ::new(&app, COINBASE_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(default_coinbase())
    .build()?;
  app.manage(store_subscriptions.clone());
  store_subscriptions.save()?;

  info!("Store Initialized!");

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
