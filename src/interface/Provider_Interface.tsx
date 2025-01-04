//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Provider Interface
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React, { useState } from 'react';
// Interface
import { Context_Interface } from './Context_Interface';
import { Type_BrokerProductData } from './type/Type_BrokerProductData';

/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Provider_Interface: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Page
  const [selected_Page, setFocus_Page] = useState<string | null>(null);
  // Connect Page
  const [selected_DataApi, setFocus_DataApi] = useState<string | null>(null);
  // Broker
  const [selected_Broker, setFocus_Broker] = useState<string | null>(null);
  // Product
  const [selected_ProductType, setFocus_ProductType] = useState<string | null>(null);
  const [selected_ProductName, setFocus_ProductName] = useState<string | null>(null);
  const [selected_ProductData, setFocus_ProductData] = useState<Type_BrokerProductData | null>(null);

  return (
    <Context_Interface.Provider
      value={{
        // Variables - Global
        selected_Page,
        setFocus_Page,
        // Variables - Connect Page
        selected_DataApi,
        setFocus_DataApi,
        // Variables - Subscribe Page
        selected_Broker,
        setFocus_Broker,
        selected_ProductType,
        setFocus_ProductType,
        selected_ProductName,
        setFocus_ProductName,
        selected_ProductData,
        setFocus_ProductData,
      }}
    >
      {children}
    </Context_Interface.Provider>
  );
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
