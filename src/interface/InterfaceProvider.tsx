/* ---------------------------------------------------------------------------------------------- */
//! - InterfaceProvider.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useState } from 'react';
// Interface
import { InterfaceContext } from './InterfaceContext';

/* ---------------------------------------------------------------------------------------------- */

export const InterfaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Global
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [selectedApi, setSelectedApi] = useState<string | null>(null);
  // Page: Subscribe
  // const [selected_Broker, setFocus_Broker] = useState<string | null>(null);
  // const [selected_ProductType, setFocus_ProductType] = useState<string | null>(null);
  // const [selected_ProductName, setFocus_ProductName] = useState<string | null>(null);

  return (
    <InterfaceContext.Provider
      value={{
        selectedPage,
        setSelectedPage,
        selectedApi,
        setSelectedApi,
        // Page: Subscribe
        // selected_Broker,
        // setFocus_Broker,
        // selected_ProductType,
        // setFocus_ProductType,
        // selected_ProductName,
        // setFocus_ProductName,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
};

/* ---------------------------------------------------------------------------------------------- */
