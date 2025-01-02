//! Coinbase Product
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { useEffect, useState } from 'react';
// Tauri
import { getStore, Store } from '@tauri-apps/plugin-store';
import { debug, error, info } from '@tauri-apps/plugin-log';
// Interface
import { useContext_Broker } from 'interface/Context_Broker';
// CSS Modules
import Style from './Coinbase_Product.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Coinbase_Product: React.FC = () => {
  const { selected_Broker, selected_BrokerProduct, selected_BrokerProductData } = useContext_Broker();
  const [storeSubscriptions, setStoreSubscriptions] = useState<Store | null>(null);

  useEffect(() => {
    const initializeStore = async () => {
      const store = await getStore('.subscriptions.json');
      setStoreSubscriptions(store);
    };
    initializeStore();
  }, []);

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      error(`Error: ${err.message}\nStack: ${err.stack}`);
    } else {
      error(`An unknown error occurred: ${JSON.stringify(err)}`);
    }
  };

  const Subscribe_Button = async () => {
    try {
      info('Subscribing...');

      if (selected_BrokerProduct) {
        if (!storeSubscriptions) {
          throw new Error('storeSubscriptions is null');
        }
        const existingSubscriptions = await storeSubscriptions.get('subscriptions');
        if (!selected_BrokerProductData) {
          throw new Error('selected_BrokerProductData is null');
        }
        const newSubscription = { id: 'coinbase', product_id: selected_BrokerProductData.product_id };
        const updatedSubscriptions = Array.isArray(existingSubscriptions)
          ? [...existingSubscriptions, newSubscription]
          : [newSubscription];

        await storeSubscriptions.set('subscriptions', updatedSubscriptions);
        await storeSubscriptions.save();
        debug('Saved selected product ID to the store');
      }

      info('Subscribed successfully');
    } catch (err) {
      handleError(err);
    }
  };

  const UnSubscribe_Button = async () => {
    try {
      info('Unsubscribing...');

      if (selected_BrokerProduct) {
        if (!storeSubscriptions) {
          throw new Error('storeSubscriptions is null');
        }
        const existingSubscriptions = await storeSubscriptions.get('subscriptions');
        const updatedSubscriptions = Array.isArray(existingSubscriptions)
          ? existingSubscriptions.filter(
              (sub) => selected_BrokerProductData && sub.product_id !== selected_BrokerProductData.product_id,
            )
          : [];

        await storeSubscriptions.set('subscriptions', updatedSubscriptions);
        await storeSubscriptions.save();
        debug('Removed selected product ID from the store');
      }

      info('Unsubscribed successfully');
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className={Style.Page}>
      <div className={Style.Selection_Menu}>
        <div className={Style.Selection_Title}>Selected: {selected_Broker ? selected_Broker : 'Select Broker'}</div>
        <div className={Style.Selection_Title}>
          Selected:{' '}
          {selected_BrokerProduct && selected_BrokerProductData
            ? selected_BrokerProductData.display_name
            : 'Select Product'}
        </div>
      </div>

      <div className={Style.Product_Container}>
        {selected_BrokerProduct && (
          <div>
            {selected_BrokerProductData && (
              <>
                <div>Product ID: {selected_BrokerProductData.product_id}</div>
                <div>Price: {selected_BrokerProductData.price}</div>
                <div>Price Change (24h): {selected_BrokerProductData.price_percentage_change_24h}%</div>
                <div>Volume (24h): {selected_BrokerProductData.volume_24h}</div>
                <div>Volume Change (24h): {selected_BrokerProductData.volume_percentage_change_24h}%</div>
                <div>Base Increment: {selected_BrokerProductData.base_increment}</div>
                <div>Quote Increment: {selected_BrokerProductData.quote_increment}</div>
                <div>Quote Min Size: {selected_BrokerProductData.quote_min_size}</div>
                <div>Quote Max Size: {selected_BrokerProductData.quote_max_size}</div>
                <div>Base Min Size: {selected_BrokerProductData.base_min_size}</div>
                <div>Base Max Size: {selected_BrokerProductData.base_max_size}</div>
                <div>Base Name: {selected_BrokerProductData.base_name}</div>
                <div>Quote Name: {selected_BrokerProductData.quote_name}</div>
                <div>Status: {selected_BrokerProductData.status}</div>
                <div>Cancel Only: {selected_BrokerProductData.cancel_only ? 'Yes' : 'No'}</div>
                <div>Limit Only: {selected_BrokerProductData.limit_only ? 'Yes' : 'No'}</div>
                <div>Post Only: {selected_BrokerProductData.post_only ? 'Yes' : 'No'}</div>
                <div>Trading Disabled: {selected_BrokerProductData.trading_disabled ? 'Yes' : 'No'}</div>
                <div>Auction Mode: {selected_BrokerProductData.auction_mode ? 'Yes' : 'No'}</div>
              </>
            )}
          </div>
        )}
      </div>

      <div className={Style.Button_Container}>
        <button className={Style.Subscribe_Button} onClick={Subscribe_Button}>
          Subscribe
        </button>
        <button className={Style.UnSubscribe_Button} onClick={UnSubscribe_Button}>
          UnSubscribe
        </button>
      </div>
    </div>
  );
};
//
export default Coinbase_Product;
