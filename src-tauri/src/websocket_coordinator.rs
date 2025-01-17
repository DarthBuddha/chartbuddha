/* ------------------------------------------------------------------------------------------------------------------ */
//! websocket_coordinator.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Functions
//! - websocket_coordinator
/* ------------------------------------------------------------------------------------------------------------------ */

// Rust
use std::error::Error;
// Tauri
use tauri::Emitter;
// Dependencies
use chrono::Utc;
use futures_util::{ SinkExt, StreamExt };
use sea_orm::DatabaseConnection;
use sea_orm::{ ActiveModelTrait, Set };
use serde_json::json;
use tokio_tungstenite::connect_async;
use tokio_tungstenite::tungstenite::protocol::Message;
use crate::db::entities::subscriptions::ActiveModel;

/* ------------------------------------------------------------------------------------------------------------------ */

async fn connect_to_coinbase(
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

pub async fn save_to_database(db: &DatabaseConnection, data: &str) -> Result<(), Box<dyn Error + Send + Sync>> {
  let subscription = ActiveModel {
    product_id: Set("BTC-USD".to_string()),
    created_at: Set(Utc::now().with_timezone(&chrono::FixedOffset::east_opt(0).unwrap())),
    updated_at: Set(Utc::now().with_timezone(&chrono::FixedOffset::east_opt(0).unwrap()).naive_utc()),
    ..Default::default()
  };
  subscription.insert(db).await?;
  Ok(())
}

/* ------------------------------------------------------------------------------------------------------------------ */
