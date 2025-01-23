/* ---------------------------------------------------------------------------------------------- */
//! # Context: App Context - InterfaceProvider
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This context is responsible for managing the global state of the application.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/context/InterfaceProvider.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useState } from 'react'
// Tauri
// import { info } from '@tauri-apps/plugin-log';
// Context
import { InterfaceContext } from './InterfaceContext'
import { DataApiPermissionsType } from './broker/Coinbase.tsx'
import { ProductsType } from './broker/Coinbase.tsx'

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
  const [selCoinbaseApiPermissions, setCoinbaseApiPermissions] =
    useState<DataApiPermissionsType | null>(null)
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
