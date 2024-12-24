//! # ChartBuddha
//!
//! Page: About
//! Description: About page.
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
import Style from "./About.module.css";
//
/* ---------------------------------------------------------------------------------- */
const About: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <MenuBar />
      <h1>About</h1>
      <div className={Style.Page}>
        <p>About page.</p>
      </div>
      <StatusBar />
    </div>
  );
};
//
export default About;
/* ---------------------------------------------------------------------------------- */
