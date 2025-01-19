/* ---------------------------------------------------------------------------------------------- */
//! lib.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - run
/* ---------------------------------------------------------------------------------------------- */

// Rust
// use std::sync::Arc;
// use std::error::Error;
use std::sync::Mutex;
// Tauri
// use log::error;
use log::info;
use tauri::async_runtime::spawn;
use tauri::{ AppHandle, Emitter, Manager, State };
// Dependencies
use tokio::time::{ sleep, Duration };
// Module Library
pub mod apis;
pub mod commands;
pub mod db;
pub mod state;
pub mod stores;
pub mod streams;
pub mod ws;
// Crates
use crate::state::app_state::AppState;
use crate::db::init_database::init_database;
use crate::stores::init_stores::init_stores;

/* ---------------------------------------------------------------------------------------------- */

// Create a struct we'll use to track the completion of
// setup related tasks
struct SetupState {
  frontend_task: bool,
  backend_task: bool,
}

/// Main entry point for the ChartBuddha library
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder
    ::default()
    // Plugin Shell Setup
    .plugin(tauri_plugin_shell::init())
    // Window State Plugin
    .plugin(tauri_plugin_window_state::Builder::new().build())
    // Store Plugin
    .plugin(tauri_plugin_store::Builder::default().build())
    // Logging Plugin
    .plugin(
      tauri_plugin_log::Builder
        ::new()
        .level(log::LevelFilter::Debug)
        // .clear_targets()
        .format(|out, message, record| {
          let target = record.target();
          let shortened_target = if let Some(pos) = target.find("src/") {
            &target[pos..]
          } else {
            target
          };
          out.finish(format_args!("[{}][{}]\n{}\n", record.level(), shortened_target, message))
        })
        .build()
    )
    // Splashscreen Plugin
    .manage(
      Mutex::new(SetupState {
        frontend_task: false,
        backend_task: false,
      })
    )
    // Tauri Command Register
    .invoke_handler(
      tauri::generate_handler![
        // greet,
        set_complete,
        commands::connect::coinbase_store_api_keys::coinbase_store_api_keys,
        commands::subscribe::coinbase_products_list::coinbase_products_list,
        commands::subscribe::coinbase_subscribe::coinbase_subscribe,
        commands::websocket::websocket_cmd::init_websocket_cmd,
        commands::websocket::websocket_cmd::stop_all_active_streams_cmd
      ]
    )
    // Setup Tauri Application
    .setup(|app| {
      spawn(setup(app.handle().clone()));
      // let app_state = AppState::default();
      // app.manage(app_state);
      init_stores(app.handle().clone())?;
      // tauri::async_runtime::block_on(init_database())?;
      // info!("Database initialized successfully");
      Ok(())
    })
    // Run ChartBuddha Application
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

/* ---------------------------------------------------------------------------------------------- */

// #[tauri::command]
// fn greet(name: String) -> String {
//   format!("Hello {name} from Rust!")
// }

// A custom task for setting the state of a setup task
#[tauri::command]
async fn set_complete(
  app: AppHandle,
  state: State<'_, Mutex<SetupState>>,
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
    let splash_window = app.get_webview_window("splashscreen").unwrap();
    let main_window = app.get_webview_window("main").unwrap();
    splash_window.close().unwrap();
    main_window.show().unwrap();
  }
  Ok(())
}

// An async function that does some heavy setup task
async fn setup(app: AppHandle) -> Result<(), ()> {
  // Fake performing some heavy action for 3 seconds
  println!("Performing really heavy backend setup task...");
  sleep(Duration::from_secs(3)).await;
  println!("Backend setup task completed!");
  // Set the backend task as being completed
  set_complete(app.clone(), app.state::<Mutex<SetupState>>(), "backend".to_string()).await?;
  // Emit an event to the frontend indicating that the backend setup is complete
  app.emit("backend-setup-complete", {}).unwrap();
  Ok(())
}
