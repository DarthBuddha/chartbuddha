/* ---------------------------------------------------------------------------------------------- */
//! commands/coinbase/subscribe/subscription_save.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - subscription_save
/* ---------------------------------------------------------------------------------------------- */

// Rust
// use serde_json::json;
// Tauri
use tauri::{AppHandle, Manager, Wry};
// use tauri_plugin_store::StoreExt;
// SeaOrm
use sea_orm::{ActiveModelTrait, DatabaseConnection, Set};
// Crates
use crate::app::entities::subscriptions::ActiveModel as SubscriptionActiveModel;
use crate::commands::subscribe::common::store_subscription::store_subscription;
// temp
use crate::apis::coinbase::coinbase_subscriber::coinbase_subscriber;

/* ---------------------------------------------------------------------------------------------- */

/// Store the API keys and additional data in the app store
#[tauri::command]
pub async fn subscription_save(
    app_handle: AppHandle<Wry>,
    subscription_type: String,
    platform: String,
    exchange: String,
    symbol: String,
    tick: f64,        // Changed to tickSize
    granularity: f64, // Changed to granularity
    historical: String,
) -> Result<String, String> {
    // initialize app_subscriptions store
    log::info!("Save Subscription to Store");
    store_subscription(
        app_handle.clone(),
        subscription_type.clone(),
        platform.clone(),
        exchange.clone(),
        symbol.clone(),
        tick.clone(),
        granularity.clone(),
        historical.clone(),
    )
    .await
    .map_err(|e| e.to_string())?;

    // Access the database connection state
    let db = app_handle.state::<DatabaseConnection>();

    // Save subscription to the database
    let new_subscription = SubscriptionActiveModel {
        // Housekeeping fields
        created_at: Set(chrono::Utc::now().into()),
        updated_at: Set(chrono::Utc::now().naive_utc()),
        // Subscription: data
        subscription_type: Set(subscription_type.to_string()),
        platform: Set(platform.to_string()),
        exchange: Set(exchange.to_string()),
        symbol: Set(symbol.to_string()),
        // Subscription: settings
        tick: Set(tick),               // Changed to tickSize
        granularity: Set(granularity), // Changed to granularity
        historical: Set(historical.to_string()),

        ..Default::default()
    };

    new_subscription.insert(db.inner()).await.map_err(|e| e.to_string())?;

    coinbase_subscriber(app_handle.clone(), symbol.clone()).await.map_err(|e| e.to_string())?;

    Ok("Subscription Saved".to_string())
}

/* ---------------------------------------------------------------------------------------------- */
