//! # Connect Provider Settings
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Local
import Coinbase_Api from './coinbase/Coinbase_Api';
import { useInterfaceContext } from 'interface/Interface_Context';
// CSS
import Style from './Connect_Provider.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
const Connect_Provider: React.FC = () => {
  const { selectedProvider } = useInterfaceContext();

  if (!selectedProvider) {
    return (
      <div className={Style.Component}>
        <div className={Style.Title}>Select a Provider</div>
        <div className={Style.Main_Container}>Select a provider to configure api settings.</div>
      </div>
    );
  }

  switch (selectedProvider?.toLowerCase()) {
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
