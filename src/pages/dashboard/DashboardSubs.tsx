/* ------------------------------------------------------------------------------------------------------------------ */
//! pages/dashboard/DashboardSubs.tsx
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React, { useEffect, useState } from 'react';
// Tauri
import { error } from '@tauri-apps/plugin-log';
import { load } from '@tauri-apps/plugin-store';
// Interface
import { useInterfaceContext } from 'interface/InterfaceContext';
// CSS Modules
import Style from './DashboardSubs.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */

// Load Tauri Store
const store_app_subscriptions = await load('app_subscriptions.json');

/* ------------------------------------------------------------------------------------------------------------------ */

const ConnectLeftPanel: React.FC = () => {
  // State Management
  const { setApi, setProduct } = useInterfaceContext();

  // Store Management
  const [selectedApiListStore, setSelectedApiListStore] = useState<{ api: string; product: string }[]>([]);

  // Load Keys
  useEffect(() => {
    load_subscriptions_list();
  }, []);

  // Load Subscriptions List
  const load_subscriptions_list = async () => {
    try {
      const apis = ['binance', 'coinbase']; // Add more APIs as needed
      const configuredApis: { api: string; product: string }[] = [];

      for (const api of apis) {
        const apiData = await store_app_subscriptions.get<{ product_id: string }[]>(api);
        if (apiData) {
          apiData.forEach((subscription) => {
            configuredApis.push({ api, product: subscription.product_id });
          });
        }
      }

      setSelectedApiListStore(configuredApis);
    } catch (err) {
      if (err instanceof Error) {
        error(`Error loading subscriptions list: ${err.message}`);
      } else {
        error(`Unexpected error: ${String(err)}`);
      }
    }
  };

  // Button Click: Handle Data Api
  const handleClick = async (selApi: string, selProduct: string) => {
    const resetApi = ['binance', 'coinbase'];
    const resetProduct = selProduct;
    // Logic: Reset Context
    if (resetApi.includes(selApi)) {
      setApi(selApi);
      setProduct(resetProduct);
    }
  };
  /* ---------------------------------------------------------------------------------------------------------------- */
  return (
    <div className={Style.DashboardSubs}>
      <div className={Style.Title_Bar}>Subscriptions</div>
      <div className={Style.List}>
        {selectedApiListStore.length === 0 ? (
          <div className={Style.Row}>Your Subscription List.</div>
        ) : (
          selectedApiListStore.map(({ api, product }) => (
            <div key={`${api}-${product}`} className={Style.Row} onClick={() => handleClick(api, product)}>
              {`${api.charAt(0).toUpperCase() + api.slice(1)} - ${product}`}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConnectLeftPanel;
/* ------------------------------------------------------------------------------------------------------------------ */
