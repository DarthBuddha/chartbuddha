//! # List Subscriptions
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { useState, useEffect } from 'react';
// Tauri
import { getStore } from '@tauri-apps/plugin-store';
// import { debug, error, info } from '@tauri-apps/plugin-log';
// Components
// import { useInterfaceContext } from 'interface/Interface_Context';
// CSS Modules
import Style from './List_Subscriptions.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const List_Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<{ id: string; product_id: string }[]>([]);
  const [storeSubscriptions, setStoreSubscriptions] = useState<{
    get: (key: string) => Promise<{ id: string; product_id: string }[] | undefined>;
  } | null>(null);

  useEffect(() => {
    const initializeStore = async () => {
      const store = await getStore('.subscriptions.json');
      setStoreSubscriptions(store);
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

  return (
    <div className={Style.Component}>
      <div className={Style.Title}>Subscriptions</div>
      <div className={Style.Subscriptions_List}>
        {subscriptions.map((sub) => (
          <div key={sub.id} className={Style.Subscription}>
            {sub.product_id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List_Subscriptions;
//
/* ------------------------------------------------------------------------------------------------------------------ */
