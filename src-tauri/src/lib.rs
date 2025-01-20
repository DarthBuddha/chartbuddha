/* ---------------------------------------------------------------------------------------------- */
//! lib.rs
/* ---------------------------------------------------------------------------------------------- */
//! Functions
//! - run
/* ---------------------------------------------------------------------------------------------- */

// Library
pub mod apis;
pub mod app;
pub mod commands;
pub mod db;
pub mod streams;
pub mod ws;

/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::sync::Mutex;
// Tauri
use tauri::async_runtime::spawn;
use tauri::{ AppHandle, Emitter, Manager, State };
// Dependencies
use tokio::time::{ sleep, Duration };
// Crates
use crate::app::setup::setup_state::SetupState;
use crate::app::store::store_init::store_init;
// use crate::app::setup::setup::setup;

/* ---------------------------------------------------------------------------------------------- */

// Our main entrypoint in a version 2 mobile compatible app
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  // Manage: Tauri Plugins
  tauri::Builder
    ::default()
    // Plugin: Log
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
    // Plugin: Store
    .plugin(tauri_plugin_store::Builder::default().build())
    // Plugin: Window State
    // .plugin(tauri_plugin_window_state::Builder::new().build())

    // Manage: State
    // Register a `State` to be managed by Tauri
    .manage(
      Mutex::new(SetupState {
        frontend_task: false,
        backend_task: false,
      })
    )

    // Manage: Commands
    .invoke_handler(
      tauri::generate_handler![
        set_complete,
        app::commands::cmd_app_setup::cmd_app_setup,
        commands::connect::coinbase_store_api_keys::coinbase_store_api_keys,
        commands::subscribe::coinbase_products_list::coinbase_products_list,
        commands::subscribe::coinbase_subscribe::coinbase_subscribe,
        commands::websocket::websocket_cmd::init_websocket_cmd,
        commands::websocket::websocket_cmd::stop_all_active_streams_cmd
      ]
    )

    // Manage: Setup
    // Use the setup hook to execute setup related tasks
    // Runs before the main loop, so no windows are yet created
    .setup(|app| {
      // initalize our tauri store defaults
      store_init(app.handle().clone())?;
      // Spawn setup as a non-blocking task so the windows can be
      // created and ran while it executes
      spawn(setup(app.handle().clone()));
      // The hook expects an Ok result
      Ok(())
    })

    // Run: ChartBuddha Application
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

/* ---------------------------------------------------------------------------------------------- */

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
    let splash_window = app.get_webview_window("splash").unwrap();
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
  // Commands can be ran as regular functions as long as you take
  // care of the input arguments yourself
  set_complete(app.clone(), app.state::<Mutex<SetupState>>(), "backend".to_string()).await?;
  // Emit an event to the frontend indicating that the backend setup is complete
  app.emit("backend-setup-complete", "").unwrap();
  println!("backend-setup-complete");
  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */

// /// Main entry point for the ChartBuddha library
// #[cfg_attr(mobile, tauri::mobile_entry_point)]
// pub fn run() {
//   tauri::Builder
//     ::default()
//     // Tauri State Management
//     .manage(
//       Mutex::new(SetupState {
//         frontend_task: false,
//         backend_task: false,
//       })
//     )
//     // Plugin Shell Setup
//     .plugin(tauri_plugin_shell::init())
//     // Window State Plugin
//     .plugin(tauri_plugin_window_state::Builder::new().build())

//     // Tauri Command Register
//     .invoke_handler(
//       tauri::generate_handler![
//         set_complete,
//         app::commands::cmd_app_setup::cmd_app_setup,
//         commands::connect::coinbase_store_api_keys::coinbase_store_api_keys,
//         commands::subscribe::coinbase_products_list::coinbase_products_list,
//         commands::subscribe::coinbase_subscribe::coinbase_subscribe,
//         commands::websocket::websocket_cmd::init_websocket_cmd,
//         commands::websocket::websocket_cmd::stop_all_active_streams_cmd
//       ]
//     )
//     // Use the setup hook to execute setup related tasks
//     // Runs before the main loop, so no windows are yet created
//     // Setup Tauri Application
//     .setup(|app| {
//       // init_stores(app.handle().clone())?;
//       // Spawn setup as a non-blocking task so the windows can be
//       // created and ran while it executes
//       spawn(setup(app.handle().clone()));
//       Ok(())
//     })
//     // Run ChartBuddha Application
//     .run(tauri::generate_context!())
//     .expect("error while running tauri application");
// }

// /* ---------------------------------------------------------------------------------------------- */

// // A custom task for setting the state of a setup task
// #[tauri::command]
// async fn set_complete(
//   app: AppHandle,
//   state: State<'_, Mutex<SetupState>>,
//   task: String
// ) -> Result<(), ()> {
//   // Lock the state without write access
//   let mut state_lock = state.lock().unwrap();
//   match task.as_str() {
//     "frontend" => {
//       state_lock.frontend_task = true;
//     }
//     "backend" => {
//       state_lock.backend_task = true;
//     }
//     _ => panic!("invalid task completed!"),
//   }
//   // Check if both tasks are completed
//   if state_lock.backend_task && state_lock.frontend_task {
//     // Setup is complete, we can close the splashscreen
//     // and unhide the main window!
//     let splash_window = app.get_webview_window("splash").unwrap();
//     let main_window = app.get_webview_window("main").unwrap();
//     splash_window.close().unwrap();
//     main_window.show().unwrap();
//   }
//   Ok(())
// }

// // An async function that does some heavy setup task
// async fn setup(app: AppHandle) -> Result<(), ()> {
//   // Fake performing some heavy action for 3 seconds
//   println!("Performing really heavy backend setup task...");
//   sleep(Duration::from_secs(3)).await;
//   println!("Backend setup task completed!");
//   // Set the backend task as being completed
//   // Commands can be ran as regular functions as long as you take
//   // care of the input arguments yourself
//   set_complete(app.clone(), app.state::<Mutex<SetupState>>(), "backend".to_string()).await?;
//   // Emit an event to the frontend indicating that the backend setup is complete
//   app.emit_all("backend-setup-complete", "").unwrap();
//   println!("backend-setup-complete");
//   Ok(())
// }
