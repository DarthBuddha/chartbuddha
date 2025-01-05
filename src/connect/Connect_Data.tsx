/* ------------------------------------------------------------------------------------------------------------------ */
//! - Connect_Data.tsx
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Components
import Coinbase_Connect from 'connect/coinbase/Coinbase_Connect';
// CSS Modules
import Style from './Connect_Data.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */

interface Connect_Data_Props {
  dataApi: string;
}

const Connect_Data: React.FC<Connect_Data_Props> = ({ dataApi }) => {
  if (!dataApi) {
    return (
      <div className={Style.Component}>
        <div className={Style.Title}>Select a Provider</div>
        <div className={Style.Main_Container}>Select a provider to configure api settings.</div>
      </div>
    );
  }

  switch (dataApi) {
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

export default Connect_Data;

/* ------------------------------------------------------------------------------------------------------------------ */
