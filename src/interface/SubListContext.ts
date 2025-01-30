/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Interface: SubListContext
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This context is responsible for managing the global state of the Sub List.
/* ---------------------------------------------------------------------------------------------- */
//! #### Interface:
//! * SubListInterface
//! * SubscriptionInterface
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/interface/SubListContext.ts
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react'

/* ---------------------------------------------------------------------------------------------- */

export type SubTypeInterface = 'Broker' | 'Market' | 'News' | null
export type ExchangeInterface = 'Equity' | 'Future' | 'Spot' | 'Perpetual' | null

/* ---------------------------------------------------------------------------------------------- */

export interface SubListInterface {
  subscriptions: SubscriptionInterface[] | null
}

export interface SubscriptionInterface {
  subscription_type: SubTypeInterface | null
  exchange_type: ExchangeInterface | null
  platform: string | null
  symbol: string | null
}

/* ---------------------------------------------------------------------------------------------- */

const SubListContext = createContext<SubListInterface | null>(null)

export { SubListContext }

/* ---------------------------------------------------------------------------------------------- */
