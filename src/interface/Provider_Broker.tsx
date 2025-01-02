//! Provider - Broker
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import { useCallback, useEffect, useState } from 'react';
// Tauri
import { invoke } from '@tauri-apps/api/core';
import { info, error } from '@tauri-apps/plugin-log';
import { getStore } from '@tauri-apps/plugin-store';
// Interface
import { Context_Broker } from './Context_Broker';
// import { Type_Broker } from './Type_Broker';
import { Type_BrokerProductData } from './Type_BrokerProductData';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const store = await getStore('.broker.json');
//
// const POLLING_INTERVAL = 3000; // 3 seconds
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Provider_Broker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Selected Broker
  const [selected_Broker, setSelected_Broker] = useState<string | null>(null);
  if (selected_Broker) {
    info(selected_Broker);
  }
  // Save selected Broker to store
  useEffect(() => {
    if (store && selected_Broker !== null) {
      store.get('broker').then((target) => {
        const updatedTarget = { ...(typeof target === 'object' && target !== null ? target : {}), selected_Broker };
        store?.set('broker', updatedTarget).then(() => {
          store?.save();
        });
      });
    }
  }, [selected_Broker]);

  // Selected BrokerProduct
  const [selected_BrokerProduct, setSelected_BrokerProduct] = useState<string | null>(null);
  if (selected_BrokerProduct) {
    info(selected_BrokerProduct);
  }
  // Save selected BrokerProduct to store
  useEffect(() => {
    if (store && selected_BrokerProduct !== null) {
      store.get('broker').then((target) => {
        const updatedTarget = {
          ...(typeof target === 'object' && target !== null ? target : {}),
          selected_BrokerProduct,
        };
        store?.set('broker', updatedTarget).then(() => {
          store?.save();
        });
      });
    }
  }, [selected_BrokerProduct]);

  // Selected BrokerProductType
  const [selected_BrokerProductType, setSelected_BrokerProductType] = useState<string | null>(null);
  if (selected_BrokerProductType) {
    info(selected_BrokerProductType);
  }
  // Save selected BrokerProductType to store
  useEffect(() => {
    if (store && selected_BrokerProductType !== null) {
      store.get('broker').then((target) => {
        const updatedTarget = {
          ...(typeof target === 'object' && target !== null ? target : {}),
          selected_BrokerProductType,
        };
        store?.set('broker', updatedTarget).then(() => {
          store?.save();
        });
      });
    }
  }, [selected_BrokerProductType]);

  // Selected BrokerProductData
  const [selected_BrokerProductData, setSelected_BrokerProductData] = useState<Type_BrokerProductData | null>(null);

  // Fetch Product Data
  const fetch_BrokerProductData = useCallback(async () => {
    if (!selected_BrokerProduct) {
      setSelected_BrokerProductData(null); // Ensure productData is cleared if no product is selected
      // info('No selected product.');
      return;
    }
    try {
      const productData = await invoke('coinbase_get_selected_product', {
        product_id: selected_BrokerProductData?.product_id,
      });
      const parsedProductData = JSON.parse(productData as string);
      setSelected_BrokerProductData(parsedProductData);
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
      error(String(err));
    }
  }, [selected_BrokerProduct, selected_BrokerProductData]);

  //

  ///

  // useEffect(() => {
  //   fetchProductData();

  //   const intervalId = setInterval(() => {
  //     // info('Polling for product data...');
  //     fetchProductData();
  //   }, POLLING_INTERVAL);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [fetchProductData]);

  // useEffect(() => {
  //   info(`Selected product changed: ${JSON.stringify(selectedProduct)}`);
  //   fetchProductData();
  // }, [selectedProduct, fetchProductData]);

  // const subscribeToProduct = async (product: Type_BrokerProduct | null) => {
  //   if (!product) return;
  //   try {
  //     await invoke('coinbase_subscribe_to_product', { product_id: product.product_id });
  //     info(`Subscribed to product: ${JSON.stringify(product)}`);
  //   } catch (err) {
  //     error(String(err));
  //   }
  // };

  // const unsubscribeFromProduct = async (product: Type_BrokerProduct | null) => {
  //   if (!product) return;
  //   try {
  //     await invoke('coinbase_unsubscribe_from_product', { product_id: product.product_id });
  //     info(`Unsubscribed from product: ${JSON.stringify(product)}`);
  //   } catch (err) {
  //     error(String(err));
  //   }
  // };

  //

  return (
    <Context_Broker.Provider
      value={{
        // Broker
        selected_Broker,
        setSelected_Broker,
        // Broker Product
        selected_BrokerProduct,
        setSelected_BrokerProduct,
        // Broker Product Type
        selected_BrokerProductType,
        setSelected_BrokerProductType,
        // Broker Product Data
        selected_BrokerProductData,
        setSelected_BrokerProductData,
        fetch_BrokerProductData,
        // subscribeToProduct,
        // unsubscribeFromProduct,
      }}
    >
      {children}
    </Context_Broker.Provider>
  );
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
