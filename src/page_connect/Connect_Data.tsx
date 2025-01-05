//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Connect Data
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Tauri
import { load } from '@tauri-apps/plugin-store';
// Interface
// import { useContext_Interface } from 'interface/Context_Interface';
// Components
import Coinbase_Connect from 'page_connect/coinbase/Coinbase_Connect';
// CSS Modules
import Style from './Connect_Data.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const store = await load('.interface.json');
const selected = await store.get<{ api: string }>('connect');
//
/* ------------------------------------------------------------------------------------------------------------------ */
const Connect_Data: React.FC = () => {
  // const { selected_Api } = useContext_Interface();

  if (!selected) {
    return (
      <div className={Style.Component}>
        <div className={Style.Title}>Select a Provider</div>
        <div className={Style.Main_Container}>Select a provider to configure api settings.</div>
      </div>
    );
  }

  switch (selected.api) {
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
