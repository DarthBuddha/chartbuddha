//! # Analyze
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from "react";
// Components
import Bar_MenuBar from "../common/bar_menu/Bar_MenuBar";
import Bar_StatusBar from "../common/bar_status/Bar_StatusBar";
// CSS Modules
import Style_App from "../common/App_Window.module.css";
import Style from "./Analyze.module.css";
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Analyze: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <Bar_MenuBar />
      <div className={Style.Page}>
        <h1>Analyze</h1>
        <p>Analyze page.</p>
      </div>
      <Bar_StatusBar />
    </div>
  );
};

export default Analyze;
//
/* ------------------------------------------------------------------------------------------------------------------ */
