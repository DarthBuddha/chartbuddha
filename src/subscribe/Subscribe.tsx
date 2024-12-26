//! # Subscribe
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React from "react";
// Components
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
import Subscribe_Provider_Settings from "./product/Subscribe_Product";
import Subscribe_Provider_List from "./providers/Subscribe_Providers";
import Subscribe_Subscriptions_List from "./subscriptions/Subscribe_Subscriptions";
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
          <Subscribe_Provider_Settings />
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
