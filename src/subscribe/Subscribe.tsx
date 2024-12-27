//! # Subscribe
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React from "react";
// Components
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
import Subscribe_Provider from "./provider/Subscribe_Provider";
import Subscribe_Provider_List from "./provider_list/Subscribe_Provider_List";
import Subscribe_Subscriptions_List from "./subscriptions_list/Subscribe_Subscriptions_List";
// CSS Modules
import Style_App from "../App.module.css";
import Style from "./Subscribe.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Subscribe: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <MenuBar />
      <div className={Style.Page}>
        <div className={Style.Providers_List}>
          <Subscribe_Provider_List />
        </div>
        <div className={Style.Product_Panel}>
          <Subscribe_Provider />
        </div>
        <div className={Style.Subscriptions_List}>
          <Subscribe_Subscriptions_List />
        </div>
      </div>
      <StatusBar />
    </div>
  );
};
//
export default Subscribe;
/* ---------------------------------------------------------------------------------- */
