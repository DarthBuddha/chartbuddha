//! # ChartBuddha library
//! - Module: coinbase_provider
//! - Description: Coinbase Provider API.
//! ### Structs
//! - `CoinbaseProvider`
//! ### Implementations
//! - `CoinbaseProvider`
//! - - `new`
//! ### Implementations
//! - `Provider`
//! - - 'connect'
//! - - 'subscribe'
//! - - 'unsubscribe'
//! - - 'handle_incoming'
//! ##### provider/coinbase/coinbase_provider.rs
//
// Rust
// Library Dependencies
use async_trait::async_trait;
use futures_util::StreamExt;
// Local Dependencies
use crate::stream_manager::Provider;
//
/* --------------------------------- < Start-Code > --------------------------------- */
//
/* ------------------------------------ < Enum > ------------------------------------ */
//
/* ----------------------------------- < Struct > ----------------------------------- */
/// CoinbaseProvider
pub struct CoinbaseProvider {
    ws_url: String,
    sender: tokio::sync::mpsc::UnboundedSender<String>,
}
/* ------------------------------------ < Impl > ------------------------------------ */
/// Provider
impl CoinbaseProvider {
    pub fn new(ws_url: String) -> Self {
        let (sender, _receiver) = tokio::sync::mpsc::unbounded_channel();
        Self { ws_url, sender }
    }
}
/* ------------------------------------ < Impl > ------------------------------------ */
/// Provider
#[async_trait]
impl Provider for CoinbaseProvider {
    async fn connect(&self) -> Result<(), Box<dyn std::error::Error>> {
        let (mut ws_stream, _) = tokio_tungstenite::connect_async(&self.ws_url).await?;
        println!("Connected to Coinbase WebSocket at {}", self.ws_url);

        // Spawn a task to handle incoming messages
        tokio::spawn(async move {
            while let Some(Ok(msg)) = ws_stream.next().await {
                if let tokio_tungstenite::tungstenite::Message::Text(text) = msg {
                    println!("Incoming: {}", text);
                }
            }
        });

        Ok(())
    }

    async fn subscribe(&self, product: &str) -> Result<(), Box<dyn std::error::Error>> {
        let subscribe_msg = serde_json::json!({
            "type": "subscribe",
            "channels": ["ticker"],
            "product_ids": [product]
        });
        self.sender.send(subscribe_msg.to_string())?;
        println!("Subscribed to {}", product);
        Ok(())
    }

    async fn unsubscribe(
        &self,
        product: &str,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let unsubscribe_msg = serde_json::json!({
            "type": "unsubscribe",
            "channels": ["ticker"],
            "product_ids": [product]
        });
        self.sender.send(unsubscribe_msg.to_string())?;
        println!("Unsubscribed from {}", product);
        Ok(())
    }

    async fn handle_incoming(&self) {
        // Implementation to forward incoming WebSocket data
    }
}
/* ---------------------------------- < End--Code >---------------------------------- */
