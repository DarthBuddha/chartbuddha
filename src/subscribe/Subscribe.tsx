//! # ChartBuddha
//!
//! Page: Subscribe
//! Description: Subscribe page.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import React from "react";
// Components
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
import Subscribe_Provider_Settings from "./provider_settings/Subscribe_Provider_Settings";
import Subscribe_Provider_List from "./provider_list/Subscribe_Provider_List";
// CSS Modules
import Style_App from "../App.module.css";
import Style from "./Subscribe.module.css";
//
/* --------------------------------------------------------------------------< Page > */
const Subscribe: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <MenuBar />
      <div className={Style.Page}>
        <div className={Style.Provider_List}>
          <Subscribe_Provider_List />
        </div>
        <div className={Style.Provider_Settings}>
          <Subscribe_Provider_Settings />
        </div>
      </div>
      <StatusBar />
    </div>
  );
};
//
export default Subscribe;
/* ----------------------------------------------------------------------< End-Code > */
