/* ------------------------------------------------------------------------------------------------------------------ */
//! - pages/subscribe/Subscribe_Sub_List.tsx
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Tauri
// import { error } from '@tauri-apps/plugin-log';
// import { load } from '@tauri-apps/plugin-store';
// CSS Modules
import Style from './SubscribeSubscriptionList.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
// const store = await getStore('.subscriptions.json');
//
const SubscribeSubscriptionList: React.FC = () => {
  // Handle Data Api Click
  // const handleClick = async (api_data: string) => {
  //   await store.set('nav_subscription', { api_data });
  //   set_api_data(api_data);
  // };

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

export default SubscribeSubscriptionList;
//
/* ------------------------------------------------------------------------------------------------------------------ */
