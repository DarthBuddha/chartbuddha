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
// Context
import { DataApiPermissionsType } from './broker/Coinbase.tsx'
import { ProductsType } from './broker/Coinbase.tsx'
import { DatabaseType } from './app/AppConfig.tsx'

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
  selApiList: string | null
  setApiList: React.Dispatch<React.SetStateAction<string | null>>
  selSubList: string | null
  setSubList: React.Dispatch<React.SetStateAction<string | null>>
  // Coinbase Context
  selCoinbaseApiKey: string | null
  setCoinbaseApiKey: React.Dispatch<React.SetStateAction<string | null>>
  selCoinbaseApiKeySecret: string | null
  setCoinbaseApiKeySecret: React.Dispatch<React.SetStateAction<string | null>>
  selCoinbaseApiPermissions: DataApiPermissionsType | null
  setCoinbaseApiPermissions: React.Dispatch<React.SetStateAction<DataApiPermissionsType | null>>
  selCoinbaseProductType: string | null
  setCoinbaseProductType: React.Dispatch<React.SetStateAction<string | null>>
  selCoinbaseProductList: ProductsType[] | null
  setCoinbaseProductList: React.Dispatch<React.SetStateAction<ProductsType[] | null>>
  selCoinbaseProduct: ProductsType | null
  setCoinbaseProduct: React.Dispatch<React.SetStateAction<ProductsType | null>>
}

const InterfaceContext = createContext<InterfaceType | null>(null)

export default InterfaceContext

/* ---------------------------------------------------------------------------------------------- */
