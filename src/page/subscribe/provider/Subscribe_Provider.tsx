//! # Subscribe Product
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Interface
import { useInterface_ProviderContext } from 'interface/Interface_ProviderContext';
// Components
import Coinbase_Subscribe from './coinbase/Coinbase_Subscribe';
// CSS Modules
import Style from './Subscribe_Provider.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Subscribe_Provider: React.FC = () => {
  const { selectedProvider } = useInterface_ProviderContext();

  if (!selectedProvider) {
    return (
      <div className={Style.Page}>
        <div className={Style.Title}>Select a Provider</div>
        <div className={Style.Body}>Select a provider to configure api settings.</div>
      </div>
    );
  }

  switch (selectedProvider?.toLowerCase()) {
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

export default Subscribe_Provider;
//
/* ------------------------------------------------------------------------------------------------------------------ */
