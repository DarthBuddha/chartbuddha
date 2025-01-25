/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Connect - ConnectTab
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This component is responsible for rendering the data connection settings.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/connect/ConnectTab.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Context
import { useInterfaceContext } from 'context/InterfaceContext'
// Components
import DatabaseConfig from './tab/DatabaseConfig'
import BinanceConfig from 'page/connect/tab/BinanceConfig'
import CoinbaseConfig from 'page/connect/tab/CoinbaseConfig'
// CSS Modules
import Style from './ConnectTab.module.css'

/* ---------------------------------------------------------------------------------------------- */

const ConnectTab: React.FC = () => {
  // Context: Interface
  const { selApi } = useInterfaceContext()

  switch (selApi) {
    case 'Binance':
      return (
        <div className={Style.Component}>
          <BinanceConfig />
          {/* <div className={Style.Title}>Binance</div>
          <div className={Style.Main_Container}>Binance API is not supported yet.</div> */}
        </div>
      )

    case 'Coinbase':
      return (
        <div className={Style.Component}>
          <CoinbaseConfig />
        </div>
      )

    default:
      return (
        <div className={Style.Component}>
          <DatabaseConfig />
        </div>
      )
  }
}

export default ConnectTab

/* ---------------------------------------------------------------------------------------------- */
