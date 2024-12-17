//! # ChartBuddha
//! Page: Connect - Right Panel
//! Description: Displays all available providers.
//! ##### pages/connect/right/Connect_Right.tsx
//
// Dependencies
import React from "react";
// Modules
import { useProviderContext } from "./interface/Connect_Interface";
// CSS
import Styles from "./Connect_Right.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
/// Displays available providers
const Connect_Right: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useProviderContext();
  console.log(selectedProvider);

  return (
    <div className={Styles.Connect_Right}>
      <h2>Providers</h2>
      <li>
        <button onClick={() => setSelectedProvider('coinbase')}>Coinbase</button>
      </li>
      <li>
        <button onClick={() => setSelectedProvider('binance')}>Binance</button>
      </li>
      {/* <p>Selected: {selectedProvider}</p> */}
    </div>
  );
};

export default Connect_Right;
/*------------------------------------< End-Code >------------------------------------*/
