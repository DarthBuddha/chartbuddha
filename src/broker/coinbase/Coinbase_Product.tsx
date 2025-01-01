//! # CoinbaseProduct
//!
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
  const { selectedBroker, selectedProduct } = useContext_Broker();
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

      if (selectedProduct) {
        if (!storeSubscriptions) {
          throw new Error('storeSubscriptions is null');
        }
        const existingSubscriptions = await storeSubscriptions.get('subscriptions');
        const newSubscription = { id: 'coinbase', product_id: selectedProduct.product_id };
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

      if (selectedProduct) {
        if (!storeSubscriptions) {
          throw new Error('storeSubscriptions is null');
        }
        const existingSubscriptions = await storeSubscriptions.get('subscriptions');
        const updatedSubscriptions = Array.isArray(existingSubscriptions)
          ? existingSubscriptions.filter((sub) => sub.product_id !== selectedProduct.product_id)
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
        <div className={Style.Selection_Title}>Selected: {selectedBroker ? selectedBroker : 'None'}</div>
        <div className={Style.Selection_Title}>Selected: {selectedProduct ? selectedProduct.display_name : 'None'}</div>
      </div>

      <div className={Style.Product_Container}>
        {selectedProduct && (
          <div>
            <div>Product ID: {selectedProduct.product_id}</div>
            <div>Price: {selectedProduct.price}</div>
            <div>Price Change (24h): {selectedProduct.price_percentage_change_24h}%</div>
            <div>Volume (24h): {selectedProduct.volume_24h}</div>
            <div>Volume Change (24h): {selectedProduct.volume_percentage_change_24h}%</div>
            <div>Base Increment: {selectedProduct.base_increment}</div>
            <div>Quote Increment: {selectedProduct.quote_increment}</div>
            <div>Quote Min Size: {selectedProduct.quote_min_size}</div>
            <div>Quote Max Size: {selectedProduct.quote_max_size}</div>
            <div>Base Min Size: {selectedProduct.base_min_size}</div>
            <div>Base Max Size: {selectedProduct.base_max_size}</div>
            <div>Base Name: {selectedProduct.base_name}</div>
            <div>Quote Name: {selectedProduct.quote_name}</div>
            <div>Status: {selectedProduct.status}</div>
            <div>Cancel Only: {selectedProduct.cancel_only ? 'Yes' : 'No'}</div>
            <div>Limit Only: {selectedProduct.limit_only ? 'Yes' : 'No'}</div>
            <div>Post Only: {selectedProduct.post_only ? 'Yes' : 'No'}</div>
            <div>Trading Disabled: {selectedProduct.trading_disabled ? 'Yes' : 'No'}</div>
            <div>Auction Mode: {selectedProduct.auction_mode ? 'Yes' : 'No'}</div>
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
