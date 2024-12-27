//! # Subscribe Product
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React from "react";
// Components
import Subscribe_Provider_Coinbase from "./coinbase/Subscribe_Provider_Coinbase";
import { useSubscriptionContext } from "../interface/Interface_Subscribe";
// CSS Modules
import Style from "./Subscribe_Provider.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Subscribe_Provider: React.FC = () => {
  const { selectedProvider } = useSubscriptionContext();
  //
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
  //
  switch (selectedProvider?.toLowerCase()) {
    case "coinbase":
      return (
        <div className={Style.Page}>
          <Subscribe_Provider_Coinbase />
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
export default Subscribe_Provider;
/* ---------------------------------------------------------------------------------- */
