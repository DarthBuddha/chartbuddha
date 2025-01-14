/* ------------------------------------------------------------------------------------------------------------------ */
//! commands/coinbase/subscribe/coinbase_subscribe.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Functions
//! - store_api_keys
/* ------------------------------------------------------------------------------------------------------------------ */

// Tauri
use tauri::{AppHandle, Wry};
use tauri_plugin_store::StoreExt;
// Dependencies
use serde_json::json;

/* ------------------------------------------------------------------------------------------------------------------ */

/// Store the API keys in the app_apis store and get API key permissions
#[tauri::command]
pub async fn coinbase_subscribe(app_handle: AppHandle<Wry>, coinbase_product_id: String) -> Result<String, String> {
    // initialize app_apis store
    log::info!("Initializing app_apis store");
    let store = app_handle.store("app_subscriptions.json").map_err(|e| e.to_string())?;

    // Save the API keys to the store
    let mut coinbase = store.get("coinbase").unwrap_or(json!([]));
    let new_subscription = json!({ "product_id": coinbase_product_id });
    coinbase.as_array_mut().unwrap().push(new_subscription);
    store.set("coinbase", coinbase);
    store.save().map_err(|e| e.to_string())?;
    log::info!("Coinbase Product id Saved");
    Ok("Coinbase Product id successfully saved".to_string())
}

/* ------------------------------------------------------------------------------------------------------------------ */
