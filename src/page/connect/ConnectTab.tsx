/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Connect - ConnectTab
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * ConnectTab component is responsible for rendering the selected tab content.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/connect/ConnectTab.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Context
import { useInterfaceContext } from '../../context/InterfaceContext'
// Components
import DatabaseConfig from './tab/DatabaseConfig'
import BinanceConfig from './tab/BinanceConfig'
import CoinbaseConfig from './tab/CoinbaseConfig'
// CSS Modules
import Style from './Connect.module.css'

/* ---------------------------------------------------------------------------------------------- */

const ConnectTab: React.FC = () => {
  // Context: Interface
  const { selConnectTab } = useInterfaceContext()

  switch (selConnectTab) {
    case 'Binance':
      return (
        <div className={Style.ConfigTabContainer}>
          <BinanceConfig />
          {/* <div className={Style.Title}>Binance</div>
          <div className={Style.Main_Container}>Binance API is not supported yet.</div> */}
        </div>
      )

    case 'Coinbase':
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
