//! -------------------------------------------------------------------------------------------- !//
//! Coinbase ProductList Spot
//! -------------------------------------------------------------------------------------------- !//
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useEffect, useState } from 'react';
// Tauri
// import { getStore } from '@tauri-apps/plugin-store';
// import { listen } from '@tauri-apps/api/event';
// import { debug, error } from '@tauri-apps/plugin-log';
// import { invoke } from '@tauri-apps/api/core';
// Interface
import { Type_ProductData } from 'interface/context/Type_ProductData';
// import { useContext_Broker } from 'interface/Broker_Context';
// CSS Modules
import Style from './Coinbase_ProductList_Spot.module.css';

/* ---------------------------------------------------------------------------------------------- */
//
const Coinbase_ProductList_Spot: React.FC = () => {
  // Set the selected broker product type to SPOT
  // const { setSelected_BrokerProductType, setSelected_BrokerProductData } = useContext_Broker();
  // useEffect(() => {
  //   setSelected_BrokerProductType('spot');
  // }, [setSelected_BrokerProductType]);

  // Get Style for Value
  const getStyleForValue = (value: string) => {
    return parseFloat(value) >= 0 ? Style.Positive : Style.Negative;
  };
  const formatPercentage = (value: string) => {
    return parseFloat(value).toFixed(2);
  };

  // Handle Product Click
  const handleProductClick = (product: Type_ProductData) => {
    // setSelected_BrokerProductData(product);
  };

  // State to store the products
  const [spotProducts, setSpotProducts] = useState<Type_ProductData[]>([]);

  return (
    <div className={Style.Component}>
      <div className={Style.Product_List}>
        {spotProducts.map((product, index) => (
          <div key={index} className={Style.Product} onClick={() => handleProductClick(product)}>
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
                <div>Volume (24h): {product.volume_24h}</div>
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
  );
};

export default Coinbase_ProductList_Spot;
//
/* ---------------------------------------------------------------------------------------------- */
