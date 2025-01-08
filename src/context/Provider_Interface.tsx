/* ---------------------------------------------------------------------------------------------- */
//! - Provider Interface
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useState } from 'react';
// Interface
import { Context_Interface } from './Context_Interface';
import { Type_ProductData } from './type/Type_ProductData';
import { Type_ApiPermissions } from '../page_connect/coinbase/type/Api_Permissions_Type';

/* ---------------------------------------------------------------------------------------------- */

export const Provider_Interface: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Global
  const [selected_Page, setFocus_Page] = useState<string | null>(null);
  // Page: Connect
  const [selected_Api, setFocus_Api] = useState<string | null>(null);
  const [selected_ApiPermissions, setFocus_ApiPermissions] = useState<Type_ApiPermissions | null>(
    null,
  );
  // Page: Subscribe
  const [selected_Broker, setFocus_Broker] = useState<string | null>(null);
  const [selected_ProductType, setFocus_ProductType] = useState<string | null>(null);
  const [selected_ProductName, setFocus_ProductName] = useState<string | null>(null);
  const [selected_ProductData, setFocus_ProductData] = useState<Type_ProductData | null>(null);

  return (
    <Context_Interface.Provider
      value={{
        // Global
        selected_Page,
        setFocus_Page,
        // Page: Connect
        selected_Api,
        setFocus_Api,
        selected_ApiPermissions,
        setFocus_ApiPermissions,
        // Page: Subscribe
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

/* ---------------------------------------------------------------------------------------------- */
