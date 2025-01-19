/* ---------------------------------------------------------------------------------------------- */
//! module_name.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - rust_function
/* ---------------------------------------------------------------------------------------------- */

// Rust
// Tauri
use tauri::{ AppHandle, Manager, State };
// Dependencies
use tokio::sync::Mutex;
use std::sync::Arc;
// Crates
use crate::app::setup::setup_state::SetupState;

/* ---------------------------------------------------------------------------------------------- */

// A custom task for setting the state of a setup task
#[tauri::command]
pub async fn cmd_app_setup(
  app: AppHandle,
  state: State<'_, Arc<Mutex<SetupState>>>,
  task: String
) -> Result<(), ()> {
  // Lock the state without write access
  let mut state_lock = state.lock().await;
  match task.as_str() {
    "frontend" => {
      state_lock.frontend_task = true;
      println!("Frontend task marked as complete.");
    }
    "backend" => {
      state_lock.backend_task = true;
      println!("Backend task marked as complete.");
    }
    _ => panic!("invalid task completed!"),
  }
  // Check if both tasks are completed
  if state_lock.backend_task && state_lock.frontend_task {
    // Setup is complete, we can close the splashscreen
    // and unhide the main window!
    let splash_window = app.get_webview_window("splashscreen").unwrap();
    let main_window = app.get_webview_window("main").unwrap();
    splash_window.close().unwrap();
    main_window.show().unwrap();
    println!("Both tasks completed. Splashscreen closed and main window shown.");
  }
  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
