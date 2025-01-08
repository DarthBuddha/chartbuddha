/* ---------------------------------------------------------------------------------------------- */
//! - Connect_APIList.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react';
// Tauri
// import { info } from '@tauri-apps/plugin-log';
import { load } from '@tauri-apps/plugin-store';
// CSS Modules
import Style from './Connect_Api_List.module.css';

/* ---------------------------------------------------------------------------------------------- */

interface Connect_Api_List_Props {
  set_data_api: (data_api: string) => void;
}

/* ---------------------------------------------------------------------------------------------- */

const store = await load('.nav_connect.json');

/* ---------------------------------------------------------------------------------------------- */

const Connect_Api_List: React.FC<Connect_Api_List_Props> = ({ set_data_api }) => {
  // Handle Data Api Click
  const handleClick = async (data_api: string) => {
    await store.set('nav_connect', { data_api });
    set_data_api(data_api);
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

/* ---------------------------------------------------------------------------------------------- */
