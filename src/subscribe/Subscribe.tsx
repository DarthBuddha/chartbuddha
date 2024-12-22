//! # ChartBuddha
//!
//! Page: Subscribe
//! Description: Subscribe page.
//!
//! ##### subscribe/Subscribe.tsx
//
// React
import React from "react";
import Split from "react-split";
// Components
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
import Subscribe_Providers from "./Subscribe_Providers";
import Subscribe_Settings from "./Subscribe_Settings";
// CSS Modules
import AppStyle from "../App.module.css";
import Style from "./Subscribe.module.css";
//
/* --------------------------------------------------------------------------< Page > */
const Subscribe: React.FC = () => {
  return (
    <div className={AppStyle.AppContainer}>
      <MenuBar />
      <Split className={Style.Subscribe_Page_Split}
        sizes={[10, 90]}
        minSize={200}
        expandToMin={true}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <div className={Style.Subscribe_Providers}>
          <Subscribe_Providers />
        </div>
        <div className={Style.Subscribe_Settings}>
          <Subscribe_Settings />
        </div>
      </Split>
      <StatusBar />
    </div>
  );
};
export default Subscribe;
/* ----------------------------------------------------------------------< End-Code > */
