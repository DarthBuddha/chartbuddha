// ---------------------------------------------------------------------------------------------- //
//! - Subscribe_Sub_List.tsx
// ---------------------------------------------------------------------------------------------- //

// React
import React from 'react';
// Tauri
// import { info } from '@tauri-apps/plugin-log';
import { load } from '@tauri-apps/plugin-store';
// CSS Modules
import Style from './Subscribe_Sub_List.module.css';

/* ---------------------------------------------------------------------------------------------- */

interface Connect_Api_List_Props {
  set_data_api: (data_api: string) => void;
}

/* ---------------------------------------------------------------------------------------------- */
//
// const store = await getStore('.subscriptions.json');
//
const Subscribe_Sub_List: React.FC<Connect_Api_List_Props> = ({ set_data_api }) => {
  // Handle Data Api Click
  const handleClick = async (data_api: string) => {
    await store.set('nav_subscription', { data_api });
    set_data_api(data_api);
  };

  return (
    <div className={Style.List_Container}>
      <div className={Style.Title_Bar}>Subscriptions</div>
      {/* <div className={Style.List}>
        {subscriptions.map((data_api) => (
          <div
            key={data_api.product_id}
            className={Style.Row}
            onClick={() => handleClick(data_api)}
          >
            <div>{data_api.id}</div>
            <div>{data_api.product_id}</div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Subscribe_Sub_List;
//
/* ---------------------------------------------------------------------------------------------- */
