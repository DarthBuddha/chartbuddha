//! # ChartBuddha
//! Page: Connect - Center Panel
//! Description: Displays settings for the selected provider.
//! ##### pages/connect/center/Connect_Center.tsx
//
// React
import React from "react";
// Local
import Coinbase from "../providers/Coinbase";
import { useProviderContext } from "./interface/Connect_Interface";
// CSS
import Styles from "./Connect_Center.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const Connect_Center: React.FC = () => {
  const { selectedProvider } = useProviderContext();
  // onProviderConfigured: (provider: string) => void;
  // onProviderDeleted: (provider: string) => void; // Add callback for deletion

  if (!selectedProvider) {
    return (
      <div className={Styles.Connect_Center}>
        <h1>Select a Provider</h1>
        <h3>Select a provider to configure api settings.</h3>
      </div>
    );
  }

  switch (selectedProvider?.toLowerCase()) {
    case "coinbase":
      return (
        <div className={Styles.Connect_Center}>
          <h1>Coinbase API</h1>
          <Coinbase />
        </div>
      );
    case "binance":
      return (
        <div className={Styles.Connect_Center}>
          <h1>Binance API</h1>
          <h3>Binance API is not supported yet.</h3>
          {/* <Binance /> */}
        </div>
      );
    default:
      return (
        <div className={Styles.Connect_Center}>
          <h1>Select a Provider</h1>
          <h3>Select a provider to configure api settings.</h3>
        </div>
      );
  }
};

export default Connect_Center;
/*------------------------------------< End-Code >------------------------------------*/
