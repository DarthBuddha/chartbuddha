//! # ChartBuddha
//!
//! Page: Home
//! Description: Home page of ChartBuddha.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import React from "react";
// Tauri
// Components
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
// CSS Modules
import Style_App from "../App.module.css";
import Style from "./Home.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Home: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <MenuBar />
      <div className={Style.Page}>
        <h1>Welcome to ChartBuddha</h1>
        <p>This is your home page.</p>
      </div>
      <StatusBar />
    </div >
  );
};
//
export default Home;
/* ---------------------------------------------------------------------------------- */
