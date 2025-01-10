//! -------------------------------------------------------------------------------------------- !//
//! - Coinbase ProductList
//! -------------------------------------------------------------------------------------------- !//
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useState } from 'react';
// Tauri
import { info, error } from '@tauri-apps/plugin-log';
import { invoke } from '@tauri-apps/api/core';
// Interface
import { Type_ProductData } from 'context/type/Type_ProductData';
// import { useContext_Interface } from 'context/Context_Interface';
// CSS Modules
import Style from './Coinbase_ProductList.module.css';

/* ---------------------------------------------------------------------------------------------- */
//
const Coinbase_Product_List: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('SPOT');
  // const { setFocus_ProductType } = useContext_Interface();
  const [products, setProducts] = useState<Type_ProductData[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await invoke<string>('coinbase_product_list', {
        product_type: activeTab,
      });
      const productList = JSON.parse(response);
      setProducts(productList[activeTab.toUpperCase()] || []);
    } catch (err) {
      error(`Failed to fetch products: ${err}`);
    }
  };

  // Fetch products based on the active tab
  // useEffect(() => {
  //   fetchProducts();
  // });

  // Handle Broker Click
  const handleClick = (productType: string) => {
    info(`\nProduct Type: ${productType}`);
    fetchProducts();
  };

  const getStyleForValue = (value: string) => {
    return parseFloat(value) >= 0 ? Style.Positive : Style.Negative;
  };

  const formatPercentage = (value: string) => {
    return parseFloat(value).toFixed(2);
  };

  const handleProductClick = (product: Type_ProductData) => {
    // Handle product click logic here
  };

  return (
    <div className={Style.Component}>
      <div className={Style.NavMenu}>
        <div
          className={`${Style.NavButton} ${activeTab === 'SPOT' ? Style.Active : ''}`}
          onClick={() => {
            setActiveTab('SPOT');
            handleClick('SPOT');
          }}
        >
          Spot
        </div>
        <div
          className={`${Style.NavButton} ${activeTab === 'FUTURE' ? Style.Active : ''}`}
          onClick={() => {
            setActiveTab('FUTURE');
            handleClick('FUTURE');
          }}
        >
          Futures
        </div>
        <div
          className={`${Style.NavButton} ${activeTab === 'PERPETUAL' ? Style.Active : ''}`}
          onClick={() => {
            setActiveTab('PERPETUAL');
            handleClick('PERPETUAL');
          }}
        >
          Perps
        </div>
      </div>
      <div className={Style.Product_List}>
        {products.map((product, index) => (
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

export default Coinbase_Product_List;
/* ---------------------------------------------------------------------------------------------- */
