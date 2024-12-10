//! # ChartBuddha library
//! - Module: `subscriber`
//! - Description: Coinbase provider websocket subscriber.
//! ### Structs
//! - `WebSocketClient`
//! ### Impls
//! - `WebSocketClient`
//! ### Functions
//! - `connect`
//! - `subscribe`
//! ##### provider/coinbase/subscriber.rs
//
// Rust
// Library Dependencies
use futures_util::SinkExt;
use futures_util::StreamExt;
use tokio::sync::mpsc;
use tokio_tungstenite::{connect_async, tungstenite::protocol::Message};
// Local Dependencies
use crate::providers::coinbase::transformer::transform_raw_to_trade_data;
//
/* ----------------------------------- < Struct > ----------------------------------- */
pub struct WebSocketClient {
    pub sender: mpsc::UnboundedSender<Message>,
}
//
/* ------------------------------------ < Impl > ------------------------------------ */
impl WebSocketClient {
    pub async fn connect(url: &str) -> Result<Self, Box<dyn std::error::Error>> {
        let (ws_stream, _) = connect_async(url).await?;
        let (mut write, mut read) = ws_stream.split();

        // Channel to send messages
        let (tx, mut rx) = mpsc::unbounded_channel();

        // Spawn task to handle outgoing messages
        tokio::spawn(async move {
            while let Some(msg) = rx.recv().await {
                if write.send(msg).await.is_err() {
                    break;
                }
            }
        });

        // Spawn task to handle incoming messages
        tokio::spawn(async move {
            while let Some(msg) = read.next().await {
                match msg {
                    Ok(msg) => {
                        if let Some(trade_data) =
                            transform_raw_to_trade_data(&msg.to_string()).await
                        {
                            println!("Transformed: {:?}", trade_data);
                        } else {
                            println!("Raw: {}", msg);
                        }
                    }
                    Err(e) => eprintln!("WebSocket error: {}", e),
                }
            }
        });

        Ok(Self { sender: tx })
    }
    //
    /* ---------------------------------- < Function > ---------------------------------- */
    pub async fn subscribe(&self, product: &str, jwt: &str) {
        let subscribe_msg = serde_json::json!({
            "type": "subscribe",
            "product_ids": [product],
            "channel": "ticker",
            "jwt": jwt
        });
        let msg = Message::text(subscribe_msg.to_string());
        self.sender.send(msg).unwrap();
    }
}
//
/* ---------------------------------- < End--Code >---------------------------------- */
