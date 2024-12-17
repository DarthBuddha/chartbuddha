//! # ChartBuddha
//! Page: Watch List
//! Description: Watch list page.
//! ##### dashboard/left/widgets/WatchList.tsx
//
// Dependencies
import React from "react";
// Modules
// CSS
import Styles from "./Watch.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const WatchList: React.FC = () => {
  return (
    <div className={Styles.WatchList}>
      <h3>Your Watchlist</h3>
      <ul>
        <li>BTC-USD</li>
        <li>ETH-USD</li>
        <li>XRP-USD</li>
      </ul>
    </div>
  );
};

export default WatchList;
/*------------------------------------< End-Code >------------------------------------*/
