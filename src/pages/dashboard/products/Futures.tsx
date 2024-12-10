//! # ChartBuddha
//! Page: Futures Products
//! Description: Displays a list of futures products.
//! ##### dashboard/left/widgets/Futures.tsx
//
// Dependencies
import React from "react";
// Modules
// CSS
import Styles from "./Futures.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const Futures: React.FC = () => {
  return (
    <div className={Styles.Futures}>
      <h3>Futures Products</h3>
      <ul>
        <li>BTC-PERP</li>
        <li>ETH-PERP</li>
        <li>DOT-PERP</li>
      </ul>
    </div>
  );
};

export default Futures;
/*------------------------------------< End-Code >------------------------------------*/
