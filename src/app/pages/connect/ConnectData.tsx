/* ---------------------------------------------------------------------------------------------- */
//! # Component: App Pages Connect - ConnectData
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This component is responsible for rendering the data connection settings.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/pages/connect/ConnectData.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Context
import { useInterfaceContext } from 'app/context/InterfaceContext'
// Components
import Coinbase_Connect from 'broker/coinbase/ConnectCoinbase'
// CSS Modules
import Style from './ConnectData.module.css'

/* ---------------------------------------------------------------------------------------------- */

const ConnectData: React.FC = () => {
  // State Management
  const { selApi } = useInterfaceContext()

  switch (selApi) {
    case 'binance':
      return (
        <div className={Style.Component}>
          <div className={Style.Title}>Binance</div>
          <div className={Style.Main_Container}>Binance API is not supported yet.</div>
        </div>
      )

    case 'coinbase':
      return (
        <div className={Style.Component}>
          <Coinbase_Connect />
        </div>
      )

    default:
      return (
        <div className={Style.Component}>
          <div className={Style.Title}>Connection Settings</div>
          <div className={Style.Main_Container}>Select a provider to configure api settings.</div>
        </div>
      )
  }
}

export default ConnectData

/* ---------------------------------------------------------------------------------------------- */
