/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Subscribe -> SubscribeData
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Subscribe Data component for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/page/subscribe/Subscribe_Tab.tsx
/* ---------------------------------------------------------------------------------------------- */

// Tauri
import { info } from '@tauri-apps/plugin-log'
// React
import React from 'react'
// Context
import { useAppContext } from 'hooks/useAppContext'
// Components
import SubscribeCoinbase from './tab/SubscribeCoinbase'
// CSS Module
import Style_App from 'css/App.module.css'
import Style from './css/SubscribeData.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Subscribe_Tab: React.FC = () => {
  // Context: Interface
  const { selInterface } = useAppContext()
  info('selInterface: ' + JSON.stringify(selInterface)) // Debugging line
  const tab = selInterface?.page_tab || null // Defaults to 'null'

  switch (tab) {
    case 'Coinbase':
      return (
        <div className={Style.Page}>
          <SubscribeCoinbase />
        </div>
      )
    case 'Binance':
      return (
        <div className={Style.Page}>
          <div className={Style_App.Header}>Binance</div>
          <div className={Style.Body}>Binance API is not supported yet.</div>
        </div>
      )
    default:
      return (
        <div className={Style.Page}>
          <div className={Style_App.Header}>Select a Provider</div>
          <div className={Style.Body}>Select a provider to configure api settings.</div>
        </div>
      )
  }
}

export default Subscribe_Tab

/* ---------------------------------------------------------------------------------------------- */
