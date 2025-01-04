//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Subscribe DataApi List
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Tauri
import { info } from '@tauri-apps/plugin-log';
// Interface
import { useContext_Interface } from 'interface/Context_Interface';
// CSS Modules
import Style from './Subscribe_Broker_List.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const Subscribe_DataApi_List: React.FC = () => {
  const { setFocus_Broker } = useContext_Interface();
  const { setFocus_ProductName } = useContext_Interface();
  const { setFocus_ProductType } = useContext_Interface();

  // Handle Broker Click
  const handleClick = (broker: string) => {
    setFocus_Broker(broker);
    setFocus_ProductType('spot');
    setFocus_ProductName(null);
    info(`\nBroker: ${broker}\nProduct Type: spot\nProduct Name: null`);
  };

  return (
    <div className={Style.List_Container}>
      <div className={Style.Title_Bar}>Brokers</div>
      <div className={Style.List}>
        <div className={Style.Row} onClick={() => handleClick('binance')}>
          Binance
        </div>
        <div className={Style.Row} onClick={() => handleClick('coinbase')}>
          Coinbase
        </div>
      </div>
    </div>
  );
};

export default Subscribe_DataApi_List;
//
/* ------------------------------------------------------------------------------------------------------------------ */
