//! # ChartBuddha
//! Page: Spot products
//! Description: Displays a list of spot products.
//! ##### dashboard/left/widgets/Spot.tsx
//
// Dependencies
import React from "react";
// Modules
// CSS
import Styles from "./Spot.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const Spot: React.FC = () => {
  return (
    <div className={Styles.Spot}>
      <h3>Spot Products</h3>
      <ul>
        <li>BTC-USD</li>
        <li>ETH-USD</li>
        <li>ADA-USD</li>
      </ul>
    </div>
  );
};

export default Spot;
/*------------------------------------< End-Code >------------------------------------*/
