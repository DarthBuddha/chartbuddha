//! # Subscribe_Product_Coinbase_Product_List_Spot_Suspense
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React, { Suspense, lazy } from "react";
// Tauri
// import { load } from "@tauri-apps/plugin-store";
// import { info, error } from "@tauri-apps/plugin-log";
// Components
// import { useSubscriptionContext } from "../../../../interface/Interface_Subscribe";
// import { Product_Type } from "../../../../interface/Product_Type";
// CSS Modules
// import Style from "./Subscribe_Provider_Coinbase_Product_List.module.css";
//
/* ---------------------------------------------------------------------------------- */
//
const Coinbase_Spot = lazy(() => import("./Subscribe_Provider_Coinbase_Product_List_Spot"));
//
const Coinbase_Spot_Suspense: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Coinbase_Spot />
  </Suspense>
);
//
export default Coinbase_Spot_Suspense;
//
/* ---------------------------------------------------------------------------------- */
