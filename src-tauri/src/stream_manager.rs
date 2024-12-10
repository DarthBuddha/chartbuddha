//! # ChartBuddha library
//! - Module: `stream_manager`
//! - Description: Stream Manager.
//! ### Traits
//! - `Provider`
//! ### Structs
//! - `StreamManager`
//! ### Implementations
//! - 'StreamManager'
//! - - `new`
//! - - `add_provider`
//! - - `subscribe`
//! - - `handle_all`
//! ##### stream_manager.rs
//
// Rust
use std::sync::Arc;
// Library Dependencies
use async_trait::async_trait;
use std::collections::HashMap;
use tokio::sync::Mutex;
//
/* ------------------------------------ < Trait > ----------------------------------- */
/// Provider
#[async_trait]
pub trait Provider {
    async fn connect(&self) -> Result<(), Box<dyn std::error::Error>>;
    async fn subscribe(&self, product: &str) -> Result<(), Box<dyn std::error::Error>>;
    async fn unsubscribe(
        &self,
        product: &str,
    ) -> Result<(), Box<dyn std::error::Error>>;
    async fn handle_incoming(&self);
}
/* ----------------------------------- < Struct > ----------------------------------- */
/// StreamManager
pub struct StreamManager {
    providers: Mutex<HashMap<String, Arc<dyn Provider + Send + Sync>>>,
}
//
/* ------------------------------------ < Impl > ------------------------------------ */
/// StreamManager
impl StreamManager {
    pub fn new() -> Self {
        Self { providers: Mutex::new(HashMap::new()) }
    }

    pub async fn add_provider(
        &self,
        name: &str,
        provider: Box<dyn Provider + Send + Sync>,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let mut providers = self.providers.lock().await;
        providers.insert(name.to_string(), provider.into());
        Ok(())
    }

    pub async fn subscribe(
        &self,
        provider_name: &str,
        product: &str,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let providers = self.providers.lock().await;
        if let Some(provider) = providers.get(provider_name) {
            provider.subscribe(product).await
        } else {
            Err("Provider not found".into())
        }
    }

    pub async fn handle_all(&self) {
        let providers = {
            let providers_guard = self.providers.lock().await;
            providers_guard.clone() // Now this works because Arc implements Clone
        };

        for (_, provider) in providers {
            tokio::spawn(async move {
                provider.handle_incoming().await;
            });
        }
    }
}
/* ---------------------------------- < End--Code >---------------------------------- */
