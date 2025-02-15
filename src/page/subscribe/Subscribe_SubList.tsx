/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Subscribe - SubscribeSubList
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Subscribe Sub List page for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/subscribe/SubscribeSubList.tsx
/* ---------------------------------------------------------------------------------------------- */

// React:
import React from 'react'
// import React, { useEffect, useState } from 'react'
// Tauri:
// import { error } from '@tauri-apps/plugin-log'
// import { load } from '@tauri-apps/plugin-store'
// Hooks:
// import { useAppContext } from 'hooks/useAppContext'
// Interface:
// import { BrokerInterface } from 'interface/BrokerContext'
// import { BrokerProductsInterface } from 'interface/BrokerContext'
// CSS Modules
import Style_App from 'css/App.module.css'
import Style from './css/SubscribeSubList.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Subscribe_SubList: React.FC = () => {
  // // State Management
  // const { selInterface, setInterface } = useAppContext()

  // // Store Management
  // const [selApiList, setApiList] = useState<{ api: string; symbol: string }[]>([])

  // // Load Keys
  // useEffect(() => {
  //   getSubscriptionsList()
  // }, [])

  // // Get Subscriptions List
  // const getSubscriptionsList = async () => {
  //   try {
  //     const apis = ['binance', 'coinbase'] // Add more APIs as needed
  //     const subscriptions: { api: string; symbol: string }[] = []

  //     const store_subscriptions = await load('list_sub.json')
  //     const appSubscriptions = await store_subscriptions.get<{
  //       [key: string]: { symbol: string; subscription_type: string }[]
  //     }>('subscriptions')
  //     if (appSubscriptions) {
  //       for (const api of apis) {
  //         const apiData = appSubscriptions[api]
  //         if (apiData) {
  //           apiData.forEach(subscription => {
  //             if (subscription.subscription_type === 'broker') {
  //               subscriptions.push({ api, symbol: subscription.symbol })
  //             }
  //           })
  //         }
  //       }
  //     }

  //     setSelectedApiListStore(subscriptions)
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       error(`Error loading subscriptions list: ${err.message}`)
  //     } else {
  //       error(`Unexpected error: ${String(err)}`)
  //     }
  //   }
  // }

  // // Button Click: Handle Data Api
  // const handleClick = async (selApi: string, selSymbol: string) => {
  //   const resetApi = ['binance', 'coinbase']
  //   // Logic: Reset Context
  //   if (resetApi.includes(selApi)) {
  //     setApi(selApi)
  //     const product: BrokerProductsInterface = { product_id: selSymbol }
  //     setCoinbaseProduct(product)
  //   }
  // }

  /* -------------------------------------------------------------------------------------------- */
  return (
    <div className={Style.List_Container}>
      <div className={Style_App.Header}>Subscriptions</div>
      {/* <div className={Style.List}>
        {selectedApiListStore.length === 0 ? (
          <div className={Style.Row}>Your Subscription List.</div>
        ) : (
          selectedApiListStore.map(({ api, symbol }) => (
            <div
              key={`${api}-${symbol}`}
              className={Style.Row}
              onClick={() => handleClick(api, symbol)}
            >
              {`${api.charAt(0).toUpperCase() + api.slice(1)} - ${symbol}`}
            </div>
          ))
        )}
      </div> */}
    </div>
  )
}

export default Subscribe_SubList

/* ---------------------------------------------------------------------------------------------- */
