//! # Subscribe
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from "react";
// Components
import Bar_MenuBar from "../common/bar_menu/Bar_MenuBar";
import Bar_StatusBar from "../common/bar_status/Bar_StatusBar";
import Subscribe_Provider from "./provider/Subscribe_Provider";
import List_Providers from "../common/list_providers/List_Providers";
import List_Subscriptions from "../common/list_subscriptions/List_Subscriptions";
// CSS Modules
import Style_App from "../common/App_Window.module.css";
import Style from "./Subscribe.module.css";
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Subscribe: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <Bar_MenuBar />
      <div className={Style.Page}>
        <div className={Style.List_Providers}>
          <List_Providers />
        </div>
        <div className={Style.Product_Panel}>
          <Subscribe_Provider />
        </div>
        <div className={Style.List_Subscriptions}>
          <List_Subscriptions />
        </div>
      </div>
      <Bar_StatusBar />
    </div>
  );
};

export default Subscribe;
//
/* ------------------------------------------------------------------------------------------------------------------ */
