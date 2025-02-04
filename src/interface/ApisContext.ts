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
import { BrokerApiInterface } from 'interface/BrokerContext'

/* ---------------------------------------------------------------------------------------------- */

// Update ApisInterface to use BrokerApiInterface
export interface ApisInterface {
  binance_api: BrokerApiInterface | null
  coinbase_api: BrokerApiInterface | null
}

/* ---------------------------------------------------------------------------------------------- */

const ApisContext = createContext<ApisInterface | null>(null)

export { ApisContext }

/* ---------------------------------------------------------------------------------------------- */
