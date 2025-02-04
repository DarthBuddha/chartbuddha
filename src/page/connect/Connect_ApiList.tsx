/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Connect -> Connect_ApiList
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Connect_ApiList component is responsible for rendering the list of available apis.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * page/connect/Connect_ApiList.tsx
/* ---------------------------------------------------------------------------------------------- */

// Tauri
import { info } from '@tauri-apps/plugin-log'
// React
import React from 'react'
// Context
import { useAppContext } from 'hooks/useAppContext'
import { PageTabType } from 'interface/InterfaceContext'
// CSS Modules
import Style_App from 'css/App.module.css'
import Style from './css/Connect_ApiList.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Connect_ApiList: React.FC = () => {
  // Context: Interface
  const { setInterface } = useAppContext()

  // Click: Connect Api List
  const handleClick = async (tab: string) => {
    info('tab: ' + tab)
    const resetTab = ['Database', 'Coinbase']

    // Logic: Set Context
    if (resetTab.includes(tab)) {
      setInterface({
        page: 'Connect',
        page_tab: tab as PageTabType,
      })
    }
  }

  return (
    <div className={Style.ConnectApiListComponent}>
      <div className={Style_App.Header}>Data Source</div>
      <div className={Style.List}>
        <div className={Style.Row} onClick={() => handleClick('Database')}>
          Database
        </div>
        {/* <div className={Style.Row} onClick={() => handleClick('Binance-Tab')}>
          Binance
        </div> */}
        <div className={Style.Row} onClick={() => handleClick('Coinbase')}>
          Coinbase
        </div>
      </div>
    </div>
  )
}

export default Connect_ApiList

/* ---------------------------------------------------------------------------------------------- */
