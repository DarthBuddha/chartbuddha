// ---------------------------------------------------------------------------------------------- //
//! - Subscribe_Api_List.tsx
// ---------------------------------------------------------------------------------------------- //

// React
import React, { useEffect, useState } from 'react';
// Tauri
import { info, error } from '@tauri-apps/plugin-log';
import { load } from '@tauri-apps/plugin-store';
// CSS Modules
import Style from './Subscribe_Api_List.module.css';

/* ---------------------------------------------------------------------------------------------- */

interface Subscribe_Api_List_Props {
  set_api_data: (api_data: string) => void;
}

/* ---------------------------------------------------------------------------------------------- */

const store_nav_subscribe = await load('.nav_subscribe.json');
const store_app_apis = await load('app_apis.json');

/* ---------------------------------------------------------------------------------------------- */

const Subscribe_Api_List: React.FC<Subscribe_Api_List_Props> = ({ set_api_data }) => {
  // State Management
  const [apiList, setApiList] = useState<string[]>([]);

  // Load Keys
  useEffect(() => {
    info('useEffect: Calling load_api_list');
    load_api_list();
  }, []);

  // Load Api List
  const load_api_list = async () => {
    try {
      const apis = ['binance', 'coinbase']; // Add more APIs as needed
      const configuredApis: string[] = [];

      for (const api of apis) {
        // Fetch the entire object
        const apiData = await store_app_apis.get<{ api_configured: boolean }>(api);
        if (apiData && apiData.api_configured) {
          info(`API '${api}' is configured: ${apiData.api_configured}`);
          configuredApis.push(api);
        } else {
          info(`API '${api}' is not configured`);
        }
      }

      info(`Configured APIs: ${JSON.stringify(configuredApis)}`);
      setApiList(configuredApis);
    } catch (err) {
      if (err instanceof Error) {
        error(`Error loading API list: ${err.message}`);
      } else {
        error(`Unexpected error: ${String(err)}`);
      }
    }
  };

  // Button Click: Handle Data Api
  const buttonClick_Api_Menu = async (api_data: string) => {
    const currentNavSubscribe = await store_nav_subscribe.get<{ [key: string]: string | null }>(
      'nav_subscribe',
    );
    const updatedNavSubscribe = { ...currentNavSubscribe, api_data };
    await store_nav_subscribe.set('nav_subscribe', updatedNavSubscribe);
    set_api_data(api_data);
  };

  return (
    <div className={Style.List_Container}>
      <div className={Style.Title_Bar}>Apis</div>
      <div className={Style.List}>
        {apiList.length === 0 ? (
          <div className={Style.Row}>Please configure your API keys on the Connect page.</div>
        ) : (
          apiList.map((api) => (
            <div key={api} className={Style.Row} onClick={() => buttonClick_Api_Menu(api)}>
              {api.charAt(0).toUpperCase() + api.slice(1)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Subscribe_Api_List;

/* ---------------------------------------------------------------------------------------------- */
