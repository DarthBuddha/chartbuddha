/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Interface: AppContext
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This context is responsible for managing the global state of the App Context.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/interface/AppContext.ts
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react'
// Context: Interface
import { InterfaceInterface } from 'interface/InterfaceContext'
import { ConfigInterface } from 'interface/ConfigContext'
import { ApiListInterface } from 'interface/ApiListContext'
import { SubListInterface } from 'interface/SubListContext'
// Interface: Apis
import { ApisInterface } from 'interface/ApisContext'
// Interface: BrokerApi
import { BrokerInterface } from 'interface/BrokerContext'

/* ---------------------------------------------------------------------------------------------- */

export interface AppContextInterface {
  // Context: Interface
  selInterface: InterfaceInterface | null
  setInterface: React.Dispatch<React.SetStateAction<InterfaceInterface | null>>
  selConfig: ConfigInterface | null
  setConfig: React.Dispatch<React.SetStateAction<ConfigInterface | null>>
  selApiList: ApiListInterface | null
  setApiList: React.Dispatch<React.SetStateAction<ApiListInterface | null>>
  selSubList: SubListInterface[] | null
  setSubList: React.Dispatch<React.SetStateAction<SubListInterface[] | null>>
  // Context: Apis
  selApis: ApisInterface | null
  setApis: React.Dispatch<React.SetStateAction<ApisInterface | null>>
  // Context: BrokerApi
  selBrokerApi: BrokerInterface | null
  setBrokerApi: React.Dispatch<React.SetStateAction<BrokerInterface | null>>
}

const AppContext = createContext<AppContextInterface | null>(null)

export default AppContext

/* ---------------------------------------------------------------------------------------------- */
