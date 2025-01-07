/* ---------------------------------------------------------------------------------------------- */
//! # initialize_store.rs
//!
//! Initialize the Tauri Store Interface.
/* ---------------------------------------------------------------------------------------------- */
//! ### Functions
//! - initialize_store
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::time::Duration;
use std::error::Error;
// Tauri
use log::info;
use tauri::{ AppHandle, Manager, Wry };
// Tauri Store: App Defaults
use crate::stores::defaults::app_apis_defaults::app_apis_defaults;
use crate::stores::defaults::app_settings_defaults::app_settings_defaults;
// Tauri Store: Page Defaults
use crate::stores::defaults::page_interface_defaults::page_interface_defaults;
use crate::stores::defaults::page_connect_defaults::page_connect_defaults;
use crate::stores::defaults::page_dashboard_defaults::page_dashboard_defaults;
use crate::stores::defaults::page_subscribe_defaults::page_subscribe_defaults;

/* ---------------------------------------------------------------------------------------------- */

pub fn initialize_stores(app: AppHandle<Wry>) -> Result<(), Box<dyn Error>> {
  // App Keys Store Initialization
  info!("Initialize App Apis Store...");
  let store_app_apis = tauri_plugin_store::StoreBuilder
    ::new(&app, "app_apis.json")
    .auto_save(Duration::from_millis(100))
    .defaults(app_apis_defaults())
    .build()?;
  app.manage(store_app_apis.clone());
  store_app_apis.save()?;

  // App Settings Store Initialization
  info!("Initialize App Settings Store...");
  let store_app_settings = tauri_plugin_store::StoreBuilder
    ::new(&app, "app_settings.json")
    .auto_save(Duration::from_millis(100))
    .defaults(app_settings_defaults())
    .build()?;
  app.manage(store_app_settings.clone());
  store_app_settings.save()?;

  // Page Interface Store Initialization
  info!("Initialize Page Interface Store...");
  let store_page_interface = tauri_plugin_store::StoreBuilder
    ::new(&app, "page_interface.json")
    .auto_save(Duration::from_millis(100))
    .defaults(page_interface_defaults())
    .build()?;
  app.manage(store_page_interface.clone());
  store_page_interface.reset();

  info!("Initialize Page Connect Store...");
  let store_page_connect = tauri_plugin_store::StoreBuilder
    ::new(&app, "page_connect.json")
    .auto_save(Duration::from_millis(100))
    .defaults(page_connect_defaults())
    .build()?;
  app.manage(store_page_connect.clone());
  store_page_connect.reset();

  info!("Initialize Page Dashboard Store...");
  let store_page_dashboard = tauri_plugin_store::StoreBuilder
    ::new(&app, "page_dashboard.json")
    .auto_save(Duration::from_millis(100))
    .defaults(page_dashboard_defaults())
    .build()?;
  app.manage(store_page_dashboard.clone());
  store_page_dashboard.reset();

  info!("Initialize Page subscribe Store...");
  let store_page_subscribe = tauri_plugin_store::StoreBuilder
    ::new(&app, "page_subscribe.json")
    .auto_save(Duration::from_millis(100))
    .defaults(page_subscribe_defaults())
    .build()?;
  app.manage(store_page_subscribe.clone());
  store_page_subscribe.reset();

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
