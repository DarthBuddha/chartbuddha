//! # ChartBuddha
//!
//! Page: Connect
//! Description: Connect page.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import React from "react";
// Tauri
// Components
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
import Connect_Provider_Settings from "./provider_settings/Connect_Provider_Settings";
import Connect_Provider_List from "./provider_list/Connect_Provider_List";
// CSS Modules
import Style_App from "../App.module.css";
import Style from "./Connect.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Connect: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <MenuBar />
      <div className={Style.Page}>
        <div className={Style.Provider_List}>
          <Connect_Provider_List />
        </div>
        <div className={Style.Provider_Settings}>
          <Connect_Provider_Settings />
        </div>
      </div>
      <StatusBar />
    </div>
  );
};
//
export default Connect;
/* ---------------------------------------------------------------------------------- */
