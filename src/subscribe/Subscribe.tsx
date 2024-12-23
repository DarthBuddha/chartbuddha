//! # ChartBuddha
//!
//! Page: Subscribe
//! Description: Subscribe page.
//!
//! ##### subscribe/Subscribe.tsx
//
// React
import React from "react";
// Tauri
// Components
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
import Subscribe_Providers_Settings from "./providers_settings/Subscribe_Providers_Settings";
import Subscribe_Providers_List from "./providers_list/Subscribe_Providers_List";
// import Subscriptions_List from "./subscriptions_list/Subscriptions_List";
// CSS Modules
import AppStyle from "../App.module.css";
import Style from "./Subscribe.module.css";
//
/* --------------------------------------------------------------------------< Page > */
const Connect: React.FC = () => {
  return (
    <div className={AppStyle.AppContainer}>
      <MenuBar />
      <div className={Style.Page_Subscribe}>
        <div className={Style.Provider_List}>
          <Subscribe_Providers_List />
        </div>
        <div className={Style.Providers_Settings}>
          <Subscribe_Providers_Settings />
        </div>
        <div className={Style.Product_List}>
          <div className={Style.Title}>Products</div>
        </div>
      </div>
      <StatusBar />
    </div>
  );
};
//
export default Connect;
/* ----------------------------------------------------------------------< End-Code > */
