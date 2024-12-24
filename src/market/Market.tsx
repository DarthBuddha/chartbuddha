//! # ChartBuddha
//!
//! Page: News
//! Description: News page.
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
import Style from "./Market.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Market: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <MenuBar />
      <div className={Style.Page}>
        <h1>News</h1>
        <p>News page.</p>
      </div>
      <StatusBar />
    </div>
  );
};
//
export default Market;
/* ---------------------------------------------------------------------------------- */
