/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Subscribe Tab - SubscribeCoinbaseProductList
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This component is responsible for subscribing to the Coinbase API.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/subscribe/tab/SubscribeCoinbaseProductList.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useCallback, useEffect } from 'react'
// Tauri
import { invoke } from '@tauri-apps/api/core'
import { error, info } from '@tauri-apps/plugin-log'
// Context
import { useAppContext } from '../../../hooks/useAppContext'
import { CoinbaseProductsInterface } from '../../../interface/CoinbaseContext'
// CSS Modules
import Style from '../../../css/SubscribeCoinbaseProductList.module.css'

/* ---------------------------------------------------------------------------------------------- */

const SubscribeCoinbaseProductList: React.FC = () => {
  // State Management
  const { selCoinbaseProductType, setCoinbaseProductType } = useAppContext()
  const { selCoinbaseProductList, setCoinbaseProductList } = useAppContext()
  const { setCoinbaseProduct } = useAppContext()

  // Button Click: Product Type
  const clickProductType = (productType: string) => {
    const resetProductType = ['spot', 'future', 'perpetual']
    if (resetProductType.includes(productType)) {
      setCoinbaseProductType(productType)
    }
  }

  // Load: Product List
  const loadProductList = useCallback(async () => {
    try {
      const response: string = await invoke('coinbase_products_list', {
        productType: selCoinbaseProductType || 'spot',
      })
      const parsedResponse: { products: CoinbaseProductsInterface[] } = JSON.parse(response)
      setCoinbaseProductList(parsedResponse.products)
    } catch (err) {
      if (err instanceof Error) {
        error(err.toString())
      } else {
        error(String(err))
      }
    }
  }, [selCoinbaseProductType, setCoinbaseProductList])

  // Initialize on Component load
  useEffect(() => {
    if (selCoinbaseProductType) {
      loadProductList()
    }
  }, [selCoinbaseProductType, loadProductList])

  // Button Click: Product
  const clickProduct = (product: CoinbaseProductsInterface) => {
    info!(JSON.stringify(product))
    setCoinbaseProduct(product)
  }

  const getStyleForValue = (value: string) => {
    return parseFloat(value) >= 0 ? Style.Positive : Style.Negative
  }

  const formatPercentage = (value: string) => {
    return parseFloat(value).toFixed(2)
  }

  const formatVolume = (value: string) => {
    return parseFloat(value).toFixed(2)
  }

  /* -------------------------------------------------------------------------------------------- */

  return (
    <div className={Style.Component}>
      <div className={Style.NavMenu}>
        <div
          className={`${Style.Button} ${selCoinbaseProductType === 'spot' ? Style.Active : ''}`}
          onClick={() => {
            clickProductType('spot')
          }}
        >
          Spot
        </div>
        <div
          className={`${Style.Button} ${selCoinbaseProductType === 'future' ? Style.Active : ''}`}
          onClick={() => {
            clickProductType('future')
          }}
        >
          Futures
        </div>
        <div
          className={`${Style.Button} ${selCoinbaseProductType === 'perps' ? Style.Active : ''}`}
          onClick={() => {
            clickProductType('perps')
          }}
        >
          Perps
        </div>
      </div>
      <div className={Style.Product_List}>
        {Array.isArray(selCoinbaseProductList) &&
          selCoinbaseProductList.map((product, index) => (
            <div key={index} className={Style.Product} onClick={() => clickProduct(product)}>
              <div className={Style.Product_Details_Container}>
                <div className={Style.Product_Name}>
                  <div>{product.display_name}</div>
                  <div>Status: {product.status}</div>
                </div>
                <div className={Style.Product_Price}>
                  <div>
                    Price:{' '}
                    <span className={getStyleForValue(product.price ?? '')}>{product.price}</span>
                  </div>
                  <div>
                    Change (24h):{' '}
                    <span className={getStyleForValue(product.price_percentage_change_24h ?? '')}>
                      {formatPercentage(product.price_percentage_change_24h ?? '0')}%
                    </span>
                  </div>
                </div>
                <div className={Style.Product_Volume}>
                  <div>Volume (24h): {formatVolume(product.volume_24h ?? '0')}</div>
                  <div>
                    Change (24h):{' '}
                    <span className={getStyleForValue(product.volume_percentage_change_24h ?? '')}>
                      {formatPercentage(product.volume_percentage_change_24h ?? '0')}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default SubscribeCoinbaseProductList

/* ---------------------------------------------------------------------------------------------- */
