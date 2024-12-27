//! # Connect Page
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React from "react";
// Components
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
import Connect_Provider from "./provider/Connect_Provider";
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
        <div className={Style.Provider}>
          <Connect_Provider />
        </div>
      </div>
      <StatusBar />
    </div>
  );
};
//
export default Connect;
/* ---------------------------------------------------------------------------------- */
