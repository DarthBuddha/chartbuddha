//! # ChartBuddha
//! Page: Market
//! Description: Market page.
//! ##### pages/market/Market.tsx
//
// Dependencies
import React from "react";
// Modules
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
// CSS
import Styles from "./Market.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const Market: React.FC = () => {
  return (
    <div className={Styles.AppContainer}>
      <MenuBar />
      <h1>Market</h1>
      <div className={Styles.MarketPage}>
        <p>Market page</p>
      </div>
      <StatusBar />
    </div>
  );
};

export default Market;
/*------------------------------------< End-Code >------------------------------------*/
