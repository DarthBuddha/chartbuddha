/* ---------------------------------------------------------------------------------------------- */
//! app/commands/app_setup_complete.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - app_setup_complete
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::sync::Mutex;
// Tauri
use tauri::{ AppHandle, Manager, State };
// Dependencies
// Crates
use crate::app::state::app_state::AppState;

/* ---------------------------------------------------------------------------------------------- */

// A custom task for setting the state of a setup task
#[tauri::command]
pub async fn app_setup_complete(
  app: AppHandle,
  state: State<'_, Mutex<AppState>>,
  task: String
) -> Result<(), ()> {
  // Lock the state without write access
  let mut state_lock = state.lock().unwrap();
  match task.as_str() {
    "frontend" => {
      state_lock.frontend_task = true;
    }
    "backend" => {
      state_lock.backend_task = true;
    }
    _ => panic!("invalid task completed!"),
  }
  // Check if both tasks are completed
  if state_lock.backend_task && state_lock.frontend_task {
    // Setup is complete, we can close the splashscreen
    // and unhide the main window!
    let splash_window = app.get_webview_window("splash").unwrap();
    let main_window = app.get_webview_window("main").unwrap();
    splash_window.close().unwrap();
    main_window.show().unwrap();
  }
  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
