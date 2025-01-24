/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Component: App Pages Connect - ConnectApiList
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This component is responsible for rendering the list of available API providers.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/pages/connect/ConnectApiList.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Tauri
import { load } from '@tauri-apps/plugin-store'
import { info, error } from '@tauri-apps/plugin-log'
// import { invoke } from '@tauri-apps/api/core';
// Context
import { useInterfaceContext } from 'app/context/InterfaceContext.tsx'
import { DataApiType } from 'app/context/broker/Coinbase.tsx'
// CSS Module
import Style from './ConnectApiList.module.css'

/* ---------------------------------------------------------------------------------------------- */

const store = await load('apis.json')

/* ---------------------------------------------------------------------------------------------- */

const ConnectApiList: React.FC = () => {
  // State Management
  const { setApi, setCoinbaseApiKey, setCoinbaseApiKeySecret, setCoinbaseApiPermissions } =
    useInterfaceContext()

  // Handle Data Api Click
  const handleClick = async (selectedApi: string) => {
    const resetApi = ['binance', 'coinbase']
    // Logic: Reset Context
    if (resetApi.includes(selectedApi)) {
      setApi(selectedApi)
      try {
        const savedApi = await store.get<DataApiType>('coinbase')
        info('Loaded API: ' + JSON.stringify(savedApi))

        if (savedApi) {
          setCoinbaseApiKey(savedApi.api_key || '')
          setCoinbaseApiKeySecret(savedApi.api_key_secret || '')
          setCoinbaseApiPermissions(
            savedApi.api_permissions || {
              can_view: false,
              can_trade: false,
              can_transfer: false,
              portfolio_uuid: '',
              portfolio_type: '',
            },
          )
          info('Permissions: ' + JSON.stringify(savedApi.api_permissions))
        }
      } catch (err) {
        error(err instanceof Error ? err.toString() : String(err))
      }
    }
  }

  return (
    <div className={Style.List_Container}>
      <div className={Style.Title_Bar}>Apis</div>
      <div className={Style.List}>
        <div className={Style.Row} onClick={() => handleClick('binance')}>
          Binance
        </div>
        <div className={Style.Row} onClick={() => handleClick('coinbase')}>
          Coinbase
        </div>
      </div>
    </div>
  )
}

export default ConnectApiList

/* ---------------------------------------------------------------------------------------------- */
