/* ---------------------------------------------------------------------------------------------- */
//! # app/store/setup_store.rs

/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - setup_store
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::error::Error;
use std::time::Duration;
// Tauri
use log::info;
use tauri::{AppHandle, Manager, Wry};
// Tauri Store: App Defaults
use crate::app::store::apis_defaults::apis_defaults;
use crate::app::store::settings_defaults::settings_defaults;
use crate::app::store::subscriptions_defaults::subscriptions_defaults;

/* ---------------------------------------------------------------------------------------------- */

pub fn setup_store(app: AppHandle<Wry>) -> Result<(), Box<dyn Error>> {
    // App: Apis Store Initialization
    info!("Initialize App Apis Store...");
    let store_app_apis = tauri_plugin_store::StoreBuilder::new(&app, "apis.json")
        .auto_save(Duration::from_millis(100))
        .defaults(apis_defaults())
        .build()?;
    app.manage(store_app_apis.clone());
    store_app_apis.save()?;

    // App: Settings Store Initialization
    info!("Initialize App Settings Store...");
    let store_app_settings = tauri_plugin_store::StoreBuilder::new(&app, "settings.json")
        .auto_save(Duration::from_millis(100))
        .defaults(settings_defaults())
        .build()?;
    app.manage(store_app_settings.clone());
    store_app_settings.save()?;

    // App: Subscriptions Store Initialization
    info!("Initialize App Subscriptions Store...");
    let store_app_subscriptions = tauri_plugin_store::StoreBuilder::new(&app, "subscriptions.json")
        .auto_save(Duration::from_millis(100))
        .defaults(subscriptions_defaults())
        .build()?;
    app.manage(store_app_subscriptions.clone());
    store_app_subscriptions.save()?;

    info!("Store Initialized!");

    Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
