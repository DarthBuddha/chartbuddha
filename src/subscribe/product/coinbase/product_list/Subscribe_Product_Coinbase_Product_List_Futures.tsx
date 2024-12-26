//! # ChartBuddha
//!
//! Page: Coinbase Futures Products
//! Description: Displays a list of futures products.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import React from "react";
// CSS Modules
import Style from "./Subscribe_Product_Coinbase_Product_List.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Coinbase_Futures: React.FC = () => {
  return (
    <div className={Style.List_Container}>
      <div className={Style.Product_List}>
        <li>BTC-USD</li>
        <li>ETH-USD</li>
        <li>ADA-USD</li>
      </div>
    </div>
  );
};

export default Coinbase_Futures;
/* ---------------------------------------------------------------------------------- */
