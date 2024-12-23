//! # ChartBuddha
//!
//! Component: Subscriptions List
//! Description: List of Subscriptions.
//!
//! ##### subscribe/subscriptions_list/Subscriptions_List.tsx
//
// React
import React from "react";
// Components
import { useProviderContext } from "../interface/Interface_Subscribe";
// CSS Modules
import Style from "./Subscriptions_List.module.css";
//
/* ---------------------------------------------------------------------< Component > */
const Subscriptions_List: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useProviderContext();
  console.log(selectedProvider);

  return (
    <div className={Style.Component_Subscriptions_List}>
      <div className={Style.Title}>Subscriptions</div>
    </div>
  );
};

export default Subscriptions_List;
/* ----------------------------------------------------------------------< End-Code > */

