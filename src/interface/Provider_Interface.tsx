//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Provider Interface
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React, { useState } from 'react';
// Tauri
import { getStore } from '@tauri-apps/plugin-store';
// import { invoke } from '@tauri-apps/api/core';
import { info } from '@tauri-apps/plugin-log';
// Interface
import { Context_Interface } from './Context_Interface';
import { Type_BrokerProductData } from './type/Type_BrokerProductData';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const store = await getStore('.interface.json');
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Provider_Interface: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Broker
  const [selected_Broker, setFocus_Broker] = useState<string | null>(null);
  const [selected_BrokerProduct, setFocus_BrokerProduct] = useState<string | null>(null);
  const [selected_BrokerProductData, setFocus_BrokerProductData] = useState<Type_BrokerProductData | null>(null);
  // Page
  const [selected_Page, setFocus_Page] = useState<string | null>(null);
  const [selected_PageProductType, setFocus_PageProductType] = useState<string | null>(null);

  if (selected_Page) {
    info(selected_Page);
    store?.set('interface', {
      selected_Broker: 'Select Broker',
      selected_BrokerProduct: 'Select Product',
      selected_Page: selected_Page,
      selected_PageProductType: 'Select Product Type',
    });
    store?.save();
  }

  if (selected_Broker) {
    info(selected_Broker);
    store?.set('interface', {
      selected_Broker: selected_Broker,
      selected_BrokerProduct: 'Select Product',
      selected_PageProductType: 'Select Product Type',
    });
    store?.save();
  }

  return (
    <Context_Interface.Provider
      value={{
        selected_Broker,
        setFocus_Broker,
        selected_BrokerProduct,
        setFocus_BrokerProduct,
        selected_BrokerProductData,
        setFocus_BrokerProductData,
        selected_Page,
        setFocus_Page,
        selected_PageProductType,
        setFocus_PageProductType,
      }}
    >
      {children}
    </Context_Interface.Provider>
  );
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
