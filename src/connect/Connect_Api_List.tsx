//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Connect API List
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Tauri
import { load } from '@tauri-apps/plugin-store';
// import { info } from '@tauri-apps/plugin-log';
// Interface
// import { useContext_Interface } from 'interface/Context_Interface';
// CSS Modules
import Style from './Connect_Api_List.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const store = await load('.interface.json');
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Connect_Api_List: React.FC = () => {
  // Handle Data Api Click
  const handleClick = async (api: string) => {
    await store.set('connect', { api: api });
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

export default Connect_Api_List;
//
/* ------------------------------------------------------------------------------------------------------------------ */
