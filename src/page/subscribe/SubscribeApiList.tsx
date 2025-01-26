/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Subscribe - SubscribeApiList
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Subscribe Api List component for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/subscribe/SubscribeApiList.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useEffect, useState } from 'react'
// Tauri
import { error } from '@tauri-apps/plugin-log'
import { load } from '@tauri-apps/plugin-store'
// Context
import { useInterfaceContext } from '../../context/InterfaceContext'
// CSS Module
import Style from './SubscribeApiList.module.css'

/* ---------------------------------------------------------------------------------------------- */

const SubscribeApiList: React.FC = () => {
  // State Management
  const { setApi } = useInterfaceContext()

  // Store Management
  const [selectedApiListStore, setSelectedApiListStore] = useState<string[]>([])

  // Load Keys
  useEffect(() => {
    // info('useEffect: Calling load_api_list');
    load_api_list()
  }, [])

  // Load Api List
  const load_api_list = async () => {
    const store_apis = await load('list_api.json')
    try {
      const apis = ['binance', 'coinbase'] // Add more APIs as needed
      const configuredApis: string[] = []

      for (const api of apis) {
        // Fetch the entire object
        const apiData = await store_apis.get<{ api_configured: boolean }>(api)
        if (apiData && apiData.api_configured) {
          // info(`API '${api}' is configured: ${apiData.api_configured}`);
          configuredApis.push(api)
        } else {
          // info(`API '${api}' is not configured`);
        }
      }

      // info(`Configured APIs: ${JSON.stringify(configuredApis)}`);
      setSelectedApiListStore(configuredApis)
    } catch (err) {
      if (err instanceof Error) {
        error(`Error loading API list: ${err.message}`)
      } else {
        error(`Unexpected error: ${String(err)}`)
      }
    }
  }

  // Button Click: Handle Data Api
  const handleClick = async (selApi: string) => {
    const resetApi = ['binance', 'coinbase']
    // Logic: Reset Context
    if (resetApi.includes(selApi)) {
      setApi(selApi)
    }
  }

  /* -------------------------------------------------------------------------------------------- */
  return (
    <div className={Style.List_Container}>
      <div className={Style.Title_Bar}>Apis</div>
      <div className={Style.List}>
        {selectedApiListStore.length === 0 ? (
          <div className={Style.Row}>Please configure your API keys on the Connect page.</div>
        ) : (
          selectedApiListStore.map((api) => (
            <div key={api} className={Style.Row} onClick={() => handleClick(api)}>
              {api.charAt(0).toUpperCase() + api.slice(1)}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default SubscribeApiList

/* ---------------------------------------------------------------------------------------------- */
