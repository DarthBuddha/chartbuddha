//! # About
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from "react";
// Tauri
// Components
import Bar_MenuBar from "../common/bar_menu/Bar_MenuBar";
import Bar_StatusBar from "../common/bar_status/Bar_StatusBar";
// CSS Modules
import Style_App from "../common/App_Window.module.css";
import Style from "./About.module.css";
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const About: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <Bar_MenuBar />
      <h1>About</h1>
      <div className={Style.Page}>
        <p>About page.</p>
      </div>
      <Bar_StatusBar />
    </div>
  );
};
//
export default About;
//
/* ------------------------------------------------------------------------------------------------------------------ */
