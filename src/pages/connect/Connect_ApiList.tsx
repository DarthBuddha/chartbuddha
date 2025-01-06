/* ---------------------------------------------------------------------------------------------- */
//! - Connect_APIList.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react';
// Tauri
import { load } from '@tauri-apps/plugin-store';
// CSS Modules
import Style from './Connect_ApiList.module.css';

/* ---------------------------------------------------------------------------------------------- */

interface Connect_ApiList_Props {
  setDataApi: (dataApi: string) => void;
}

/* ---------------------------------------------------------------------------------------------- */

const store = await load('.interface.json');

/* ---------------------------------------------------------------------------------------------- */

const Connect_ApiList: React.FC<Connect_ApiList_Props> = ({ setDataApi }) => {
  // Handle Data Api Click
  const handleClick = async (dataApi: string) => {
    await store.set('pageConnect', { dataApi });
    setDataApi(dataApi);
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

export default Connect_ApiList;

/* ---------------------------------------------------------------------------------------------- */
