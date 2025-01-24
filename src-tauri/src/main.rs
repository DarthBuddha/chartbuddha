/* ---------------------------------------------------------------------------------------------- */
//! # Main Module
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * main
/* ---------------------------------------------------------------------------------------------- */
//! ##### main.rs
/* ---------------------------------------------------------------------------------------------- */
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  chartbuddha_lib::run()
}

/* ---------------------------------------------------------------------------------------------- */
