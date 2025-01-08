// ---------------------------------------------------------------------------------------------- //
//! - Coinbase Product
// ---------------------------------------------------------------------------------------------- //

// React
import React from 'react';
// import React, { useEffect, useState } from 'react';
// Tauri
// import { getStore, Store } from '@tauri-apps/plugin-store';
// import { debug, error, info } from '@tauri-apps/plugin-log';
// Interface
import { useContext_Interface } from 'context/Context_Interface';
// CSS Modules
import Style from './Coinbase_Product.module.css';

/* ---------------------------------------------------------------------------------------------- */
//
const Coinbase_Product: React.FC = () => {
  const { selected_Broker, selected_ProductName, selected_ProductData } = useContext_Interface();
  // const [storeSubscriptions, setStoreSubscriptions] = useState<Store | null>(null);

  // useEffect(() => {
  //   const initializeStore = async () => {
  //     const store = await getStore('.subscriptions.json');
  //     setStoreSubscriptions(store);
  //   };
  //   initializeStore();
  // }, []);

  // const handleError = (err: unknown) => {
  //   if (err instanceof Error) {
  //     error(`Error: ${err.message}\nStack: ${err.stack}`);
  //   } else {
  //     error(`An unknown error occurred: ${JSON.stringify(err)}`);
  //   }
  // };

  const Subscribe_Button = async () => {};

  const UnSubscribe_Button = async () => {};

  return (
    <div className={Style.Page}>
      <div className={Style.Selection_Menu}>
        <div className={Style.Selection_Title}>
          Selected: {selected_Broker ? selected_Broker : 'Select Broker'}
        </div>
        <div className={Style.Selection_Title}>
          Selected:{' '}
          {selected_ProductName && selected_ProductData
            ? selected_ProductData.display_name
            : 'Select Product'}
        </div>
      </div>
      <div className={Style.Product_Container}>
        {selected_ProductName && (
          <div>
            {selected_ProductData && (
              <>
                <div>Product ID: {selected_ProductData.product_id}</div>
                <div>Price: {selected_ProductData.price}</div>
                <div>Price Change (24h): {selected_ProductData.price_percentage_change_24h}%</div>
                <div>Volume (24h): {selected_ProductData.volume_24h}</div>
                <div>Volume Change (24h): {selected_ProductData.volume_percentage_change_24h}%</div>
                <div>Base Increment: {selected_ProductData.base_increment}</div>
                <div>Quote Increment: {selected_ProductData.quote_increment}</div>
                <div>Quote Min Size: {selected_ProductData.quote_min_size}</div>
                <div>Quote Max Size: {selected_ProductData.quote_max_size}</div>
                <div>Base Min Size: {selected_ProductData.base_min_size}</div>
                <div>Base Max Size: {selected_ProductData.base_max_size}</div>
                <div>Base Name: {selected_ProductData.base_name}</div>
                <div>Quote Name: {selected_ProductData.quote_name}</div>
                <div>Status: {selected_ProductData.status}</div>
                <div>Cancel Only: {selected_ProductData.cancel_only ? 'Yes' : 'No'}</div>
                <div>Limit Only: {selected_ProductData.limit_only ? 'Yes' : 'No'}</div>
                <div>Post Only: {selected_ProductData.post_only ? 'Yes' : 'No'}</div>
                <div>Trading Disabled: {selected_ProductData.trading_disabled ? 'Yes' : 'No'}</div>
                <div>Auction Mode: {selected_ProductData.auction_mode ? 'Yes' : 'No'}</div>
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
