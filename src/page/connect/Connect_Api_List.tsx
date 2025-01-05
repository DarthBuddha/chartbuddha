//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Connect API List
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Tauri
import { info } from '@tauri-apps/plugin-log';
// Interface
import { useContext_Interface } from 'interface/Context_Interface';
// CSS Modules
import Style from './Connect_Api_List.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const Connect_Api_List: React.FC = () => {
  const { selected_Api, setFocus_Api } = useContext_Interface();
  const { setFocus_ApiPermissions } = useContext_Interface();

  // Handle Data Api Click
  const handleClick = (api: string) => {
    if (selected_Api != api) {
      setFocus_Api(api);
      info(`Api: ${api}`);
    } else {
      setFocus_Api(null);
      setFocus_ApiPermissions(null);
      info(`Reset Values\nApi: null\nApi Permissions: null`);
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

export default Connect_Api_List;
//
/* ------------------------------------------------------------------------------------------------------------------ */
