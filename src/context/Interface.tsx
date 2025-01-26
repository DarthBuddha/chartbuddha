/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Context: Context - Interface
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This context is responsible for managing the global state of the application.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: context/Interface.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react'
// Context: Connect
import { DatabaseType } from './app/AppConfig.tsx'
// Context: Binance
import { BinanceDataApiPermissionsType } from './apis/Binance.tsx'
import { BinanceProductsType } from './apis/Binance.tsx'
// Context: Coinbase
import { CoinbaseDataApiPermissionsType } from './apis/Coinbase.tsx'
import { CoinbaseProductsType } from './apis/Coinbase.tsx'

/* ---------------------------------------------------------------------------------------------- */

// Interface Context Type
export interface InterfaceType {
  // Context: Global
  selPage: string | null
  setPage: React.Dispatch<React.SetStateAction<string | null>>
  // Context: Connect Page
  selConnectTab: string | null
  setConnectTab: React.Dispatch<React.SetStateAction<string | null>>
  selDatabaseType: DatabaseType | null
  setDatabaseType: React.Dispatch<React.SetStateAction<DatabaseType | null>>
  selDatabaseName: string | null
  setDatabaseName: React.Dispatch<React.SetStateAction<string | null>>
  selDatabaseUrl: string | null
  setDatabaseUrl: React.Dispatch<React.SetStateAction<string | null>>
  // TODO: Clean up Context
  selApi: string | null
  setApi: React.Dispatch<React.SetStateAction<string | null>>
  selProduct: string | null
  setProduct: React.Dispatch<React.SetStateAction<string | null>>
  // Context: Subscribe
  selApiList: string | null
  setApiList: React.Dispatch<React.SetStateAction<string | null>>
  selSubList: string | null
  setSubList: React.Dispatch<React.SetStateAction<string | null>>
  // Context: Binance
  selBinanceApiKey: string | null
  setBinanceApiKey: React.Dispatch<React.SetStateAction<string | null>>
  selBinanceApiKeySecret: string | null
  setBinanceApiKeySecret: React.Dispatch<React.SetStateAction<string | null>>
  selBinanceApiPermissions: BinanceDataApiPermissionsType | null
  setBinanceApiPermissions: React.Dispatch<
    React.SetStateAction<BinanceDataApiPermissionsType | null>
  >
  selBinanceProductType: string | null
  setBinanceProductType: React.Dispatch<React.SetStateAction<string | null>>
  selBinanceProductList: BinanceProductsType[] | null
  setBinanceProductList: React.Dispatch<React.SetStateAction<BinanceProductsType[] | null>>
  selBinanceProduct: BinanceProductsType | null
  setBinanceProduct: React.Dispatch<React.SetStateAction<BinanceProductsType | null>>
  // Context: Coinbase
  selCoinbaseApiKey: string | null
  setCoinbaseApiKey: React.Dispatch<React.SetStateAction<string | null>>
  selCoinbaseApiKeySecret: string | null
  setCoinbaseApiKeySecret: React.Dispatch<React.SetStateAction<string | null>>
  selCoinbaseApiPermissions: CoinbaseDataApiPermissionsType | null
  setCoinbaseApiPermissions: React.Dispatch<
    React.SetStateAction<CoinbaseDataApiPermissionsType | null>
  >
  selCoinbaseProductType: string | null
  setCoinbaseProductType: React.Dispatch<React.SetStateAction<string | null>>
  selCoinbaseProductList: CoinbaseProductsType[] | null
  setCoinbaseProductList: React.Dispatch<React.SetStateAction<CoinbaseProductsType[] | null>>
  selCoinbaseProduct: CoinbaseProductsType | null
  setCoinbaseProduct: React.Dispatch<React.SetStateAction<CoinbaseProductsType | null>>
}

const InterfaceContext = createContext<InterfaceType | null>(null)

export default InterfaceContext

/* ---------------------------------------------------------------------------------------------- */
