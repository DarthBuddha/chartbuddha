/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
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
// Context: Interface
import { InterfaceContext } from './InterfaceContext.tsx'
// Context: Connect
import { DatabaseType } from './app/AppConfig.tsx'
// Context: Binance
import { BinanceDataApiPermissionsType } from './apis/Binance.tsx'
import { BinanceProductsType } from './apis/Binance.tsx'
// Context: Coinbase
import { CoinbaseDataApiPermissionsType } from './apis/Coinbase.tsx'
import { CoinbaseProductsType } from './apis/Coinbase.tsx'

/* ---------------------------------------------------------------------------------------------- */

export const InterfaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Context: Global
  const [selPage, setPage] = useState<string | null>(null)
  // Context: Connect Page
  const [selConnectTab, setConnectTab] = useState<string | null>(null)
  const [selDatabaseType, setDatabaseType] = useState<DatabaseType | null>(null)
  const [selDatabaseName, setDatabaseName] = useState<string | null>(null)
  const [selDatabaseUrl, setDatabaseUrl] = useState<string | null>(null)
  // TODO: Clean up Context
  const [selApi, setApi] = useState<string | null>(null)
  const [selProduct, setProduct] = useState<string | null>(null)
  const [selApiList, setApiList] = useState<string | null>(null)
  const [selSubList, setSubList] = useState<string | null>(null)
  // Context: Binance
  const [selBinanceApiKey, setBinanceApiKey] = useState<string | null>(null)
  const [selBinanceApiKeySecret, setBinanceApiKeySecret] = useState<string | null>(null)
  const [selBinanceApiPermissions, setBinanceApiPermissions] =
    useState<BinanceDataApiPermissionsType | null>(null)
  const [selBinanceProductType, setBinanceProductType] = useState<string | null>(null)
  const [selBinanceProductList, setBinanceProductList] = useState<BinanceProductsType[] | null>(
    null,
  )
  const [selBinanceProduct, setBinanceProduct] = useState<BinanceProductsType | null>(null)
  // Context: Coinbase
  const [selCoinbaseApiKey, setCoinbaseApiKey] = useState<string | null>(null)
  const [selCoinbaseApiKeySecret, setCoinbaseApiKeySecret] = useState<string | null>(null)
  const [selCoinbaseApiPermissions, setCoinbaseApiPermissions] =
    useState<CoinbaseDataApiPermissionsType | null>(null)
  const [selCoinbaseProductType, setCoinbaseProductType] = useState<string | null>(null)
  const [selCoinbaseProductList, setCoinbaseProductList] = useState<CoinbaseProductsType[] | null>(
    null,
  )
  const [selCoinbaseProduct, setCoinbaseProduct] = useState<CoinbaseProductsType | null>(null)

  // Log initial state
  // info('Initial Coinbase API Permissions: ' + JSON.stringify(selCoinbaseApiPermissions));

  return (
    <InterfaceContext.Provider
      value={{
        // Context: Global
        selPage,
        setPage,
        // Context: Connect Page
        selConnectTab,
        setConnectTab,
        selDatabaseType,
        setDatabaseType,
        selDatabaseName,
        setDatabaseName,
        selDatabaseUrl,
        setDatabaseUrl,
        // TODO: Clean up Context
        selApi,
        setApi,
        selProduct,
        setProduct,
        selApiList,
        setApiList,
        selSubList,
        setSubList,
        // API: Binance
        selBinanceApiKey,
        setBinanceApiKey,
        selBinanceApiKeySecret,
        setBinanceApiKeySecret,
        selBinanceApiPermissions,
        setBinanceApiPermissions,
        selBinanceProductType,
        setBinanceProductType,
        selBinanceProductList,
        setBinanceProductList,
        selBinanceProduct,
        setBinanceProduct,
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
