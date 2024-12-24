//! # ChartBuddha
//!
//! Page: Coinbase Spot Products
//! Description: Displays a list of spot products.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import React, { useState } from "react";
// Components
import { useProviderContext } from "../../../../../interface/Interface_Subscribe";
// CSS Modules
import Style from "./Coinbase_Products.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Coinbase_Spot: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useProviderContext();
  console.log(selectedProvider);
  //
  return (
    <div className={Style.Page}>
      <div className={Style.List}>
        <div className={Style.List_Content}>
          {/* <li>
            <button onClick={() => setSelectedProvider("coinbase")}>Coinbase</button>
          </li>
          <li>
            <button onClick={() => setSelectedProvider("binance")}>Binance</button>
          </li> */}
        </div>
      </div>
    </div>
  );
};
//
export default Coinbase_Spot;
/* ---------------------------------------------------------------------------------- */
