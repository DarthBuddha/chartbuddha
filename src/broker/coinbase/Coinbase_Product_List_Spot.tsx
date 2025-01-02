//! # Coinbase Product List Spot
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { useEffect, useState, useCallback } from 'react';
// Tauri
import { getStore } from '@tauri-apps/plugin-store';
import { listen } from '@tauri-apps/api/event';
import { debug, error } from '@tauri-apps/plugin-log';
import { invoke } from '@tauri-apps/api/core';
// Interface
import { Type_BrokerProductData } from 'interface/Type_BrokerProductData';
import { useContext_Broker } from 'interface/Context_Broker';
// CSS Modules
import Style from './Coinbase_Product_List_Spot.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const store_interface = await (async () => {
  try {
    return await getStore('.broker.json');
  } catch (err) {
    error('Failed to load interface store: ' + String(err));
    throw err;
  }
})();
//
const POLLING_INTERVAL = 1000; // 1 second
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Coinbase_Product_List_Spot: React.FC = () => {
  // Get selected product from the context
  const { setSelected_BrokerProductData, fetch_BrokerProductData } = useContext_Broker();

  // State to store the products
  const [spotProducts, setSpotProducts] = useState<Type_BrokerProductData[]>([]);

  // Function to handle errors
  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      error(`Error: ${err.message}\nStack: ${err.stack}`);
    } else {
      error(`An unknown error occurred: ${JSON.stringify(err)}`);
    }
  };

  // Function to load products from the Tauri store
  const loadSpotProducts = useCallback(async () => {
    try {
      const store_coinbase_products = await getStore('coinbase_products.json');
      if (!store_coinbase_products) {
        throw new Error('Failed to load coinbase products store');
      }
      const allProducts =
        ((await store_coinbase_products.get('products')) as { SPOT?: Type_BrokerProductData[] }) || {};
      const spotProducts = allProducts?.SPOT || [];
      setSpotProducts(spotProducts);
      // info('Spot products loaded successfully.');
    } catch (err) {
      handleError(err);
    }
  }, []);

  useEffect(() => {
    // Initial load of products
    loadSpotProducts();

    // Listen for `coinbase_list_products_loaded` event
    const unlisten = listen('coinbase_list_products_loaded', async () => {
      // Reload products when the event is received
      await loadSpotProducts();
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unlisten.then((f) => f());
    };
  }, [loadSpotProducts]);

  useEffect(() => {
    // Initial load of products
    loadSpotProducts();

    // Polling mechanism to update products periodically
    const intervalId = setInterval(() => {
      loadSpotProducts();
    }, POLLING_INTERVAL);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [loadSpotProducts]);

  const getStyleForValue = (value: string) => {
    return parseFloat(value) >= 0 ? Style.Positive : Style.Negative;
  };

  const formatPercentage = (value: string) => {
    return parseFloat(value).toFixed(2);
  };

  const handleProductClick = async (product: Type_BrokerProductData) => {
    setSelected_BrokerProductData(product);
    if (store_interface) {
      await store_interface.set('selectedProduct', { value: product });
    } else {
      error('store_interface is null');
    }
    debug('Selected product: ' + JSON.stringify(product)); // Add logging here

    // Invoke the command to get the selected product data
    try {
      const productData = await invoke('coinbase_get_selected_product', { product_Id: product.product_id });
      debug('Fetched product data from API: ' + String(productData)); // Add logging here

      // Log the raw response for debugging
      debug('Raw response from API: ' + String(productData));

      // Check if the productData is empty or not a string
      if (!productData || typeof productData !== 'string') {
        throw new Error('Invalid response from API');
      }

      // Check if the productData is valid JSON
      let parsedProductData;
      try {
        parsedProductData = JSON.parse(productData);
      } catch {
        error(`Failed to decode response body: ${String(productData)}`);
        throw new Error('Failed to decode response body');
      }

      // Save the fetched product data to the store
      if (store_interface) {
        await store_interface.set('selectedProduct', { value: parsedProductData });
      } else {
        error('store_interface is null');
      }
      if (store_interface) {
        await store_interface.save();
      } else {
        error('store_interface is null');
      }

      // Fetch the latest product data
      fetch_BrokerProductData();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className={Style.Component}>
      <div className={Style.Product_List}>
        {spotProducts.map((product, index) => (
          <div key={index} className={Style.Product} onClick={() => handleProductClick(product)}>
            <div className={Style.Product_Details_Container}>
              <div className={Style.Product_Name}>
                <div>{product.display_name}</div>
                <div>Status: {product.status}</div>
              </div>
              <div className={Style.Product_Price}>
                <div>
                  Price: <span className={getStyleForValue(product.price ?? '')}>{product.price}</span>
                </div>
                <div>
                  Change (24h):{' '}
                  <span className={getStyleForValue(product.price_percentage_change_24h ?? '')}>
                    {formatPercentage(product.price_percentage_change_24h ?? '0')}%
                  </span>
                </div>
              </div>
              <div className={Style.Product_Volume}>
                <div>Volume (24h): {product.volume_24h}</div>
                <div>
                  Change (24h):{' '}
                  <span className={getStyleForValue(product.volume_percentage_change_24h ?? '')}>
                    {formatPercentage(product.volume_percentage_change_24h ?? '0')}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coinbase_Product_List_Spot;
//
/* ------------------------------------------------------------------------------------------------------------------ */
