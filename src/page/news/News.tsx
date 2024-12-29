//! # News
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
import Style from "./News.module.css";
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const News: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <Bar_MenuBar />
      <div className={Style.Page}>
        <h1>News</h1>
        <p>News page.</p>
      </div>
      <Bar_StatusBar />
    </div>
  );
};

export default News;
//
/* ------------------------------------------------------------------------------------------------------------------ */
