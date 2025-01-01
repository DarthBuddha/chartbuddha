//! Interface - Broker
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { useState, useEffect, useCallback } from 'react';
// Tauri
import { getStore, Store } from '@tauri-apps/plugin-store';
import { invoke } from '@tauri-apps/api/core';
import { info, error } from '@tauri-apps/plugin-log';
// Interface
import { Context_Broker } from '../Context_Broker';
import { Type_BrokerProduct } from './Type_BrokerProduct';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
let store_interface: Store | null = null;
getStore('.interface.json').then((store) => {
  store_interface = store;
});
//
const POLLING_INTERVAL = 3000; // 3 seconds
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Interface_Broker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Selected Provider
  const [selectedBroker, setSelectedBroker] = useState<string | null>(null);
  if (selectedBroker) {
    info(selectedBroker);
  }

  // Selected Product
  const [selectedProduct, setSelectedProduct] = useState<Type_BrokerProduct | null>(null);

  // Product Data
  const [productData, setProductData] = useState<Type_BrokerProduct | null>(null);

  // Error Handler
  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      error(err.message);
    } else {
      error(`An unknown error occurred: ${JSON.stringify(err)}`);
    }
  };

  // Fetch Product Data
  const fetchProductData = useCallback(async () => {
    if (!selectedProduct) {
      setProductData(null); // Ensure productData is cleared if no product is selected
      // info('No selected product.');
      return;
    }
    try {
      const productData = await invoke('coinbase_get_selected_product', { product_id: selectedProduct.product_id });
      const parsedProductData = JSON.parse(productData as string);
      setProductData(parsedProductData);
      info('Fetched product data from API:', parsedProductData);

      // Save the fetched product data to the store
      const store_interface = await getStore('.interface.json');
      if (store_interface) {
        await store_interface.set('selectedProduct', { value: parsedProductData });
      } else {
        error('Failed to get store interface.');
      }
      if (store_interface) {
        await store_interface.save();
      } else {
        error('Failed to save store interface.');
      }
    } catch (err) {
      handleError(err);
    }
  }, [selectedProduct]);

  ///

  useEffect(() => {
    if (store_interface && selectedBroker !== null) {
      store_interface.get('target').then((target) => {
        const updatedTarget = { ...(typeof target === 'object' && target !== null ? target : {}), selectedBroker };
        store_interface?.set('target', updatedTarget).then(() => {
          store_interface?.save();
        });
      });
    }
  }, [selectedBroker]);

  ///

  useEffect(() => {
    fetchProductData();

    const intervalId = setInterval(() => {
      // info('Polling for product data...');
      fetchProductData();
    }, POLLING_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchProductData]);

  useEffect(() => {
    info(`Selected product changed: ${JSON.stringify(selectedProduct)}`);
    fetchProductData();
  }, [selectedProduct, fetchProductData]);

  const subscribeToProduct = async (product: Type_BrokerProduct | null) => {
    if (!product) return;
    try {
      await invoke('coinbase_subscribe_to_product', { product_id: product.product_id });
      info(`Subscribed to product: ${JSON.stringify(product)}`);
    } catch (err) {
      handleError(err);
    }
  };

  const unsubscribeFromProduct = async (product: Type_BrokerProduct | null) => {
    if (!product) return;
    try {
      await invoke('coinbase_unsubscribe_from_product', { product_id: product.product_id });
      info(`Unsubscribed from product: ${JSON.stringify(product)}`);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Context_Broker.Provider
      value={{
        selectedBroker,
        setSelectedBroker,
        selectedProduct,
        setSelectedProduct,
        productData,
        fetchProductData,
        subscribeToProduct,
        unsubscribeFromProduct,
      }}
    >
      {children}
    </Context_Broker.Provider>
  );
};
