/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Subscribe -> SubscribeApiList
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Subscribe Api List component for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/page/subscribe/SubscribeApiList.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useEffect, useState } from 'react'
// Tauri
import { error } from '@tauri-apps/plugin-log'
import { load } from '@tauri-apps/plugin-store'
// Context
import { useInterfaceContext } from '../../interface/useInterfaceContext'
// Constants
import { API_LIST_STORE } from '../../constants'
// CSS Module
import Style from './SubscribeApiList.module.css'

/* ---------------------------------------------------------------------------------------------- */

const SubscribeApiList: React.FC = () => {
  // Context: Interface
  const { setSubscribeTab } = useInterfaceContext()
  const [selectedApiListStore, setSelectedApiListStore] = useState<string[]>([])

  // Use Effect: On Component Load
  useEffect(() => {
    const loadApiList = async () => {
      try {
        const storeApiList = await load(API_LIST_STORE)
        const brokerData = await storeApiList.get<Record<string, boolean>>('Broker')
        if (brokerData) {
          const configuredApis = Object.keys(brokerData).filter((key) => brokerData[key])
          setSelectedApiListStore(configuredApis)
        }
      } catch (err) {
        error(`Error loading Database Config: ${err instanceof Error ? err.message : String(err)}`)
      }
    }

    loadApiList()
  }, [setSelectedApiListStore])

  // Button Click: Handle Data Api
  const handleClick = async (selSubscribeTab: string) => {
    const resetApi = ['Binance', 'Coinbase']
    // Logic: Reset Context
    if (resetApi.includes(selSubscribeTab)) {
      setSubscribeTab(selSubscribeTab)
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
