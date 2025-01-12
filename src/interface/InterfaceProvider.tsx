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
  const [selectedProductType, setSelectedProductType] = useState<string | null>(null);
  // const [selectedProductList, setSelectedProductList] = useState<string | null>(null);
  // const [selected_ProductName, setFocus_ProductName] = useState<string | null>(null);

  return (
    <InterfaceContext.Provider
      value={{
        selectedPage,
        setSelectedPage,
        selectedApi,
        setSelectedApi,
        selectedProductType,
        setSelectedProductType,
        // selectedProductList,
        // setSelectedProductList,
        // selected_ProductName,
        // setFocus_ProductName,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
};

/* ---------------------------------------------------------------------------------------------- */
