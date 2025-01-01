//! # Subscribe Product Panel
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Interface
import { useContext_Broker } from 'interface/Context_Broker';
// Components
import Coinbase_Subscribe from 'broker/coinbase/Coinbase_Subscribe';
// CSS Modules
import Style from './Subscribe_Panel.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Subscribe_Product_Panel: React.FC = () => {
  const { selectedBroker } = useContext_Broker();

  if (!selectedBroker) {
    return (
      <div className={Style.Page}>
        <div className={Style.Title}>Select a Provider</div>
        <div className={Style.Body}>Select a provider to configure api settings.</div>
      </div>
    );
  }

  switch (selectedBroker?.toLowerCase()) {
    case 'coinbase':
      return (
        <div className={Style.Page}>
          <Coinbase_Subscribe />
        </div>
      );
    case 'binance':
      return (
        <div className={Style.Page}>
          <div className={Style.Title}>Binance</div>
          <div className={Style.Body}>Binance API is not supported yet.</div>
        </div>
      );
    default:
      return (
        <div className={Style.Page}>
          <div className={Style.Title}>Select a Provider</div>
          <div className={Style.Body}>Select a provider to configure api settings.</div>
        </div>
      );
  }
};

export default Subscribe_Product_Panel;
//
/* ------------------------------------------------------------------------------------------------------------------ */
