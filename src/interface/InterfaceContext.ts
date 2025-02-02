/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Interface: InterfaceContext
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This context is responsible for managing the global state of the Interface.
/* ---------------------------------------------------------------------------------------------- */
//! #### Interface:
//! * InterfaceInterface
//! * * PageType
//! * * TabType
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/interface/InterfaceContext.ts
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react'

/* ---------------------------------------------------------------------------------------------- */

export interface InterfaceInterface {
  page: PageType | null
  page_tab: PageTabType | null
  list_type_product: ListTypeProductType | null
  product_broker: ProductBrokerType | null
  product_symbol: string | null
}

export type PageType =
  | 'Home'
  | 'Connect'
  | 'Subscribe'
  | 'Dashboard'
  | 'Analyze'
  | 'News'
  | 'Profile'
  | null

export type PageTabType = 'Database-Tab' | 'Binance-Tab' | 'Coinbase-Tab' | null

export type ListTypeProductType = 'Spot' | 'Future' | 'Perpetual' | null

export type ProductBrokerType = 'Binance' | 'Coinbase' | null

/* ---------------------------------------------------------------------------------------------- */

const InterfaceContext = createContext<InterfaceInterface | null>(null)

export { InterfaceContext }

/* ---------------------------------------------------------------------------------------------- */
