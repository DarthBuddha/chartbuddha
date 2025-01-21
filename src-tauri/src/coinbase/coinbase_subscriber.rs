/* ---------------------------------------------------------------------------------------------- */
//! # Coinbase Subscriber Module
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * coinbase_subscriber
/* ---------------------------------------------------------------------------------------------- */
//! ##### coinbase/coinbase_subscriber.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
// use std::sync::Arc;
// Tauri
use log::info;
// use tauri::async_runtime;
use tauri::AppHandle;
use tauri::Emitter;
// use tauri::Manager;
use tauri::Wry;
// Dependencies
use futures_util::{ SinkExt, StreamExt };
// use tauri_plugin_http::reqwest;
// use sea_orm::DatabaseConnection;
use serde_json::json;
use tokio_tungstenite::connect_async;
use tokio_tungstenite::tungstenite::Message;
// Crates
// use crate::AppState;

/* ---------------------------------------------------------------------------------------------- */

pub async fn coinbase_subscriber(
  app_handle: AppHandle<Wry>,
  product_id: String
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
  info!("Subscribing to Coinbase WebSocket for product ID: {}", product_id);
  let url = "wss://advanced-trade-ws.coinbase.com";
  let (ws_stream, _) = connect_async(url).await?;
  let (mut write, mut read) = ws_stream.split();

  // Create a reqwest client with rustls configuration
  // let client = reqwest::Client::builder().use_rustls_tls().build()?;

  // Subscribe to the product
  let subscribe_message =
    json!({
        "type": "subscribe",
        "product_ids": [product_id],
        "channel": "ticker"
    });
  write.send(Message::Text(subscribe_message.to_string().into())).await?;
  info!("Subscribed to Coinbase WebSocket for product ID: {}", product_id);

  // Handle incoming messages
  while let Some(message) = read.next().await {
    let message = message?;
    if let Message::Text(text) = message {
      let data: serde_json::Value = serde_json::from_str(&text)?;
      // Process and save data to the database
      // let db = app_handle.state::<async_runtime::Mutex<DatabaseConnection>>().lock().await.clone();
      info!("Received message from Coinbase WebSocket: {}", text);
      // save_to_database(Arc::new(tauri::async_runtime::Mutex::new(db)), &text).await?;
      // Stream the data
      app_handle.emit("new_data", data)?;
    }
  }

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
