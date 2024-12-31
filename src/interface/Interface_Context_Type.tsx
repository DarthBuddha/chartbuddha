//! # Interface Context Type
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { useState, useEffect, useCallback } from 'react';
// Tauri
import { load } from '@tauri-apps/plugin-store';
import { invoke } from '@tauri-apps/api/core';
// Components
import { Interface_Context } from './Interface_Context';
import { Product_Type } from './type/Product_Type';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export interface Interface_Context_Type {
  selectedProvider: string | null;
  setSelectedProvider: React.Dispatch<React.SetStateAction<string | null>>;
  selectedProduct: Product_Type | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product_Type | null>>;
  productData: Product_Type | null;
  fetchProductData: () => void;
  subscribeToProduct: (product: Product_Type | null) => Promise<void>;
  unsubscribeFromProduct: (product: Product_Type | null) => Promise<void>;
}
//
/* ------------------------------------------------------------------------------------------------------------------ */
//

export const InterfaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product_Type | null>(null);
  const [productData, setProductData] = useState<Product_Type | null>(null);

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(`An unknown error occurred: ${JSON.stringify(err)}`);
    }
  };

  const fetchProductData = useCallback(async () => {
    try {
      if (selectedProduct) {
        const productData = await invoke('coinbase_get_selected_product', { product_id: selectedProduct.product_id });
        const parsedProductData = JSON.parse(productData as string);
        setProductData(parsedProductData);
        console.log('Fetched product data from API:', parsedProductData);

        // Save the fetched product data to the store
        const store_interface = await load('.interface.json');
        await store_interface.set('selectedProduct', { value: parsedProductData });
        await store_interface.save();
      } else {
        setProductData(null); // Ensure productData is cleared if no product is selected
        console.log('No selected product.');
      }
    } catch (err) {
      handleError(err);
    }
  }, [selectedProduct]);

  useEffect(() => {
    fetchProductData();

    const POLLING_INTERVAL = 3000; // 3 seconds
    const intervalId = setInterval(() => {
      console.log('Polling for product data...');
      fetchProductData();
    }, POLLING_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchProductData]);

  useEffect(() => {
    console.log('Selected product changed:', selectedProduct);
    fetchProductData();
  }, [selectedProduct, fetchProductData]);

  const subscribeToProduct = async (product: Product_Type | null) => {
    if (!product) return;
    try {
      await invoke('coinbase_subscribe_to_product', { product_id: product.product_id });
      console.log('Subscribed to product:', product);
    } catch (err) {
      handleError(err);
    }
  };

  const unsubscribeFromProduct = async (product: Product_Type | null) => {
    if (!product) return;
    try {
      await invoke('coinbase_unsubscribe_from_product', { product_id: product.product_id });
      console.log('Unsubscribed from product:', product);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Interface_Context.Provider
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
    </Interface_Context.Provider>
  );
};
