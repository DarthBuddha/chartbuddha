/* ---------------------------------------------------------------------------------------------- */
//! app/setup/setup.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - setup
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::sync::Arc;
// Tauri
use tauri::{ AppHandle, Emitter, Manager };
// Dependencies
use tokio::time::{ sleep, Duration };
use tokio::sync::Mutex;
// Crates
use crate::app::setup::setup_state::SetupState;
// use crate::db::init_database::init_database;

/* ---------------------------------------------------------------------------------------------- */

// An async function that does some heavy setup task
pub async fn setup(app: AppHandle) -> Result<(), ()> {
  let setup_state = app.state::<Arc<Mutex<SetupState>>>();
  {
    let mut state = setup_state.lock().await;
    // Perform setup tasks while holding the lock
    println!("Performing really heavy backend setup task...");
    sleep(Duration::from_secs(3)).await;
    println!("Backend setup task completed!");
    state.backend_task = true;
  }
  // Emit an event to the frontend indicating that the backend setup is complete
  app.emit("backend-setup-complete", {}).unwrap();
  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
