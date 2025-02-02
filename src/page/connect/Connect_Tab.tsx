/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Connect -> Connect_Tab
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Connect_Tab component is responsible for rendering the selected tab content.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * page/connect/Connect_Tab.tsx
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
// import Style from './css/Connect_Tab.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Connect_Tab: React.FC = () => {
  // Context: Interface
  const { selInterface } = useAppContext()
  info('selInterface: ' + JSON.stringify(selInterface)) // Debugging line
  // const { page_tab } = selInterface || {}
  const page_tab = selInterface?.page_tab || 'Database-Tab' // Defaults to 'Database-Tab'

  switch (page_tab) {
    case 'Database-Tab':
      return (
        // <div className={Style.ConfigTabContainer}>
        <DatabaseConfig />
        // </div>
      )

    case 'Coinbase-Tab':
      return (
        // <div className={Style.ConfigTabContainer}>
        <CoinbaseConfig />
        // </div>
      )

    default:
      return (
        // <div className={Style.ConfigTabContainer}>
        <DatabaseConfig />
        // </div>
      )
  }
}

export default Connect_Tab

/* ---------------------------------------------------------------------------------------------- */
