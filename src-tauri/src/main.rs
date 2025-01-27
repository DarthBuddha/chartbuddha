/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Backend
/* ---------------------------------------------------------------------------------------------- */
//! # Module: Main
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Main entry point for ChartBuddha.
/* ---------------------------------------------------------------------------------------------- */
//! #### Function:
//! * main
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src-tauri/src/main.rs
/* ---------------------------------------------------------------------------------------------- */

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use rust_dotenv::DotEnv;

/// Main entry point for ChartBuddha.
fn main() {
  {
    println!("ChartBuddha");
    // Load the default `.env` file
    // let dotenv = DotEnv::new("");
    // println!("Loaded variables (default): {:?}", dotenv.all_vars());
  }
  // Whether the current instance was started with `tauri dev` or not.
  #[cfg(dev)]
  {
    // `tauri dev` only code
  }
  if cfg!(dev) {
    println!("Running in dev mode");
    // `tauri dev` only code
  } else {
    println!("Running in production mode");
    // `tauri build` only code
  }
  let is_dev: bool = tauri::is_dev();
  println!("is_dev: {}", is_dev);

  // Whether debug assertions are enabled or not. This is true for `tauri dev` and `tauri build --debug`.
  #[cfg(debug_assertions)]
  {
    // Debug only code
  }
  if cfg!(debug_assertions) {
    println!("Debug mode enabled");
    // Debug only code
  } else {
    println!("Debug mode disabled");
    // Production only code
  }
  chartbuddha_lib::run()
}

/* ---------------------------------------------------------------------------------------------- */
