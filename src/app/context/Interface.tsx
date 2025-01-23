/* ---------------------------------------------------------------------------------------------- */
//! - context/Interface.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react'
// Interface
import { PermissionsType } from './coinbase/data_api/permissions/Permissions'
import { ProductsType } from './coinbase/products/Products'

/* ---------------------------------------------------------------------------------------------- */

// Global State Management
export interface InterfaceType {
  // Global Context
  selPage: string | null
  setPage: React.Dispatch<React.SetStateAction<string | null>>
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
  selCoinbaseApiPermissions: PermissionsType | null
  setCoinbaseApiPermissions: React.Dispatch<React.SetStateAction<PermissionsType | null>>
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
