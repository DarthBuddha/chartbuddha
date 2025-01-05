//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Subscribe Data
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Interface
import { useContext_Interface } from 'interface/old/Context_Interface';
// Components
import Coinbase_Subscribe from 'broker/coinbase/Coinbase_Subscribe';
// CSS Modules
import Style from './Subscribe_Data.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const Subscribe_Data: React.FC = () => {
  const { selected_Broker } = useContext_Interface();

  if (!selected_Broker) {
    return (
      <div className={Style.Page}>
        <div className={Style.Title}>Select a Provider</div>
        <div className={Style.Body}>Select a provider to configure api settings.</div>
      </div>
    );
  }

  switch (selected_Broker?.toLowerCase()) {
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

export default Subscribe_Data;
//
/* ------------------------------------------------------------------------------------------------------------------ */
