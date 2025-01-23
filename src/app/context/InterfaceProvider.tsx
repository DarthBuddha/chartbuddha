/* ---------------------------------------------------------------------------------------------- */
//! - context/InterfaceProvider.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useState } from 'react'
// Tauri
// import { info } from '@tauri-apps/plugin-log';
// Components
import { InterfaceContext } from './InterfaceContext'
import { PermissionsType } from './coinbase/data_api/permissions/Permissions'
import { ProductsType } from './coinbase/products/Products'

/* ---------------------------------------------------------------------------------------------- */

export const InterfaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Global Context
  const [selPage, setPage] = useState<string | null>(null)
  const [selApi, setApi] = useState<string | null>(null)
  const [selProduct, setProduct] = useState<string | null>(null)
  const [selApiList, setApiList] = useState<string | null>(null)
  const [selSubList, setSubList] = useState<string | null>(null)
  // Coinbase
  const [selCoinbaseApiKey, setCoinbaseApiKey] = useState<string | null>(null)
  const [selCoinbaseApiKeySecret, setCoinbaseApiKeySecret] = useState<string | null>(null)
  const [selCoinbaseApiPermissions, setCoinbaseApiPermissions] = useState<PermissionsType | null>(
    null,
  )
  const [selCoinbaseProductType, setCoinbaseProductType] = useState<string | null>(null)
  const [selCoinbaseProductList, setCoinbaseProductList] = useState<ProductsType[] | null>(null)
  const [selCoinbaseProduct, setCoinbaseProduct] = useState<ProductsType | null>(null)

  // Log initial state
  // info('Initial Coinbase API Permissions: ' + JSON.stringify(selCoinbaseApiPermissions));

  return (
    <InterfaceContext.Provider
      value={{
        // Global Flags
        // selAppInit,
        // setAppInit,
        // Global Context
        selPage,
        setPage,
        selApi,
        setApi,
        selProduct,
        setProduct,
        selApiList,
        setApiList,
        selSubList,
        setSubList,
        // API: Coinbase
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
  )
}

/* ---------------------------------------------------------------------------------------------- */
