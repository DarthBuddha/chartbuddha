/* ------------------------------------------------------------------------------------------------------------------ */
//! apis/coinbase/coinbase_subscriber.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Functions
//! - subscribe_to_coinbase
/* ------------------------------------------------------------------------------------------------------------------ */

// Rust
use std::sync::Arc;
// Tauri
use log::info;
use tauri::AppHandle;
use tauri::Emitter;
use tauri::Manager;
// use tauri::StateManager;
// use tauri::State;
use tauri::Wry;
// Dependencies
use tokio_tungstenite::connect_async;
use tokio_tungstenite::tungstenite::Message;
use futures_util::{ SinkExt, StreamExt };
use serde_json::json;
use sea_orm::DatabaseConnection;
// Crates
use crate::apis::coinbase::coinbase_authenticator::Authenticator;
use crate::apis::coinbase::coinbase_authenticator::use_authenticator;
use crate::ws::ws_coordinator::save_to_database;
// use crate::AppState;

/* ------------------------------------------------------------------------------------------------------------------ */

pub async fn subscribe_to_coinbase(
  app_handle: AppHandle<Wry>,
  product_id: String
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
  info!("Subscribing to Coinbase WebSocket for product ID: {}", product_id);
  let url = "wss://advanced-trade-ws.coinbase.com";
  let (ws_stream, _) = connect_async(url).await?;
  let (mut write, mut read) = ws_stream.split();

  // Authenticate and generate JWT
  let authenticator = Authenticator { request_method: "GET".to_string(), request_path: "/".to_string() };
  let jwt = use_authenticator(app_handle.clone(), &authenticator).await?;

  // Subscribe to the product
  let subscribe_message =
    json!({
        "type": "subscribe",
        "product_ids": [product_id],
        "channel": "ticker",
        "jwt": jwt
    });
  write.send(Message::Text(subscribe_message.to_string().into())).await?;
  info!("Subscribed to Coinbase WebSocket for product ID: {}", product_id);

  // Handle incoming messages
  while let Some(message) = read.next().await {
    let message = message?;
    if let Message::Text(text) = message {
      let data: serde_json::Value = serde_json::from_str(&text)?;
      // Process and save data to the database
      let db = app_handle
        .try_state::<tauri::async_runtime::Mutex<DatabaseConnection>>()
        .ok_or("Failed to get database state")?
        .lock().await
        .clone();
      info!("Received message from Coinbase WebSocket: {}", text);
      save_to_database(Arc::new(tauri::async_runtime::Mutex::new(db)), &text).await?;
      // Stream the data
      app_handle.emit("new_data", data)?;
    }
  }

  Ok(())
}

/* ------------------------------------------------------------------------------------------------------------------ */
