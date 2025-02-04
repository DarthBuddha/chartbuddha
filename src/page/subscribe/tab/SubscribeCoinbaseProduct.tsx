/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Subscribe Tab - SubscribeCoinbaseProduct
// ---------------------------------------------------------------------------------------------- //
//! #### Description:
//! * This component is responsible for subscribing to the Coinbase API.
// ---------------------------------------------------------------------------------------------- //
//! ##### Path:
//! * page/subscribe/tab/SubscribeCoinbaseProduct.tsx
// ---------------------------------------------------------------------------------------------- //

// React:
import React from 'react'
// import React, { useEffect, useState } from 'react';
// Tauri:
import { error, info } from '@tauri-apps/plugin-log'
import { invoke } from '@tauri-apps/api/core'
// Hooks:
import { useAppContext } from 'hooks/useAppContext'
// Interface:
// import { BrokerInterface } from 'interface/BrokerContext'
// import { BrokerApiInterface } from 'interface/BrokerContext'
// import { BrokerProductsInterface } from 'interface/BrokerContext'
// CSS Modules:
import Style from './css/SubscribeCoinbaseProduct.module.css'

/* ---------------------------------------------------------------------------------------------- */

const SubscribeCoinbaseProduct: React.FC = () => {
  // Context
  const { selBrokerApi, selInterface } = useAppContext()

  const selectedProduct = selBrokerApi?.broker_api_coinbase?.broker_products?.find(
    product => product.product_id === selInterface?.product_id,
  )

  // Button Click: Handle Product Subscriptions
  const buttonClick_Subscribe = async () => {
    try {
      const response: string = await invoke('save_subscription_cmd', {
        // Subscription: Meta
        subscriptionType: 'Broker', // Pass as string
        exchangeType: 'Spot', // Pass as string
        platform: 'Coinbase',
        symbol: selBrokerApi?.broker_api_coinbase?.broker_products?.[0]?.product_id,
        // Subscription: Settings
        tick: 10, // Changed to tickSize
        granularity: 0.01, // Changed to granularity
        historical: 'None',
      })
      info('[coinbase_subscribe]\n' + response)
    } catch (err) {
      if (err instanceof Error) {
        error(err.toString())
      } else {
        error(String(err))
      }
    }
  }

  // Button Click: Handle Product UnSubscriptions
  const buttonClick_UnSubscribe = async () => {
    try {
      const response: string = await invoke('delete_subscription_cmd', {
        // Subscription: Meta
        // subscriptionType: 'broker',
        platform: 'Coinbase',
        // exchange: 'spot',
        symbol: selBrokerApi?.broker_api_coinbase?.broker_products?.[0]?.product_id,
        // Subscription: Settings
        // tick: 10, // Changed to tickSize
        // granularity: 0.01, // Changed to granularity
        // historical: 'none',
      })
      info('[coinbase_subscribe]\n' + response)
    } catch (err) {
      if (err instanceof Error) {
        error(err.toString())
      } else {
        error(String(err))
      }
    }
  }

  // Component Return
  return (
    <div className={Style.Page}>
      <div className={Style.Selection_Menu}>
        <div className={Style.Selection_Title}>Coinbase</div>
        <div className={Style.Selection_Title}>
          Selected: {selectedProduct ? selectedProduct.display_name : 'Select Product'}
        </div>
      </div>
      <div className={Style.Product_Container}>
        <div>
          {selectedProduct && (
            <>
              <div>Product ID: {selectedProduct.product_id}</div>
              <div>Price: {selectedProduct.price}</div>
              <div>Price Change (24h): {selectedProduct.price_percentage_change_24h}%</div>
              <div>Volume (24h): {selectedProduct.volume_24h}</div>
              <div>Volume Change (24h): {selectedProduct.volume_percentage_change_24h}%</div>
              <div>Base Increment: {selectedProduct.base_increment}</div>
              <div>Quote Increment: {selectedProduct.quote_increment}</div>
              <div>Quote Min Size: {selectedProduct.quote_min_size}</div>
              <div>Quote Max Size: {selectedProduct.quote_max_size}</div>
              <div>Base Min Size: {selectedProduct.base_min_size}</div>
              <div>Base Max Size: {selectedProduct.base_max_size}</div>
              <div>Base Name: {selectedProduct.base_name}</div>
              <div>Quote Name: {selectedProduct.quote_name}</div>
              <div>Status: {selectedProduct.status}</div>
              <div>Cancel Only: {selectedProduct.cancel_only ? 'Yes' : 'No'}</div>
              <div>Limit Only: {selectedProduct.limit_only ? 'Yes' : 'No'}</div>
              <div>Post Only: {selectedProduct.post_only ? 'Yes' : 'No'}</div>
              <div>Trading Disabled: {selectedProduct.trading_disabled ? 'Yes' : 'No'}</div>
              <div>Auction Mode: {selectedProduct.auction_mode ? 'Yes' : 'No'}</div>
            </>
          )}
        </div>
      </div>
      <div className={Style.Button_Container}>
        <button type="button" className={Style.Subscribe_Button} onClick={buttonClick_Subscribe}>
          Save Subscription
        </button>
        <button
          type="button"
          className={Style.UnSubscribe_Button}
          onClick={buttonClick_UnSubscribe}
        >
          Delete Subscription
        </button>
      </div>
    </div>
  )
}

export default SubscribeCoinbaseProduct

/* ---------------------------------------------------------------------------------------------- */
