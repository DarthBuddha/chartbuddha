//! # ChartBuddha
//!
//! Page: Coinbase Product
//! Description: Short description of the page.
//!
//! ##### subscribe/provider_settings/providers/coinbase/product/Coinbase_Product.tsx
//
// React
import React from "react";
// CSS Modules
import Style from "./Coinbase_Product.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Coinbase_Product: React.FC = () => {
  return (
    <div className={Style.Page}>
      <div className={Style.Selection_Menu}>
        <div className={Style.Selection_Title}>
          Coinbase
        </div>
        <div className={Style.Selection_Title}>
          BTC-USD
          {/* <p>Selected: {selectedProduct}</p> */}
        </div>
      </div>
    </div >
  );
};

export default Coinbase_Product;
/* ---------------------------------------------------------------------------------- */
