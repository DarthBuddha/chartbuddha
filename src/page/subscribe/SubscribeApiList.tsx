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
import React from 'react'
// Tauri
// import { error } from '@tauri-apps/plugin-log'
// import { load } from '@tauri-apps/plugin-store'
// Context
import { useAppContext } from 'hooks/useAppContext.ts'
// Constants
// import { API_LIST_STORE } from '../../constants'
// CSS Module
import Style from './css/SubscribeApiList.module.css'

/* ---------------------------------------------------------------------------------------------- */

const SubscribeApiList: React.FC = () => {
  // Context: Interface
  const { selApiList, setSubscribeTab } = useAppContext()

  // Button Click: Handle Data Api
  const handleClick = async (selSubscribeTab: string) => {
    const resetApi = ['binance', 'coinbase']
    // Logic: Reset Context
    if (resetApi.includes(selSubscribeTab.toLowerCase())) {
      setSubscribeTab(selSubscribeTab)
    }
  }

  /* -------------------------------------------------------------------------------------------- */
  return (
    <div className={Style.List_Container}>
      <div className={Style.Title_Bar}>Apis</div>
      <div className={Style.List}>
        {selApiList && selApiList.length === 0 ? (
          <div className={Style.Row}>Please configure your API keys on the Connect page.</div>
        ) : (
          selApiList &&
          selApiList.map(api => (
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
