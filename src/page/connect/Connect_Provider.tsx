//! # Connect Provider Settings
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Interface
import { useContext_Broker } from 'interface/Context_Broker';
// Components
import Coinbase_Api from '../../broker/coinbase/Coinbase_Api';
// CSS Modules
import Style from './Connect_Provider.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
const Connect_Provider: React.FC = () => {
  const { selectedBroker } = useContext_Broker();

  if (!selectedBroker) {
    return (
      <div className={Style.Component}>
        <div className={Style.Title}>Select a Provider</div>
        <div className={Style.Main_Container}>Select a provider to configure api settings.</div>
      </div>
    );
  }

  switch (selectedBroker?.toLowerCase()) {
    case 'coinbase':
      return (
        <div className={Style.Component}>
          <div className={Style.Title}>Coinbase</div>
          <Coinbase_Api />
        </div>
      );
    case 'binance':
      return (
        <div className={Style.Component}>
          <div className={Style.Title}>Binance</div>
          <div className={Style.Main_Container}>Binance API is not supported yet.</div>
        </div>
      );
    default:
      return (
        <div className={Style.Component}>
          <div className={Style.Title}>Select a Provider</div>
          <div className={Style.Main_Container}>Select a provider to configure api settings.</div>
        </div>
      );
  }
};

export default Connect_Provider;
//
/* ------------------------------------------------------------------------------------------------------------------ */
