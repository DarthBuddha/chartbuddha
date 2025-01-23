/* ---------------------------------------------------------------------------------------------- */
//! - pages/connect/ConnectData.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react';
// Interface
import { useInterfaceContext } from 'context/InterfaceContext';
// Components
import Coinbase_Connect from './coinbase/ConnectCoinbase';
// CSS Modules
import Style from './ConnectData.module.css';

/* ---------------------------------------------------------------------------------------------- */

const ConnectData: React.FC = () => {
  // State Management
  const { selApi } = useInterfaceContext();

  switch (selApi) {
    case 'binance':
      return (
        <div className={Style.Component}>
          <div className={Style.Title}>Binance</div>
          <div className={Style.Main_Container}>Binance API is not supported yet.</div>
        </div>
      );

    case 'coinbase':
      return (
        <div className={Style.Component}>
          <Coinbase_Connect />
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

export default ConnectData;

/* ---------------------------------------------------------------------------------------------- */
