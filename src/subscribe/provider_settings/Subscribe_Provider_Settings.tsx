//! # ChartBuddha
//!
//! Page: Providers_Settings
//! Description: Displays settings for the selected provider.
//!
//! ##### subscribe/providers_settings/Providers_Settings.tsx
//
// React
import React from "react";
// Components
import Coinbase_Subs from "./providers/coinbase/Coinbase_Subs";
import { useProviderContext } from "../interface/Interface_Subscribe";
// CSS Modules
import Style from "./Subscribe_Provider_Settings.module.css";
//
/* ---------------------------------------------------------------------< Component > */
const Subscribe_Provider_Settings: React.FC = () => {
  const { selectedProvider } = useProviderContext();

  if (!selectedProvider) {
    return (
      <div className={Style.Page}>
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
        <div className={Style.Page}>
          <Coinbase_Subs />
        </div>
      );
    case "binance":
      return (
        <div className={Style.Page}>
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
        <div className={Style.Page}>
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

export default Subscribe_Provider_Settings;
/* ----------------------------------------------------------------------< End-Code > */
