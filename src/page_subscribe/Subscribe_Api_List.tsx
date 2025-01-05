//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Subscribe Api List
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Tauri
import { info } from '@tauri-apps/plugin-log';
// Interface
import { useContext_Interface } from 'interface/Context_Interface';
// CSS Modules
import Style from './Subscribe_Api_List.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const Subscribe_Api_List: React.FC = () => {
  const { selected_Broker, setFocus_Broker } = useContext_Interface();
  const { setFocus_ProductType } = useContext_Interface();
  const { setFocus_ProductName } = useContext_Interface();

  // Handle Data Api Click
  const handleClick = (broker: string) => {
    if (selected_Broker != broker) {
      setFocus_Broker(broker);
      info(`Api: ${broker}`);
    } else {
      setFocus_Broker(broker);
      setFocus_ProductType('spot');
      setFocus_ProductName(null);
      info(`Broker: ${broker}\nProduct Type: spot\nProduct Name: null`);
    }
  };

  return (
    <div className={Style.List_Container}>
      <div className={Style.Title_Bar}>Apis</div>
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

export default Subscribe_Api_List;
//
/* ------------------------------------------------------------------------------------------------------------------ */
