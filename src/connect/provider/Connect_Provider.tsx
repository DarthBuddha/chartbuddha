//! # Connect Provider Settings
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React from "react";
// Local
import Coinbase_Api from "./coinbase/Coinbase_Api";
import { useProviderContext } from "../interface/Interface_Connect";
// CSS
import Style from "./Connect_Provider.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Connect_Provider: React.FC = () => {
  const { selectedProvider } = useProviderContext();
  //
  if (!selectedProvider) {
    return (
      <div className={Style.Page_Provider_Settings}>
        <div className={Style.Title}>
          Select a Provider
        </div>
        <div className={Style.Body}>
          Select a provider to configure api settings.
        </div>
      </div>
    );
  }
  //
  switch (selectedProvider?.toLowerCase()) {
    case "coinbase":
      return (
        <div className={Style.Page}>
          <div className={Style.Title}>
            Coinbase
          </div>
          <Coinbase_Api />
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
//
export default Connect_Provider;
/* ---------------------------------------------------------------------------------- */
