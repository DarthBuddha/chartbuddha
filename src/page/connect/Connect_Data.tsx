//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Connect Data
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Interface
import { useContext_Interface } from 'interface/Context_Interface';
// Components
import Coinbase_Connect from 'page/connect/coinbase/Coinbase_Connect';
// CSS Modules
import Style from './Connect_Data.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
const Connect_Data: React.FC = () => {
  const { selected_Api } = useContext_Interface();

  if (!selected_Api) {
    return (
      <div className={Style.Component}>
        <div className={Style.Title}>Select a Provider</div>
        <div className={Style.Main_Container}>Select a provider to configure api settings.</div>
      </div>
    );
  }

  switch (selected_Api) {
    case 'coinbase':
      return (
        <div className={Style.Component}>
          {/* <div className={Style.Title}>Coinbase</div> */}
          <Coinbase_Connect />
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

export default Connect_Data;
//
/* ------------------------------------------------------------------------------------------------------------------ */
