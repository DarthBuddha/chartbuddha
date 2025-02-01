/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: AppContextProvider
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This context is responsible for managing the global state of the Interface.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/AppContextProvider.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useState } from 'react'
// Tauri
// import { info } from '@tauri-apps/plugin-log';
// Interface
import { AppContext } from './hooks/useAppContext'
// Interface:
import { ConfigInterface } from 'interface/ConfigContext'
import { ApiListInterface } from 'interface/InterfaceContext'
// Interface: Binance
// import { BinanceDataApiPermissionsInterface } from './apis/contextBinance'
// import { BinanceProductsInterface } from './apis/contextBinance'
// Interface: Coinbase
import { CoinbaseDataApiPermissionsInterface } from 'interface/apis/CoinbaseContext'
import { CoinbaseProductsInterface } from 'interface/apis/CoinbaseContext'

/* ---------------------------------------------------------------------------------------------- */

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Context: Config
  const [selConfig, setConfig] = useState<ConfigInterface | null>(null)
  // Context: Api List
  const [selApiList, setApiList] = useState<ApiListInterface | null>(null)
  // TODO: Clean up Context
  const [selApi, setApi] = useState<string | null>(null)
  const [selProduct, setProduct] = useState<string | null>(null)
  // Context: Interface
  const [selPage, setPage] = useState<string | null>(null)
  const [selConnectTab, setConnectTab] = useState<string | null>(null)
  const [selSubscribeTab, setSubscribeTab] = useState<string | null>(null)
  // const [selApiList, setApiList] = useState<string[] | null>(null)
  const [selSubList, setSubList] = useState<string | null>(null)
  // Context: Binance
  // const [selBinanceApiKey, setBinanceApiKey] = useState<string | null>(null)
  // const [selBinanceApiKeySecret, setBinanceApiKeySecret] = useState<string | null>(null)
  // const [selBinanceApiPermissions, setBinanceApiPermissions] =
  // useState<BinanceDataApiPermissionsInterface | null>(null)
  // const [selBinanceProductType, setBinanceProductType] = useState<string | null>(null)
  // const [selBinanceProductList, setBinanceProductList] =
  // useState<BinanceProductsInterface[] | null>(null,)
  // const [selBinanceProduct, setBinanceProduct] = useState<BinanceProductsInterface | null>(null)
  // Context: Coinbase
  const [selCoinbaseApiKey, setCoinbaseApiKey] = useState<string | null>(null)
  const [selCoinbaseApiKeySecret, setCoinbaseApiKeySecret] = useState<string | null>(null)
  const [selCoinbaseApiPermissions, setCoinbaseApiPermissions] =
    useState<CoinbaseDataApiPermissionsInterface | null>(null)
  const [selCoinbaseProductType, setCoinbaseProductType] = useState<string | null>(null)
  const [selCoinbaseProductList, setCoinbaseProductList] = useState<
    CoinbaseProductsInterface[] | null
  >(null)
  const [selCoinbaseProduct, setCoinbaseProduct] = useState<CoinbaseProductsInterface | null>(null)

  // Log initial state
  // info('Initial Coinbase API Permissions: ' + JSON.stringify(selCoinbaseApiPermissions));

  return (
    <AppContext.Provider
      value={{
        // TODO: Clean up Context
        selApi,
        setApi,
        selProduct,
        setProduct,
        // Context: Interface
        selPage,
        setPage,
        selConnectTab,
        setConnectTab,
        selSubscribeTab,
        setSubscribeTab,
        selApiList,
        setApiList,
        selSubList,
        setSubList,
        // Context: Database
        selConfig,
        setConfig,
        // API: Binance
        // selBinanceApiKey,
        // setBinanceApiKey,
        // selBinanceApiKeySecret,
        // setBinanceApiKeySecret,
        // selBinanceApiPermissions,
        // setBinanceApiPermissions,
        // selBinanceProductType,
        // setBinanceProductType,
        // selBinanceProductList,
        // setBinanceProductList,
        // selBinanceProduct,
        // setBinanceProduct,
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
    </AppContext.Provider>
  )
}

/* ---------------------------------------------------------------------------------------------- */
