/* ---------------------------------------------------------------------------------------------- */
//! # App Setup Setup Module
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! - setup
/* ---------------------------------------------------------------------------------------------- */
//! ##### app/setup/setup.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::sync::Mutex;
// Tauri
use tauri::{ AppHandle, Emitter, Manager };
// Dependencies
use log::error;
use log::info;
use tokio::time::{ sleep, Duration };
// Crates
use crate::AppState;
use crate::app::commands::app_setup_complete::app_setup_complete;
// use crate::app::setup::setup_database::initialize_database;
use crate::app::setup::setup_store::setup_store;

/* ---------------------------------------------------------------------------------------------- */

/// Perform the backend setup task
pub async fn setup(app: AppHandle) -> Result<(), ()> {
  info!("Performing backend setup task...");

  if let Err(e) = setup_store(app.clone()) {
    error!("Failed to initialize store: {}", e);
    return Err(());
  }

  // initialize_database().await.unwrap();

  info!("Fake Pause...");
  sleep(Duration::from_secs(3)).await;

  app_setup_complete(app.clone(), app.state::<Mutex<AppState>>(), "backend".to_string()).await?;
  info!("Set the backend task as being completed");

  // Emit an event to the frontend indicating that the backend setup is complete
  app.emit("backend-setup-complete", "").unwrap();
  info!("backend-setup-complete");
  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
