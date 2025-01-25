/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Connect - ConnectApiList
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This component is responsible for rendering the list of available API providers.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/connect/ConnectApiList.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Tauri
// import { load } from '@tauri-apps/plugin-store'
// import { info, error } from '@tauri-apps/plugin-log'
// import { invoke } from '@tauri-apps/api/core';
// Context
import { useInterfaceContext } from 'context/InterfaceContext'
// import { DataApiType } from 'app/context/broker/Coinbase.tsx'
// CSS Module
import Style from './ConnectApiList.module.css'

/* ---------------------------------------------------------------------------------------------- */

// const store = await load('apis.json')

/* ---------------------------------------------------------------------------------------------- */

const ConnectApiList: React.FC = () => {
  // Context: Interface
  const { setConnectTab } = useInterfaceContext()

  // Click: Connect Api List
  const handleClick = async (selTab: string) => {
    const resetTab = ['Database', 'Binance', 'Coinbase']

    // Logic: Set Context
    if (resetTab.includes(selTab)) {
      setConnectTab(selTab)
    }
    // Logic: Reset Context
    // if (resetApi.includes(selectedApi)) {
    //   setApi(selectedApi)
    //   try {
    //     const savedApi = await store.get<DataApiType>('coinbase')
    //     info('Loaded API: ' + JSON.stringify(savedApi))

    //     if (savedApi) {
    //       setCoinbaseApiKey(savedApi.api_key || '')
    //       setCoinbaseApiKeySecret(savedApi.api_key_secret || '')
    //       setCoinbaseApiPermissions(
    //         savedApi.api_permissions || {
    //           can_view: false,
    //           can_trade: false,
    //           can_transfer: false,
    //           portfolio_uuid: '',
    //           portfolio_type: '',
    //         },
    //       )
    //       info('Permissions: ' + JSON.stringify(savedApi.api_permissions))
    //     }
    //   } catch (err) {
    //     error(err instanceof Error ? err.toString() : String(err))
    //   }
    // }
  }

  return (
    <div className={Style.List_Container}>
      <div className={Style.Title_Bar}>Apis</div>
      <div className={Style.List}>
        <div className={Style.Row} onClick={() => handleClick('Database')}>
          Database
        </div>
        <div className={Style.Row} onClick={() => handleClick('Binance')}>
          Binance
        </div>
        <div className={Style.Row} onClick={() => handleClick('Coinbase')}>
          Coinbase
        </div>
      </div>
    </div>
  )
}

export default ConnectApiList

/* ---------------------------------------------------------------------------------------------- */
