/* ---------------------------------------------------------------------------------------------- */
//! # initialize_stores.rs
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
// Tauri Store: Interface Defaults
// use crate::stores::defaults::interface_defaults::interface_defaults;
// Tauri Store: Page Nav Defaults
// use crate::stores::defaults::nav_connect_defaults::nav_connect_defaults;
// use crate::stores::defaults::nav_dashboard_defaults::nav_dashboard_defaults;
// use crate::stores::defaults::nav_subscribe_defaults::nav_subscribe_defaults;
// Tauri Store: App Defaults
use crate::stores::defaults::app_apis_defaults::app_apis_defaults;
use crate::stores::defaults::app_settings_defaults::app_settings_defaults;

/* ---------------------------------------------------------------------------------------------- */

pub fn initialize_stores(app: AppHandle<Wry>) -> Result<(), Box<dyn Error>> {
  // Interface Store Initialization
  // info!("Initialize Interface Store...");
  // let store_page_interface = tauri_plugin_store::StoreBuilder
  //   ::new(&app, ".interface.json")
  //   .auto_save(Duration::from_millis(100))
  //   .defaults(interface_defaults())
  //   .build()?;
  // app.manage(store_page_interface.clone());
  // store_page_interface.reset();

  // Page: Connect Store Initialization
  // info!("Initialize Nav Connect Store...");
  // let store_page_connect = tauri_plugin_store::StoreBuilder
  //   ::new(&app, ".nav_connect.json")
  //   .auto_save(Duration::from_millis(100))
  //   .defaults(nav_connect_defaults())
  //   .build()?;
  // app.manage(store_page_connect.clone());
  // store_page_connect.reset();

  // Page: Dashboard Store Initialization
  // info!("Initialize Nav Dashboard Store...");
  // let store_page_dashboard = tauri_plugin_store::StoreBuilder
  //   ::new(&app, ".nav_dashboard.json")
  //   .auto_save(Duration::from_millis(100))
  //   .defaults(nav_dashboard_defaults())
  //   .build()?;
  // app.manage(store_page_dashboard.clone());
  // store_page_dashboard.reset();

  // Page: Subscribe Store Initialization
  // info!("Initialize Nav subscribe Store...");
  // let store_page_subscribe = tauri_plugin_store::StoreBuilder
  //   ::new(&app, ".nav_subscribe.json")
  //   .auto_save(Duration::from_millis(100))
  //   .defaults(nav_subscribe_defaults())
  //   .build()?;
  // app.manage(store_page_subscribe.clone());
  // store_page_subscribe.reset();

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

  info!("Interface Store Initialized!");

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
