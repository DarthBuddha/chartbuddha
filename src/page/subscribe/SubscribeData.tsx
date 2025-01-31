/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Subscribe - SubscribeData
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Subscribe Data component for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/subscribe/SubscribeData.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Context
import { useAppContext } from '../../hooks/useAppContext'
// Components
import SubscribeCoinbase from './tab/SubscribeCoinbase'
// CSS Module
import Style from './SubscribeData.module.css'

/* ---------------------------------------------------------------------------------------------- */

const SubscribeData: React.FC = () => {
  // State Management
  const { selApi } = useAppContext()

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
