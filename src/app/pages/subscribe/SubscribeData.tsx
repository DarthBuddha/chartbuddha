/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Component: App Pages Subscribe - SubscribeData
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Subscribe Data component for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/pages/subscribe/SubscribeData.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Context
import { useInterfaceContext } from 'app/context/InterfaceContext'
// Components
import SubscribeCoinbase from 'broker/coinbase/SubscribeCoinbase'
// CSS Module
import Style from './SubscribeData.module.css'

/* ---------------------------------------------------------------------------------------------- */

const SubscribeData: React.FC = () => {
  // State Management
  const { selApi } = useInterfaceContext()

  switch (selApi) {
    case 'coinbase':
      return (
        <div className={Style.Page}>
          <SubscribeCoinbase />
        </div>
      )
    case 'binance':
      return (
        <div className={Style.Page}>
          <div className={Style.Title}>Binance</div>
          <div className={Style.Body}>Binance API is not supported yet.</div>
        </div>
      )
    default:
      return (
        <div className={Style.Page}>
          <div className={Style.Title}>Select a Provider</div>
          <div className={Style.Body}>Select a provider to configure api settings.</div>
        </div>
      )
  }
}

export default SubscribeData

/* ---------------------------------------------------------------------------------------------- */
