/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Subscribe Tab - SubscribeCoinbaseProductList
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This component is responsible for subscribing to the Coinbase API.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * page/subscribe/tab/SubscribeCoinbaseProductList.tsx
/* ---------------------------------------------------------------------------------------------- */

// React:
import React, { useCallback, useEffect, useState } from 'react'
// Tauri:
import { invoke } from '@tauri-apps/api/core'
import { error, info } from '@tauri-apps/plugin-log'
// Hooks:
import { useAppContext } from 'hooks/useAppContext'
// Context: Interface
import { InterfaceInterface } from 'interface/InterfaceContext'
import { ListTypeProductType } from 'interface/InterfaceContext'
// Context: Broker
// import { BrokerInterface } from 'interface/BrokerContext'
// import { BrokerApiInterface } from 'interface/BrokerContext'
import { BrokerProductsInterface } from 'interface/BrokerContext'
// CSS Modules:
import Style from './css/SubscribeCoinbaseProductList.module.css'

/* ---------------------------------------------------------------------------------------------- */

const SubscribeCoinbaseProductList: React.FC = () => {
  // Context
  const { selInterface, setInterface } = useAppContext()
  const { selBrokerApi, setBrokerApi } = useAppContext()

  // State to track if the product list has been loaded
  const [isProductListLoaded, setIsProductListLoaded] = useState(false)

  // Button Click: Product Type
  const clickProductType = (productType: string) => {
    const resetProductType = ['Spot', 'Future', 'Perpetual']
    if (resetProductType.includes(productType)) {
      setInterface({
        list_type_product: productType as ListTypeProductType,
      })
    }
  }

  // Load: Product List
  const loadProductList = useCallback(async () => {
    try {
      const response: string = await invoke('coinbase_products_list', {
        productType: selInterface?.list_type_product || 'Spot',
      })
      const parsedResponse: { broker_products: BrokerProductsInterface[] } = JSON.parse(response)
      setBrokerApi(prev => ({
        ...prev,
        broker_api_coinbase: {
          ...prev?.broker_api_coinbase,
          broker_products: parsedResponse.broker_products,
        },
      }))
      info!('Product list loaded successfully')
      // info!(JSON.stringify(parsedResponse.broker_products))
      setIsProductListLoaded(true) // Set the state to true after loading the product list
    } catch (err) {
      if (err instanceof Error) {
        error(err.toString())
      } else {
        error(String(err))
      }
    }
  }, [setBrokerApi, selInterface])

  // Initialize on Component load
  useEffect(() => {
    if (selBrokerApi && !isProductListLoaded) {
      loadProductList()
    }
  }, [selBrokerApi, loadProductList, isProductListLoaded])

  // Button Click: Product
  const clickProduct = (product: InterfaceInterface) => {
    info!(JSON.stringify(product))
    setInterface({
      page: 'Subscribe',
      page_tab: 'Coinbase',
      list_type_product: selInterface?.list_type_product,
      product_broker: 'Coinbase',
      product_id: product.product_id, // Ensure this line sets the product_id
    })
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
          className={`${Style.Button} ${selInterface?.list_type_product === 'Spot' ? Style.Active : ''}`}
          onClick={() => {
            clickProductType('Spot')
          }}
        >
          Spot
        </div>
        <div
          className={`${Style.Button} ${selInterface?.list_type_product === 'Future' ? Style.Active : ''}`}
          onClick={() => {
            clickProductType('Future')
          }}
        >
          Futures
        </div>
        <div
          className={`${Style.Button} ${selInterface?.list_type_product === 'Perpetual' ? Style.Active : ''}`}
          onClick={() => {
            clickProductType('Perpetual')
          }}
        >
          Perps
        </div>
      </div>
      <div className={Style.Product_List}>
        {selBrokerApi?.broker_api_coinbase?.broker_products &&
          selBrokerApi.broker_api_coinbase.broker_products.map((product, index) => (
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
