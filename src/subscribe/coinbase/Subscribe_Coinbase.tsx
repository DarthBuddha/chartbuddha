//! # ChartBuddha
//!
//! Page: Subscribe_Coinbase
//! Description: Coinbase Subscription Settings.
//!
//! ##### subscribe/providers/Subscribe_Coinbase.tsx
//
// React
import React from "react";
import Split from "react-split";
// Components
import Subscribe_Providers from "../Subscribe_Providers";
import Subscribe_Settings from "../Subscribe_Settings";
// CSS Modules
import Style from "./Subscribe_Coinbase.module.css";
//
/* ---------------------------------------------------------------------< Component > */
const Subscribe_Coinbase: React.FC = () => {
  return (
    <div>
      <Split className={Style.Subscribe_Page_Split}
        sizes={[90, 10]}
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
    </div>
  );
};
export default Subscribe_Coinbase;
/* ----------------------------------------------------------------------< End-Code > */
