//! # ChartBuddha
//!
//! - Module: main
//! - Description: Main entry point for the ChartBuddha library.
//!
//! ### Functions
//! - `main`
//!
/* ---------------------------------------------------------------------------------- */
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
fn main() {
    chartbuddha_lib::run()
}
/* ---------------------------------------------------------------------------------- */
