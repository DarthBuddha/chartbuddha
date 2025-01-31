/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Connect - ConnectApiList
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * ConnectApiList component is responsible for rendering the list of available apis.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/connect/ConnectApiList.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Context
import { useAppContext } from '../../hooks/useAppContext'
// import { DataApiType } from 'app/context/broker/Coinbase.tsx'
// CSS Module
import Style from './Connect.module.css'

/* ---------------------------------------------------------------------------------------------- */

const ConnectApiList: React.FC = () => {
  // Context: Interface
  const { setConnectTab } = useAppContext()

  // Click: Connect Api List
  const handleClick = async (selTab: string) => {
    const resetTab = ['Database', 'Binance', 'Coinbase']

    // Logic: Set Context
    if (resetTab.includes(selTab)) {
      setConnectTab(selTab)
    }
  }

  return (
    <div className={Style.ConnectApiListComponent}>
      <div className={Style.Header}>Data Source</div>
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
