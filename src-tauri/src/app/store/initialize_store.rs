/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Setup - initialize_store
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! - initialize_store
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/setup/initialize_store.rs
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
// Tauri Store: Path
use crate::app::store::store_manager::APIS_STORE;
use crate::app::store::store_manager::APP_STORE;
use crate::app::store::store_manager::SETTINGS_STORE;
use crate::app::store::store_manager::SUBSCRIPTIONS_STORE;
// Tauri Store: Defaults
use crate::app::store::defaults::apis_defaults::apis_defaults;
use crate::app::store::defaults::app_state_defaults::app_state_defaults;
use crate::app::store::defaults::settings_defaults::settings_defaults;
use crate::app::store::defaults::subscriptions_defaults::subscriptions_defaults;

/* ---------------------------------------------------------------------------------------------- */

pub fn initialize_store(app: AppHandle<Wry>) -> Result<(), Box<dyn Error>> {
  // App: Apis Store Initialization
  info!("Initialize App Store...");
  let store_app = tauri_plugin_store::StoreBuilder::new(&app, APP_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(app_state_defaults())
    .build()?;
  app.manage(store_app.clone());
  store_app.reset(); // Reset the store to defaults
  store_app.save()?;

  // App: Apis Store Initialization
  info!("Initialize Apis Store...");
  let store_apis = tauri_plugin_store::StoreBuilder::new(&app, APIS_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(apis_defaults())
    .build()?;
  app.manage(store_apis.clone());
  store_apis.save()?;

  // App: Settings Store Initialization
  info!("Initialize Settings Store...");
  let store_settings = tauri_plugin_store::StoreBuilder::new(&app, SETTINGS_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(settings_defaults())
    .build()?;
  app.manage(store_settings.clone());
  store_settings.save()?;

  // App: Subscriptions Store Initialization
  info!("Initialize Subscriptions Store...");
  let store_subscriptions = tauri_plugin_store::StoreBuilder::new(&app, SUBSCRIPTIONS_STORE)
    .auto_save(Duration::from_millis(100))
    .defaults(subscriptions_defaults())
    .build()?;
  app.manage(store_subscriptions.clone());
  store_subscriptions.save()?;

  info!("Store Initialized!");

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
