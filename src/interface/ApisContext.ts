/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Interface: ApisContext
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This context is responsible for managing the global state of the Apis Context.
/* ---------------------------------------------------------------------------------------------- */
//! #### Interface:
//! * ApisContext
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/interface/ApisContext.ts
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react'
// Interface
import { BinanceInterface } from './apis/BinanceContext'
import { CoinbaseInterface } from './apis/CoinbaseContext'

/* ---------------------------------------------------------------------------------------------- */

export interface ApisInterface {
  api_binance: BinanceInterface | null
  api_coinbase: CoinbaseInterface | null
}

/* ---------------------------------------------------------------------------------------------- */

const ApisContext = createContext<ApisInterface | null>(null)

export { ApisContext }

/* ---------------------------------------------------------------------------------------------- */
