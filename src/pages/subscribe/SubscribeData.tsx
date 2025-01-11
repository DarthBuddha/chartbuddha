// ---------------------------------------------------------------------------------------------- //
//! - Subscribe_Data.tsx
// ---------------------------------------------------------------------------------------------- //

// React
import React from 'react';
// Interface
import { useInterfaceContext } from 'interface/InterfaceContext';
// Components
import Coinbase_Subscribe from './coinbase/Coinbase_Subscribe';
// CSS Modules
import Style from './SubscribeData.module.css';

/* ---------------------------------------------------------------------------------------------- */

const SubscribeData: React.FC = () => {
  // State Management
  const { selectedApi } = useInterfaceContext();

  switch (selectedApi) {
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

export default SubscribeData;

/* ---------------------------------------------------------------------------------------------- */
