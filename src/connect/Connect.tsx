//! # ChartBuddha
//!
//! Page: Connect
//! Description: Connect page.
//!
//! ##### connect/Connect.tsx
//
// React
import React from "react";
// Tauri
// Components
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
import Connect_Settings from "./providers_settings/Providers_Settings";
import Connect_Providers_List from "./providers_list/Providers_List";
// CSS Modules
import AppStyle from "../App.module.css";
import Style from "./Connect.module.css";
//
/* --------------------------------------------------------------------------< Page > */
const Connect: React.FC = () => {
  return (
    <div className={AppStyle.AppContainer}>
      <MenuBar />
      <div className={Style.Page_Connect}>
        <div className={Style.Providers_List}>
          <Connect_Providers_List />
        </div>
        <div className={Style.Providers_Settings}>
          <Connect_Settings />
        </div>
      </div>
      <StatusBar />
    </div>
  );
};
//
export default Connect;
/* ----------------------------------------------------------------------< End-Code > */
