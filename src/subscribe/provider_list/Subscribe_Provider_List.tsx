//! # ChartBuddha
//!
//! Page: Providers_List
//! Description: List of Providers.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import React from "react";
// Components
import { useSubscriptionContext } from "../interface/Interface_Subscribe";
// CSS Modules
import Style from "./Subscribe_Provider_List.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Subscribe_Provider_List: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useSubscriptionContext();
  console.log(selectedProvider);
  //
  return (
    <div className={Style.Page}>
      <div className={Style.List}>
        <div className={Style.Title}>
          Providers
        </div>
        <div className={Style.List_Content}>
          <li>
            <button onClick={() => setSelectedProvider("coinbase")}>Coinbase</button>
          </li>
          <li>
            <button onClick={() => setSelectedProvider("binance")}>Binance</button>
          </li>
        </div>
      </div>
    </div>
  );
};
//
export default Subscribe_Provider_List;
/* ---------------------------------------------------------------------------------- */

