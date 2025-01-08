// ---------------------------------------------------------------------------------------------- //
//! - Subscribe_Data.tsx
// ---------------------------------------------------------------------------------------------- //

// React
import React from 'react';
// Interface
// import { useContext_Interface } from 'interface/context/Context_Interface';
// Components
import Coinbase_Subscribe from './coinbase/Coinbase_Subscribe';
// CSS Modules
import Style from './Subscribe_Data.module.css';

/* ---------------------------------------------------------------------------------------------- */

interface Subscribe_Data_Props {
  data_api: string;
}

/* ---------------------------------------------------------------------------------------------- */

const Subscribe_Data: React.FC<Subscribe_Data_Props> = ({ data_api }) => {
  if (!data_api) {
    return (
      <div className={Style.Page}>
        <div className={Style.Title}>Select a Provider</div>
        <div className={Style.Body}>Select a provider to configure api settings.</div>
      </div>
    );
  }

  switch (data_api) {
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

/* ---------------------------------------------------------------------------------------------- */
