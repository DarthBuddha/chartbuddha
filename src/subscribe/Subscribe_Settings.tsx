//! # ChartBuddha
//!
//! Page: Subscribe Settings Component
//! Description: Displays settings for the selected provider.
//!
//! ##### subscribe/Subscribe_Settings.tsx
//
// React
import React from "react";
// Components
import Subscribe_Coinbase from "./coinbase/Subscribe_Coinbase";
import { useProviderContext } from "./interface/Interface_Subscribe";
// CSS Modules
import Style from "./Subscribe_Settings.module.css";
//
/* ---------------------------------------------------------------------< Component > */
const Subscribe_Settings: React.FC = () => {
  const { selectedProvider } = useProviderContext();

  if (!selectedProvider) {
    return (
      <div className={Style.Subscribe_Header}>
        <h1>Select a Provider</h1>
        <h3>Select a provider to configure subscription settings.</h3>
      </div>
    );
  }

  switch (selectedProvider?.toLowerCase()) {
    case "coinbase":
      return (
        <div>
          {/* <div className={Style.Subscribe_Header}>
            Subscriptions: Coinbase
          </div> */}
          <div className={Style.Subscribe_Provider}>
            <Subscribe_Coinbase />
          </div>
        </div>
      );
    case "binance":
      return (
        <div>
          <div className={Style.Subscribe_Header}>
            Subscriptions: Binance
          </div>
          <div className={Style.Subscribe_Provider}>
            Binance API is not supported yet.
          </div>
        </div>
      );
    default:
      return (
        <div className={Style.Subscribe_Header}>
          <h1>Select a Provider</h1>
          <h3>Select a provider to configure api settings.</h3>
        </div>
      );
  }
};

export default Subscribe_Settings;
/* ----------------------------------------------------------------------< End-Code > */
