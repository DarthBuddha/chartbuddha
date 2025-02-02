/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Connect - ConnectTab
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * ConnectTab component is responsible for rendering the selected tab content.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/page/connect/ConnectTab.tsx
/* ---------------------------------------------------------------------------------------------- */

// Tauri
import { info } from '@tauri-apps/plugin-log'
// React
import React from 'react'
// Context
import { useAppContext } from '../../hooks/useAppContext'
// Components
import DatabaseConfig from './tab/DatabaseConfig'
import CoinbaseConfig from './tab/CoinbaseConfig'
// CSS Module
import Style from './css/Connect.module.css'

/* ---------------------------------------------------------------------------------------------- */

const ConnectTab: React.FC = () => {
  // Context: Interface
  const { selInterface } = useAppContext()
  info('selInterface: ' + JSON.stringify(selInterface)) // Debugging line
  // const { page_tab } = selInterface || {}
  const page_tab = selInterface?.page_tab || 'Database-Tab' // Defaults to 'Database-Tab'

  switch (page_tab) {
    case 'Database-Tab':
      return (
        <div className={Style.ConfigTabContainer}>
          <DatabaseConfig />
        </div>
      )

    case 'Coinbase-Tab':
      return (
        <div className={Style.ConfigTabContainer}>
          <CoinbaseConfig />
        </div>
      )

    default:
      return (
        <div className={Style.ConfigTabContainer}>
          <DatabaseConfig />
        </div>
      )
  }
}

export default ConnectTab

/* ---------------------------------------------------------------------------------------------- */
