//! # ChartBuddha
//! Page: Perpetual Products Widget
//! Description: List of perpetual products.
//! ##### dashboard/left/widgets/Perpetual.tsx
//
// Dependencies
import React from "react";
// Modules
// CSS
import Styles from "./Perpetual.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const Perpetual: React.FC = () => {
  return (
    <div className={Styles.Perpetual}>
      <h3>Perpetual Products</h3>
      <ul>
        <li>BTC-PERP</li>
        <li>ETH-PERP</li>
        <li>SOL-PERP</li>
      </ul>
    </div>
  );
};

export default Perpetual;
/*------------------------------------< End-Code >------------------------------------*/
