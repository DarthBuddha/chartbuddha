//! # ChartBuddha
//!
//! Page: CoinbasePerpetual Products
//! Description: List of perpetual products.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import React from "react";
// CSS Modules
import Style from "./Coinbase_Products.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Coinbase_Perpetual: React.FC = () => {
  return (
    <div className={Style.Page}>
      <div className={Style.Product_List}>
        <li>BTC-USD</li>
        <li>ETH-USD</li>
        <li>ADA-USD</li>
      </div>
    </div>
  );
};
//
export default Coinbase_Perpetual;
/* ---------------------------------------------------------------------------------- */
