//! # Interface Provider
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { useState, useEffect, useCallback } from 'react';
// Tauri
import { getStore } from '@tauri-apps/plugin-store';
import { invoke } from '@tauri-apps/api/core';
import { info, error } from '@tauri-apps/plugin-log';
// Interface
import { Interface_ProviderContext } from './Interface_ProviderContext';
import { Product_Type } from '../type/Product_Type';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const POLLING_INTERVAL = 3000; // 3 seconds
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Interface_Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product_Type | null>(null);
  const [productData, setProductData] = useState<Product_Type | null>(null);

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      error(err.message);
    } else {
      error(`An unknown error occurred: ${JSON.stringify(err)}`);
    }
  };

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

  const subscribeToProduct = async (product: Product_Type | null) => {
    if (!product) return;
    try {
      await invoke('coinbase_subscribe_to_product', { product_id: product.product_id });
      info(`Subscribed to product: ${JSON.stringify(product)}`);
    } catch (err) {
      handleError(err);
    }
  };

  const unsubscribeFromProduct = async (product: Product_Type | null) => {
    if (!product) return;
    try {
      await invoke('coinbase_unsubscribe_from_product', { product_id: product.product_id });
      info(`Unsubscribed from product: ${JSON.stringify(product)}`);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Interface_ProviderContext.Provider
      value={{
        selectedProvider,
        setSelectedProvider,
        selectedProduct,
        setSelectedProduct,
        productData,
        fetchProductData,
        subscribeToProduct,
        unsubscribeFromProduct,
      }}
    >
      {children}
    </Interface_ProviderContext.Provider>
  );
};
