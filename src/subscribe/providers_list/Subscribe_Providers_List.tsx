//! # ChartBuddha
//!
//! Page: Providers_List
//! Description: List of Providers.
//!
//! ##### subscribe/providers_list/Providers_List.tsx
//
// React
import React from "react";
// Components
import { useProviderContext } from "../interface/Interface_Subscribe";
// CSS Modules
import Style from "./Subscribe_Providers_List.module.css";
//
/* ---------------------------------------------------------------------< Component > */
const Subscribe_Providers_List: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useProviderContext();
  console.log(selectedProvider);

  return (
    <div className={Style.Page_Providers_List}>
      <div className={Style.Title}>Providers</div>
      <div className={Style.List}>
        <li>
          <button onClick={() => setSelectedProvider("coinbase")}>Coinbase</button>
        </li>
        <li>
          <button onClick={() => setSelectedProvider("binance")}>Binance</button>
        </li>
        {/* <p>Selected: {selectedProvider}</p> */}
      </div>
    </div>
  );
};

export default Subscribe_Providers_List;
/* ----------------------------------------------------------------------< End-Code > */

