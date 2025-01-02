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
import Style from './Connect_Page.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
const Connect_Page: React.FC = () => {
  const { selected_Broker } = useContext_Broker();

  if (!selected_Broker) {
    return (
      <div className={Style.Component}>
        <div className={Style.Title}>Select a Provider</div>
        <div className={Style.Main_Container}>Select a provider to configure api settings.</div>
      </div>
    );
  }

  switch (selected_Broker?.toLowerCase()) {
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

export default Connect_Page;
//
/* ------------------------------------------------------------------------------------------------------------------ */
