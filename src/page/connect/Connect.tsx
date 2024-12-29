//! # Connect Page
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from "react";
// Components
import Bar_MenuBar from "../common/bar_menu/Bar_MenuBar";
import Bar_StatusBar from "../common/bar_status/Bar_StatusBar";
import Connect_Provider from "./provider/Connect_Provider";
import List_Providers from "../common/list_providers/List_Providers";
// CSS Modules
import Style_App from "../common/App_Window.module.css";
import Style from "./Connect.module.css";
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Connect: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <Bar_MenuBar />
      <div className={Style.Page}>
        <div className={Style.List_Providers}>
          <List_Providers />
        </div>
        <div className={Style.Provider}>
          <Connect_Provider />
        </div>
      </div>
      <Bar_StatusBar />
    </div>
  );
};

export default Connect;
//
/* ------------------------------------------------------------------------------------------------------------------ */
