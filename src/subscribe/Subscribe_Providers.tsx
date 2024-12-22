//! # ChartBuddha
//!
//! Page: Connect Providers Component
//! Description: List of Providers.
//!
//! ##### subscribe/Subscribe_Providers.tsx
//
// React
import React from "react";
// Components
import { useProviderContext } from "./interface/Interface_Subscribe";
// CSS Modules
import Style from "./Subscribe_Providers.module.css";
//
/* ---------------------------------------------------------------------< Component > */
const Subscribe_Providers: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useProviderContext();
  console.log(selectedProvider);

  return (
    <div className={Style.Subscribe_Providers}>
      <h2>Providers</h2>
      <li>
        <button onClick={() => setSelectedProvider("coinbase")}>Coinbase</button>
      </li>
      <li>
        <button onClick={() => setSelectedProvider("binance")}>Binance</button>
      </li>
      {/* <p>Selected: {selectedProvider}</p> */}
    </div>
  );
};

export default Subscribe_Providers;
/* ----------------------------------------------------------------------< End-Code > */

