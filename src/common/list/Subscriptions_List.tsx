//! # Subscriptions List
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { useState, useEffect } from 'react';
// Tauri
import { getStore, Store } from '@tauri-apps/plugin-store';
import { invoke } from '@tauri-apps/api/core';
import { error } from '@tauri-apps/plugin-log';
// Interface
import { useContext_Broker } from 'interface/Context_Broker';
// CSS Modules
import Style from './List.module.css';

//
/* ------------------------------------------------------------------------------------------------------------------ */
//
let store_subscriptions: Store | null = null;
getStore('.subscriptions.json').then((store) => {
  store_subscriptions = store;
});

// const store = await getStore('.subscriptions.json');
//
const Subscriptions_List: React.FC = () => {
  const { setSelectedBroker, setSelectedProduct } = useContext_Broker();
  const [subscriptions, setSubscriptions] = useState<{ id: string; product_id: string }[]>([]);
  const [storeSubscriptions, setStoreSubscriptions] = useState<{
    get: (key: string) => Promise<{ id: string; product_id: string }[] | undefined>;
  } | null>(null);

  useEffect(() => {
    const initializeStore = async () => {
      setStoreSubscriptions(store_subscriptions);
    };
    initializeStore();
  }, []);

  useEffect(() => {
    const loadSubscriptions = async () => {
      if (storeSubscriptions) {
        const subs = await storeSubscriptions.get('subscriptions');
        setSubscriptions(Array.isArray(subs) ? subs : []);
      }
    };
    loadSubscriptions();
  }, [storeSubscriptions]);

  const handleSubscriptionClick = async (subscription: { id: string; product_id: string }) => {
    setSelectedBroker(subscription.id);
    try {
      const productData = await invoke('coinbase_get_selected_product', { productId: subscription.product_id });
      const parsedProductData = JSON.parse(productData as string);
      setSelectedProduct(parsedProductData);
    } catch (err) {
      error('Failed to fetch product data: ' + String(err));
    }
  };

  return (
    <div className={Style.List_Container}>
      <div className={Style.Title_Bar}>Subscriptions</div>
      <div className={Style.List}>
        {subscriptions.map((sub) => (
          <div key={sub.product_id} className={Style.Row} onClick={() => handleSubscriptionClick(sub)}>
            <div>{sub.id}</div>
            <div>{sub.product_id}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions_List;
//
/* ------------------------------------------------------------------------------------------------------------------ */
