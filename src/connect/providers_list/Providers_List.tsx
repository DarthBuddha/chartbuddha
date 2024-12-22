//! # ChartBuddha
//!
//! Page: Providers List
//! Description: List of Providers.
//!
//! ##### connect/providers_list/Providers_List.tsx
//
// React
import React from "react";
// Components
import { useProviderContext } from "../interface/Interface_Connect";
// CSS Modules
import Style from "./Providers_List.module.css";
//
/* ---------------------------------------------------------------------< Component > */
const Providers_List: React.FC = () => {
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

export default Providers_List;
/* ----------------------------------------------------------------------< End-Code > */
