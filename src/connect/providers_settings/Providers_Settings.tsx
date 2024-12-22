//! # ChartBuddha
//!
//! Page: Connect - Center Panel
//! Description: Displays settings for the selected provider.
//!
//! ##### pages/connect/center/Connect_Center.tsx
//
// React
import React from "react";
// Local
import Coinbase_Api from "../providers/coinbase/Coinbase_Api";
import { useProviderContext } from "../interface/Interface_Connect";
// CSS
import Style from "./Providers_Settings.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const Connect_Settings: React.FC = () => {
  const { selectedProvider } = useProviderContext();
  // onProviderConfigured: (provider: string) => void;
  // onProviderDeleted: (provider: string) => void; // Add callback for deletion

  if (!selectedProvider) {
    return (
      <div className={Style.Page_Providers_Settings}>
        <div className={Style.Title}>
          Select a Provider
        </div>
        <div className={Style.Body}>
          Select a provider to configure api settings.
        </div>
      </div>
    );
  }

  switch (selectedProvider?.toLowerCase()) {
    case "coinbase":
      return (
        <div className={Style.Page_Providers_Settings}>
          <div className={Style.Title}>
            Coinbase
          </div>
          <Coinbase_Api />
        </div>
      );
    case "binance":
      return (
        <div className={Style.Page_Providers_Settings}>
          <div className={Style.Title}>
            Binance
          </div>
          <div className={Style.Body}>
            Binance API is not supported yet.
          </div>
        </div>
      );
    default:
      return (
        <div className={Style.Page_Providers_Settings}>
          <div className={Style.Title}>
            Select a Provider
          </div>
          <div className={Style.Body}>
            Select a provider to configure api settings.
          </div>
        </div>
      );
  }
};

export default Connect_Settings;
/*------------------------------------< End-Code >------------------------------------*/
