/* ---------------------------------------------------------------------------------------------- */
//! apis/coinbase/coinbase_streams.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - start_coinbase_stream
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::sync::Arc;
// Tauri
use log::info;
use ::log::error;
use tauri::AppHandle;
use tauri::Emitter;
use tauri::Wry;
use tauri::async_runtime::Mutex;
// SeaORM
use sea_orm::DatabaseConnection;
// Dependencies
use tokio_tungstenite::connect_async;
use tokio_tungstenite::tungstenite::Message;
use futures_util::{ SinkExt, StreamExt };
use serde_json::json;
// Crates
use crate::ws::ws_coordinator::save_to_database;

/* ---------------------------------------------------------------------------------------------- */

pub async fn start_coinbase_stream(
  app_handle: AppHandle<Wry>,
  db: Arc<Mutex<DatabaseConnection>>,
  product_id: String
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
  info!("Starting Coinbase stream for product ID: {}", product_id);
  let url = "wss://advanced-trade-ws.coinbase.com";
  let (ws_stream, _) = connect_async(url).await?;
  let (mut write, mut read) = ws_stream.split();

  // Subscribe to the product
  let subscribe_message =
    json!({
        "type": "subscribe",
        "product_ids": [product_id],
        "channel": "ticker"
        // "jwt": jwt // Commented out as JWT is not needed for public channels
    });
  write.send(Message::Text(subscribe_message.to_string().into())).await?;
  info!("Subscribed to Coinbase WebSocket for product ID: {}", product_id);

  // Handle incoming messages
  while let Some(message) = read.next().await {
    let message = message?;
    if let Message::Text(text) = message {
      // Print the raw feed
      info!("Raw message from Coinbase WebSocket: {}", text);
      let data: serde_json::Value = serde_json::from_str(&text)?;
      // Save data to the database
      save_to_database(db.clone(), &text).await?;
      // Stream data to the frontend
      app_handle.emit("coinbase_data", data)?;
    } else {
      error!("Received non-text message from Coinbase WebSocket");
    }
  }

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
