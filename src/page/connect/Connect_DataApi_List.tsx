//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Connect Data API List
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Tauri
import { info } from '@tauri-apps/plugin-log';
// Interface
import { useContext_Interface } from 'interface/Context_Interface';
// CSS Modules
import Style from './Connect_DataApi_List.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const Connect_DataApi_List: React.FC = () => {
  const { setFocus_DataApi } = useContext_Interface();

  // Handle Broker Click
  const handleClick = (dataApi: string) => {
    setFocus_DataApi(dataApi);
    info(`\nData Api: ${dataApi}`);
  };

  return (
    <div className={Style.List_Container}>
      <div className={Style.Title_Bar}>Data Apis</div>
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

export default Connect_DataApi_List;
//
/* ------------------------------------------------------------------------------------------------------------------ */
