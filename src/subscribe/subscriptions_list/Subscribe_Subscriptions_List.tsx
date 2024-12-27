//! # Subscribe Subscriptions
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React from "react";
// Components
import { useSubscriptionContext } from "../interface/Interface_Subscribe";
// CSS Modules
import Style from "./Subscribe_Subscriptions_List.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Subscribe_Subscriptions: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useSubscriptionContext();
  console.log(selectedProvider);
  //
  const { selectedProduct, setSelectedProduct } = useSubscriptionContext();
  console.log(selectedProduct);
  //


  return (
    <div className={Style.Page}>
      <div className={Style.Title}>Subscriptions</div>
      <div className={Style.Subscription_List}>
        Subscriptions
      </div>

    </div>
  );
};
//
export default Subscribe_Subscriptions;
/* ---------------------------------------------------------------------------------- */
