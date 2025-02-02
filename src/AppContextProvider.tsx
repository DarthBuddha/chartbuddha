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
// Interface
import { AppContext } from './hooks/useAppContext'
// Interface:
import { InterfaceInterface } from 'interface/InterfaceContext'
import { ConfigInterface } from 'interface/ConfigContext'
import { ApiListInterface } from 'interface/ApiListContext'
import { SubListInterface } from 'interface/SubListContext'
import { ApisInterface } from 'interface/ApisContext'

/* ---------------------------------------------------------------------------------------------- */

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Context: Interface / Database
  const [selInterface, setInterface] = useState<InterfaceInterface | null>({
    page: null,
    page_tab: null,
    list_type_product: null,
    product_broker: null,
    product_symbol: null,
  })
  const [selConfig, setConfig] = useState<ConfigInterface | null>({
    // app_init_run: null,
    // app_update: null,
    // app_version: null,
    database_type: null,
    database_name: null,
    database_url: null,
  })
  // Context: Api and Sub List
  const [selApiList, setApiList] = useState<ApiListInterface[] | null>([
    {
      api_list_values: null,
    },
  ])
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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

/* ---------------------------------------------------------------------------------------------- */
