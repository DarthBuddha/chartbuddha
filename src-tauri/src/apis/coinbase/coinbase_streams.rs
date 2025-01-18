/* ------------------------------------------------------------------------------------------------------------------ */
//! apis/coinbase/coinbase_streams.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Functions
//! - start_coinbase_stream
/* ------------------------------------------------------------------------------------------------------------------ */

// Rust
use std::error::Error;
// Tauri
use tauri::AppHandle;
use tauri::Emitter;
use tauri::Wry;
// Dependencies
use tokio_tungstenite::connect_async;
use tokio_tungstenite::tungstenite::Message;
use futures_util::{ SinkExt, StreamExt };
use serde_json::json;
// Crates
use crate::apis::coinbase::authenticator::Authenticator;
use crate::apis::coinbase::authenticator::use_authenticator;

/* ------------------------------------------------------------------------------------------------------------------ */

pub async fn start_coinbase_stream(
  app_handle: AppHandle<Wry>,
  product_id: String
) -> Result<(), Box<dyn Error + Send + Sync>> {
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

  // Handle incoming messages
  while let Some(message) = read.next().await {
    let message = message?;
    if let Message::Text(text) = message {
      let data: serde_json::Value = serde_json::from_str(&text)?;
      // Stream data to the frontend
      app_handle.emit("coinbase_data", data)?;
    }
  }

  Ok(())
}

/* ------------------------------------------------------------------------------------------------------------------ */
