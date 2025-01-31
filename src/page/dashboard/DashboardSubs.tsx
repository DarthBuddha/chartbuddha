/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Dashboard - DashboardSubs
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Dashboard subscription list for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/dashboard/DashboardSubs.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useEffect, useState } from 'react'
// Tauri
import { error } from '@tauri-apps/plugin-log'
import { load } from '@tauri-apps/plugin-store'
// Interface
import { useAppContext } from '../../hooks/useAppContext'
// CSS Modules
import Style from './DashboardSubs.module.css'

/* ---------------------------------------------------------------------------------------------- */

const DashboardSubs: React.FC = () => {
  // State Management
  const { setApi, setProduct } = useAppContext()

  // Store Management
  const [selectedApiListStore, setSelectedApiListStore] = useState<
    { api: string; symbol: string }[]
  >([])

  // Load Keys
  useEffect(() => {
    load_subscriptions_list()
  }, [])

  // Load Subscriptions List
  const load_subscriptions_list = async () => {
    try {
      const apis = ['binance', 'coinbase'] // Add more APIs as needed
      const configuredApis: { api: string; symbol: string }[] = []

      const store_app_subscriptions = await load('list_sub.json')
      const appSubscriptions = await store_app_subscriptions.get<{
        [key: string]: { symbol: string; subscription_type: string }[]
      }>('subscriptions')
      if (appSubscriptions) {
        for (const api of apis) {
          const apiData = appSubscriptions[api]
          if (apiData) {
            apiData.forEach(subscription => {
              if (subscription.subscription_type === 'broker') {
                configuredApis.push({ api, symbol: subscription.symbol })
              }
            })
          }
        }
      }

      setSelectedApiListStore(configuredApis)
    } catch (err) {
      if (err instanceof Error) {
        error(`Error loading subscriptions list: ${err.message}`)
      } else {
        error(`Unexpected error: ${String(err)}`)
      }
    }
  }

  // Button Click: Handle Data Api
  const handleClick = async (selApi: string, selSymbol: string) => {
    const resetApi = ['binance', 'coinbase']
    const resetProduct = selSymbol
    // Logic: Reset Context
    if (resetApi.includes(selApi)) {
      setApi(selApi)
      setProduct(resetProduct)
    }
  }

  /* -------------------------------------------------------------------------------------------- */
  return (
    <div className={Style.List_Container}>
      <div className={Style.Title_Bar}>Subscriptions</div>
      <div className={Style.List}>
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
      </div>
    </div>
  )
}

export default DashboardSubs

/* ---------------------------------------------------------------------------------------------- */
