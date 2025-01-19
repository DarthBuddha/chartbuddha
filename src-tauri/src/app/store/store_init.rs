/* ---------------------------------------------------------------------------------------------- */
//! # stores/init_stores.rs

/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - init_store
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::error::Error;
use std::time::Duration;
// Tauri
use log::info;
use tauri::{ AppHandle, Manager, Wry };
// Tauri Store: App Defaults
use crate::app::store::defaults::app_apis_defaults::app_apis_defaults;
use crate::app::store::defaults::app_settings_defaults::app_settings_defaults;
use crate::app::store::defaults::app_subscriptions_defaults::app_subscriptions_defaults;

/* ---------------------------------------------------------------------------------------------- */

pub fn init_stores(app: AppHandle<Wry>) -> Result<(), Box<dyn Error>> {
  // App: Apis Store Initialization
  info!("Initialize App Apis Store...");
  let store_app_apis = tauri_plugin_store::StoreBuilder
    ::new(&app, "app_apis.json")
    .auto_save(Duration::from_millis(100))
    .defaults(app_apis_defaults())
    .build()?;
  app.manage(store_app_apis.clone());
  store_app_apis.save()?;

  // App: Settings Store Initialization
  info!("Initialize App Settings Store...");
  let store_app_settings = tauri_plugin_store::StoreBuilder
    ::new(&app, "app_settings.json")
    .auto_save(Duration::from_millis(100))
    .defaults(app_settings_defaults())
    .build()?;
  app.manage(store_app_settings.clone());
  store_app_settings.save()?;

  // App: Subscriptions Store Initialization
  info!("Initialize App Subscriptions Store...");
  let store_app_subscriptions = tauri_plugin_store::StoreBuilder
    ::new(&app, "app_subscriptions.json")
    .auto_save(Duration::from_millis(100))
    .defaults(app_subscriptions_defaults())
    .build()?;
  app.manage(store_app_subscriptions.clone());
  store_app_subscriptions.save()?;

  info!("Store Initialized!");

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
