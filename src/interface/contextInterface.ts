/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Interface: interfaceContext
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This context is responsible for managing the global state of the Interface.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/interface/interfaceContext.ts
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react'
// Context: Connect
import { DatabaseType } from './app/contextConfig'
import { ApiListInterface } from './app/contextApiList'
// Context: Binance
// import { BinanceDataApiPermissionsType } from './apis/contextBinance'
// import { BinanceProductsType } from './apis/contextBinance'
// Context: Coinbase
import { CoinbaseDataApiPermissionsInterface } from './apis/contextCoinbase'
import { CoinbaseProductsInterface } from './apis/contextCoinbase'

/* ---------------------------------------------------------------------------------------------- */

// Interface Context Type
export interface ContextInterface {
  // TODO: Clean up Context
  selApi: string | null
  setApi: React.Dispatch<React.SetStateAction<string | null>>
  selProduct: string | null
  setProduct: React.Dispatch<React.SetStateAction<string | null>>
  // Context: Interface
  selPage: string | null
  setPage: React.Dispatch<React.SetStateAction<string | null>>
  selConnectTab: string | null
  setConnectTab: React.Dispatch<React.SetStateAction<string | null>>
  selSubscribeTab: string | null
  setSubscribeTab: React.Dispatch<React.SetStateAction<string | null>>
  selApiList: ApiListInterface | null
  setApiList: React.Dispatch<React.SetStateAction<ApiListInterface | null>>
  selSubList: string | null
  setSubList: React.Dispatch<React.SetStateAction<string | null>>
  // Context: Database
  selDatabaseType: DatabaseType | null
  setDatabaseType: React.Dispatch<React.SetStateAction<DatabaseType | null>>
  selDatabaseName: string | null
  setDatabaseName: React.Dispatch<React.SetStateAction<string | null>>
  selDatabaseUrl: string | null
  setDatabaseUrl: React.Dispatch<React.SetStateAction<string | null>>
  // Context: Binance
  // selBinanceApiKey: string | null
  // setBinanceApiKey: React.Dispatch<React.SetStateAction<string | null>>
  // selBinanceApiKeySecret: string | null
  // setBinanceApiKeySecret: React.Dispatch<React.SetStateAction<string | null>>
  // selBinanceApiPermissions: BinanceDataApiPermissionsType | null
  // setBinanceApiPermissions: React.Dispatch<
  //   React.SetStateAction<BinanceDataApiPermissionsType | null>
  // >
  // selBinanceProductType: string | null
  // setBinanceProductType: React.Dispatch<React.SetStateAction<string | null>>
  // selBinanceProductList: BinanceProductsType[] | null
  // setBinanceProductList: React.Dispatch<React.SetStateAction<BinanceProductsType[] | null>>
  // selBinanceProduct: BinanceProductsType | null
  // setBinanceProduct: React.Dispatch<React.SetStateAction<BinanceProductsType | null>>
  // Context: Coinbase
  selCoinbaseApiKey: string | null
  setCoinbaseApiKey: React.Dispatch<React.SetStateAction<string | null>>
  selCoinbaseApiKeySecret: string | null
  setCoinbaseApiKeySecret: React.Dispatch<React.SetStateAction<string | null>>
  selCoinbaseApiPermissions: CoinbaseDataApiPermissionsInterface | null
  setCoinbaseApiPermissions: React.Dispatch<
    React.SetStateAction<CoinbaseDataApiPermissionsInterface | null>
  >
  selCoinbaseProductType: string | null
  setCoinbaseProductType: React.Dispatch<React.SetStateAction<string | null>>
  selCoinbaseProductList: CoinbaseProductsInterface[] | null
  setCoinbaseProductList: React.Dispatch<React.SetStateAction<CoinbaseProductsInterface[] | null>>
  selCoinbaseProduct: CoinbaseProductsInterface | null
  setCoinbaseProduct: React.Dispatch<React.SetStateAction<CoinbaseProductsInterface | null>>
}

const InterfaceContext = createContext<ContextInterface | null>(null)

export default InterfaceContext

/* ---------------------------------------------------------------------------------------------- */
