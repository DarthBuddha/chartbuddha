/* ------------------------------------------------------------------------------------------------------------------ */
//! - interface.InterfaceProvider.tsx
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React, { useState } from 'react';
// Components
import { InterfaceContext } from './InterfaceContext';
// import { InterfaceType } from './Interface';
// import { CoinbaseType } from './coinbase/Coinbase';

/* ------------------------------------------------------------------------------------------------------------------ */

export const InterfaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Global
  const [selPage, setPage] = useState<string | null>(null);
  const [selApi, setApi] = useState<string | null>(null);
  // Coinbase
  const [selCoinbaseApiKey, setCoinbaseApiKey] = useState<string | null>(null);
  const [selCoinbaseApiSecret, setCoinbaseApiSecret] = useState<string | null>(null);
  // const [selCoinbaseProductType, setCoinbaseProductType] = useState<string | null>(null);
  // const [selCoinbaseProductList, setCoinbaseProductList] = useState<InterfaceType | null>(null);
  // const [selCoinbaseProductName, setCoinbaseProductName] = useState<string | null>(null);

  return (
    <InterfaceContext.Provider
      value={{
        // Global
        selPage,
        setPage,
        selApi,
        setApi,
        // Coinbase
        selCoinbaseApiKey,
        setCoinbaseApiKey,
        selCoinbaseApiSecret,
        setCoinbaseApiSecret,
        // selCoinbaseProductType,
        // setCoinbaseProductType,
        // selCoinbaseProductList,
        // setCoinbaseProductList,
        // selCoinbaseProductName,
        // setCoinbaseProductName,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
};

/* ------------------------------------------------------------------------------------------------------------------ */
