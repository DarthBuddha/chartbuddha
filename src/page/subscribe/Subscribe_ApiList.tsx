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

// Tauri
import { info } from '@tauri-apps/plugin-log'
// React
import React from 'react'
// import { load } from '@tauri-apps/plugin-store'
// Hooks:
import { useAppContext } from 'hooks/useAppContext.ts'
// Interface:
import { PageTabType } from 'interface/InterfaceContext'
// Constants
// import { API_LIST_STORE } from '../../constants'
// CSS Module
import Style_App from 'css/App.module.css'
import Style from './css/SubscribeApiList.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Subscribe_ApiList: React.FC = () => {
  // Context: Interface
  const { setInterface } = useAppContext()
  const { selApiList } = useAppContext()

  // Debug: Log selApiList
  info('selApiList: ' + JSON.stringify(selApiList))

  // Click: Connect Api List
  const handleClick = async (tab: string) => {
    // Debug: Log selApiList
    info('Select Tab: ' + JSON.stringify(tab.charAt(0).toUpperCase() + tab.slice(1)))

    const resetTab = ['Coinbase', 'Binance'] // Add more APIs as needed

    // Logic: Set Context
    if (resetTab.includes(tab.charAt(0).toUpperCase() + tab.slice(1))) {
      setInterface({
        page: 'Subscribe',
        page_tab: (tab.charAt(0).toUpperCase() + tab.slice(1)) as PageTabType,
      })
    }
  }

  /* -------------------------------------------------------------------------------------------- */
  return (
    <div className={Style.List_Container}>
      <div className={Style_App.Header}>Apis</div>
      <div className={Style.List}>
        {selApiList && selApiList.api_list_values.length === 0 ? (
          <div className={Style.Row}>Please configure your API keys on the Connect page.</div>
        ) : (
          selApiList &&
          selApiList.api_list_values.map(api => {
            const tab = api
            return (
              <div
                key={api}
                className={Style.Row}
                onClick={() => tab && typeof tab === 'string' && handleClick(tab)}
              >
                {tab && typeof tab === 'string' && tab.charAt(0).toUpperCase() + tab.slice(1)}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Subscribe_ApiList

/* ---------------------------------------------------------------------------------------------- */
