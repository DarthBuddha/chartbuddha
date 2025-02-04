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
// Hooks:
import { AppContext } from './hooks/useAppContext'
// Interface:
import { InterfaceInterface } from 'interface/InterfaceContext'
import { ConfigInterface } from 'interface/ConfigContext'
import { ApiListInterface } from 'interface/ApiListContext'
import { SubListInterface } from 'interface/SubListContext'
import { ApisInterface } from 'interface/ApisContext'
import { BrokerInterface } from 'interface/BrokerContext'
// import { BrokerApiInterface } from 'interface/BrokerApiContext'

/* ---------------------------------------------------------------------------------------------- */

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Context: Interface: App Interface
  const [selInterface, setInterface] = useState<InterfaceInterface | null>({
    page: null,
    page_tab: null,
    list_type_product: null,
    product_broker: null,
    product_id: null,
  })
  // Context: Config
  const [selConfig, setConfig] = useState<ConfigInterface | null>({
    // app_init_run: null,
    // app_update: null,
    // app_version: null,
    database_type: null,
    database_name: null,
    database_url: null,
  })
  // Context: Api and Sub List
  const [selApiList, setApiList] = useState<ApiListInterface | null>({
    api_list_values: [],
  })
  const [selSubList, setSubList] = useState<SubListInterface[] | null>([
    {
      sub_list_values: null,
    },
  ])
  // Context: Apis
  const [selApis, setApis] = useState<ApisInterface | null>({
    binance_api: null,
    coinbase_api: null,
  })
  // Context: Broker Api
  const [selBrokerApi, setBrokerApi] = useState<BrokerInterface | null>({
    broker_api_binance: null,
    broker_api_coinbase: null,
  })

  return (
    <AppContext.Provider
      value={{
        selInterface,
        setInterface,
        selConfig,
        setConfig,
        selApiList,
        setApiList,
        selSubList,
        setSubList,
        selApis,
        setApis,
        selBrokerApi,
        setBrokerApi,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

/* ---------------------------------------------------------------------------------------------- */
