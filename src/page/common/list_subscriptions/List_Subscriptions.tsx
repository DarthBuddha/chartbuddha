//! # List Subscriptions
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React from "react";
// Components
import { useInterface_Context } from "interface/Interface_Context";
// CSS Modules
import Style from "./List_Subscriptions.module.css";
//
/* ---------------------------------------------------------------------------------- */
const List_Subscriptions: React.FC = () => {
  const { selectedProvider } = useInterface_Context();
  console.log(selectedProvider);
  //
  const { selectedProduct } = useInterface_Context();
  console.log(selectedProduct);
  //


  return (
    <div className={Style.Page}>
      <div className={Style.Title}>Subscriptions</div>
      <div className={Style.List_Subscriptions}>
        Subscriptions
      </div>

    </div>
  );
};
//
export default List_Subscriptions;
/* ---------------------------------------------------------------------------------- */
