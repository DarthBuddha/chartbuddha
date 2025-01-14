/* ------------------------------------------------------------------------------------------------------------------ */
//! - interface.InterfaceProvider.tsx
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React, { useState } from 'react';
// Components
import { InterfaceContext } from './InterfaceContext';
import { PermissionsType } from './coinbase/api/permissions/Permissions';
import { ProductsType } from './coinbase/products/Products';

/* ------------------------------------------------------------------------------------------------------------------ */

export const InterfaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Global
  const [selPage, setPage] = useState<string | null>(null);
  const [selApi, setApi] = useState<string | null>(null);
  const [selProduct, setProduct] = useState<string | null>(null);
  // Coinbase
  const [selCoinbaseApiKey, setCoinbaseApiKey] = useState<string | null>(null);
  const [selCoinbaseApiKeySecret, setCoinbaseApiKeySecret] = useState<string | null>(null);
  const [selCoinbaseApiPermissions, setCoinbaseApiPermissions] = useState<PermissionsType | null>(null);
  const [selCoinbaseProductType, setCoinbaseProductType] = useState<string | null>(null);
  const [selCoinbaseProductList, setCoinbaseProductList] = useState<ProductsType[] | null>(null);
  const [selCoinbaseProduct, setCoinbaseProduct] = useState<ProductsType | null>(null);

  return (
    <InterfaceContext.Provider
      value={{
        // Global
        selPage,
        setPage,
        selApi,
        setApi,
        selProduct,
        setProduct,
        // Coinbase
        selCoinbaseApiKey,
        setCoinbaseApiKey,
        selCoinbaseApiKeySecret,
        setCoinbaseApiKeySecret,
        selCoinbaseApiPermissions,
        setCoinbaseApiPermissions,
        selCoinbaseProductType,
        setCoinbaseProductType,
        selCoinbaseProductList,
        setCoinbaseProductList,
        selCoinbaseProduct,
        setCoinbaseProduct,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
};

/* ------------------------------------------------------------------------------------------------------------------ */
