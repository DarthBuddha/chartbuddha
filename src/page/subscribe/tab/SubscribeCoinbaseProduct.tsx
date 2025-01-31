/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Subscribe Tab - SubscribeCoinbaseProduct
// ---------------------------------------------------------------------------------------------- //
//! #### Description:
//! * This component is responsible for subscribing to the Coinbase API.
// ---------------------------------------------------------------------------------------------- //
//! ##### Path: page/subscribe/tab/SubscribeCoinbaseProduct.tsx
// ---------------------------------------------------------------------------------------------- //

// React
import React from 'react'
// import React, { useEffect, useState } from 'react';
// Tauri
import { error, info } from '@tauri-apps/plugin-log'
import { invoke } from '@tauri-apps/api/core'
// Context
import { useAppContext } from '../../../hooks/useAppContext'
// CSS Modules
import Style from '../../../css/SubscribeCoinbaseProduct.module.css'

/* ---------------------------------------------------------------------------------------------- */

const SubscribeCoinbaseProduct: React.FC = () => {
  // State Management
  const { selCoinbaseProduct } = useAppContext()

  // Button Click: Handle Product Subscriptions
  const buttonClick_Subscribe = async () => {
    try {
      const response: string = await invoke('save_subscription_cmd', {
        // Subscription: Meta
        subscriptionType: 'Broker', // Pass as string
        exchangeType: 'Spot', // Pass as string
        platform: 'Coinbase',
        symbol: selCoinbaseProduct?.product_id,
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
        symbol: selCoinbaseProduct?.product_id,
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
          Selected: {selCoinbaseProduct ? selCoinbaseProduct.display_name : 'Select Product'}
        </div>
      </div>
      <div className={Style.Product_Container}>
        <div>
          {selCoinbaseProduct && (
            <>
              <div>Product ID: {selCoinbaseProduct.product_id}</div>
              <div>Price: {selCoinbaseProduct.price}</div>
              <div>Price Change (24h): {selCoinbaseProduct.price_percentage_change_24h}%</div>
              <div>Volume (24h): {selCoinbaseProduct.volume_24h}</div>
              <div>Volume Change (24h): {selCoinbaseProduct.volume_percentage_change_24h}%</div>
              <div>Base Increment: {selCoinbaseProduct.base_increment}</div>
              <div>Quote Increment: {selCoinbaseProduct.quote_increment}</div>
              <div>Quote Min Size: {selCoinbaseProduct.quote_min_size}</div>
              <div>Quote Max Size: {selCoinbaseProduct.quote_max_size}</div>
              <div>Base Min Size: {selCoinbaseProduct.base_min_size}</div>
              <div>Base Max Size: {selCoinbaseProduct.base_max_size}</div>
              <div>Base Name: {selCoinbaseProduct.base_name}</div>
              <div>Quote Name: {selCoinbaseProduct.quote_name}</div>
              <div>Status: {selCoinbaseProduct.status}</div>
              <div>Cancel Only: {selCoinbaseProduct.cancel_only ? 'Yes' : 'No'}</div>
              <div>Limit Only: {selCoinbaseProduct.limit_only ? 'Yes' : 'No'}</div>
              <div>Post Only: {selCoinbaseProduct.post_only ? 'Yes' : 'No'}</div>
              <div>Trading Disabled: {selCoinbaseProduct.trading_disabled ? 'Yes' : 'No'}</div>
              <div>Auction Mode: {selCoinbaseProduct.auction_mode ? 'Yes' : 'No'}</div>
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
