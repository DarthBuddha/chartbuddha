/* ------------------------------------------------------------------------------------------------------------------ */
//! apis/coinbase/coinbase_websocket.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Functions
//! - coinbase_websocket
/* ------------------------------------------------------------------------------------------------------------------ */

// Rust
use std::error::Error;
// Tauri
use tauri::Emitter;
// use tauri::Manager;
// SeaORM
use sea_orm::{ DatabaseConnection, Set };
// Dependencies
use futures_util::{ SinkExt, StreamExt };
use serde_json::json;
use tokio::sync::mpsc;
use tokio_tungstenite::connect_async;
use tokio_tungstenite::tungstenite::protocol::Message;
use serde::{ Deserialize, Serialize };
// Crate
use crate::websocket_coordinator::save_to_database;
// use crate::db::entities::subscriptions::Entity as SubscriptionEntity;

/* ------------------------------------------------------------------------------------------------------------------ */

#[derive(Debug, Serialize, Deserialize)]
struct Utf8Bytes(String);

pub async fn connect_to_coinbase(
  app_handle: tauri::AppHandle,
  db: DatabaseConnection
) -> Result<(), Box<dyn Error + Send + Sync>> {
  let (ws_stream, _) = connect_async("wss://advanced-trade-ws.coinbase.com").await?;
  let (mut write, mut read) = ws_stream.split();

  // Subscribe to the desired channels
  let subscribe_message =
    json!({
        "type": "subscribe",
        "channels": [
            {
                "name": "ticker",
                "product_ids": ["BTC-USD"]
            }
        ]
    });

  write.send(Message::Text(subscribe_message.to_string().into())).await?;

  async fn save_to_database(db: &DatabaseConnection, data: &str) -> Result<(), Box<dyn Error + Send + Sync>> {
    // Parse the data and save it to the database
    use crate::db::entities::subscriptions::ActiveModel;
    use sea_orm::ActiveModelTrait;

    let subscription = ActiveModel {
      product_id: Set(data.to_string()),
      ..Default::default()
    };
    subscription.insert(db).await?;
    Ok(())
  }

  while let Some(message) = read.next().await {
    let message = message?;
    if let Message::Text(text) = message {
      // Process the incoming message
      println!("Received: {}", text);
      // Save data to the database here
      save_to_database(&db, &text).await?;
      // Emit event to the front end
      let json_text: serde_json::Value = serde_json::from_str(&text)?;
      app_handle.emit("coinbase-data", json_text)?;
    }
  }

  Ok(())
}

pub async fn start_coinbase_ws(
  db: DatabaseConnection,
  tx: mpsc::Sender<serde_json::Value>
) -> Result<(), Box<dyn Error + Send + Sync>> {
  let (ws_stream, _) = connect_async("wss://advanced-trade-ws.coinbase.com").await?;
  let (mut write, mut read) = ws_stream.split();

  // Subscribe to the desired channels
  let subscribe_message =
    json!({
        "type": "subscribe",
        "channels": [
            {
                "name": "ticker",
                "product_ids": ["BTC-USD"]
            }
        ]
    });

  write.send(Message::Text(subscribe_message.to_string().into())).await?;

  while let Some(message) = read.next().await {
    let message = message?;
    if let Message::Text(text) = message {
      // Process the incoming message
      println!("Received: {}", text);
      // Save data to the database here
      save_to_database(&db, &text).await?;
      // Send data to the channel
      let json_data: serde_json::Value = serde_json::from_str(&text)?;
      tx.send(json_data).await?;
    }
  }

  Ok(())
}

/* ------------------------------------------------------------------------------------------------------------------ */
