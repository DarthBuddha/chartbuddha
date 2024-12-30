//! # Coinbase Product List Spot
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { useEffect, useState, useCallback } from 'react';
// Tauri
import { load } from '@tauri-apps/plugin-store';
import { listen } from '@tauri-apps/api/event';
import { info, error } from '@tauri-apps/plugin-log';
import { invoke } from '@tauri-apps/api/core';
// Components
import { Product_Type } from 'interface/type/Product_Type';
import { useInterfaceContext } from 'interface/Interface_Context';
// CSS Modules
import Style from './Coinbase_Product_List_Spot.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const store_interface = await load('.interface.json', { autoSave: false });

const Coinbase_Product_List_Spot: React.FC = () => {
  // Get selected product from the context
  const { setSelectedProduct } = useInterfaceContext();

  // State to store the products
  const [spotProducts, setSpotProducts] = useState<Product_Type[]>([]);

  // Function to handle errors
  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      error(err.message);
    } else {
      error('An unknown error occurred');
    }
  };

  // Function to load products from the Tauri store
  const loadSpotProducts = useCallback(async () => {
    try {
      const store_coinbase_products = await load('coinbase_products.json');
      const allProducts = ((await store_coinbase_products.get('products')) as { SPOT?: Product_Type[] }) || {};
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

    // Listen for `coinbase_products_loaded` event
    const unlisten = listen('coinbase_products_loaded', async () => {
      // Reload products when the event is received
      await loadSpotProducts();
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unlisten.then((f) => f());
    };
  }, [loadSpotProducts]);

  const POLLING_INTERVAL = 10000; // 10 seconds

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

  const handleProductClick = async (product: Product_Type) => {
    setSelectedProduct(product);
    await store_interface.set('selectedProduct', { value: product });
    await invoke('coinbase_get_selected_product', { product });
    // info(JSON.stringify(product));
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
                  Price: <span className={getStyleForValue(product.price)}>{product.price}</span>
                </div>
                <div>
                  Change (24h):{' '}
                  <span className={getStyleForValue(product.price_percentage_change_24h)}>
                    {formatPercentage(product.price_percentage_change_24h)}%
                  </span>
                </div>
              </div>
              <div className={Style.Product_Volume}>
                <div>Volume (24h): {product.volume_24h}</div>
                <div>
                  Change (24h):{' '}
                  <span className={getStyleForValue(product.volume_percentage_change_24h)}>
                    {formatPercentage(product.volume_percentage_change_24h)}%
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
