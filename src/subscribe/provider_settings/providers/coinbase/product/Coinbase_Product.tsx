//! # ChartBuddha
//!
//! Page: Coinbase Product
//! Description: Short description of the page.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import React from "react";
// Components
import { useSubscriptionContext } from "../../../../interface/Interface_Subscribe";
import Subscriptions_List from "../../../subscriptions_list/Subscriptions_List";
// CSS Modules
import Style from "./Coinbase_Product.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Coinbase_Product: React.FC = () => {
  const { selectedProvider, selectedProduct } = useSubscriptionContext();
  //
  return (
    <div className={Style.Page}>
      <div className={Style.Selection_Menu}>
        <div className={Style.Selection_Title}>
          Selected: {selectedProvider ? selectedProvider : "None"}
        </div>
        <div className={Style.Selection_Title}>
          Selected: {selectedProduct ? selectedProduct.display_name : "None"}
        </div>
      </div>
      <div className={Style.Settings_Container}>
        <div className={Style.Product_Container}>
          Left
        </div>
        <div className={Style.Subscription_Container}>
          <Subscriptions_List />;
        </div>
      </div>
    </div >
  );
};
//
export default Coinbase_Product;
/* ---------------------------------------------------------------------------------- */
