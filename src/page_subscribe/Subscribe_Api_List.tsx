// ---------------------------------------------------------------------------------------------- //
//! - Subscribe_Api_List.tsx
// ---------------------------------------------------------------------------------------------- //

// React
import React from 'react';
// Tauri
// import { info } from '@tauri-apps/plugin-log';
import { load } from '@tauri-apps/plugin-store';
// CSS Modules
import Style from './Subscribe_Api_List.module.css';

/* ---------------------------------------------------------------------------------------------- */

interface Subscribe_Api_List_Props {
  set_data_api: (data_api: string) => void;
}

/* ---------------------------------------------------------------------------------------------- */

const store_nav_subscribe = await load('.nav_subscribe.json');
const store_app_apis = await load('app_apis.json');

/* ---------------------------------------------------------------------------------------------- */
//
const Subscribe_Api_List: React.FC<Subscribe_Api_List_Props> = ({ set_data_api }) => {
  // Handle Data Api Click
  const handleClick = async (data_api: string) => {
    await store_nav_subscribe.set('nav_subscribe', { data_api });
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

export default Subscribe_Api_List;
//
/* ---------------------------------------------------------------------------------------------- */
