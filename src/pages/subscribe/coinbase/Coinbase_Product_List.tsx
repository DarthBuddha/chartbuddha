/* ---------------------------------------------------------------------------------------------- */
//! - Coinbase ProductList
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useEffect, useState } from 'react';
// Tauri
import { load } from '@tauri-apps/plugin-store';
import { info, error } from '@tauri-apps/plugin-log';
// import { invoke } from '@tauri-apps/api/core';
// Hooks
// import { useProductType } from './hooks/useProductType';
// Interface
// import { CoinbaseProductDataType } from 'interface/type/CoinbaseProductDataType';
// CSS Modules
import Style from './Coinbase_Product_List.module.css';

/* ---------------------------------------------------------------------------------------------- */

interface Subscribe_Product_List_Props {
  setProductType: (productType: string) => void;
}

/* ---------------------------------------------------------------------------------------------- */

const store = await load('.nav_subscribe');

/* ---------------------------------------------------------------------------------------------- */

const Coinbase_Product_List: React.FC<Subscribe_Product_List_Props> = ({ setProductType }) => {
  // Hooks
  // const { productType } = useProductType();
  // State Management
  const [activeTab, setActiveTab] = useState<string>('');
  // const [selectedProducts, setSelectedProducts] = useState<Type_ProductData[]>([]);

  // // Initialize on Component load
  // useEffect(() => {
  //   info('useEffect');
  //   firstLoad();
  //   loadProductList();
  // }, []);

  // const firstLoad = async () => {
  //   // await store.set('nav_subscribe', { productType: 'SPOT' });
  //   setProductType('SPOT');
  // };

  const loadProductList = async () => {
    try {
      const selectedProductType = await store.get<{ product_type: string }>('nav_subscribe');
      // const contractType = await store.get<{ contract_type: string }>('nav_subscribe');

      if (selectedProductType) {
        setActiveTab(selectedProductType.product_type);
      }
    } catch (err) {
      if (err instanceof Error) {
        error(err.toString());
      } else {
        error(String(err));
      }
    }
  };

  // Fetch Products
  // const fetchProducts = async () => {
  //   try {
  //     const response = await invoke<string>('coinbase_product_list', {
  //       productType: activeTab,
  //     });
  //     const productList = JSON.parse(response);
  //     setSelectedProducts(productList[activeTab.toUpperCase()] || []);
  //   } catch (err) {
  //     error(`Failed to fetch products: ${err}`);
  //   }
  // };

  // Button Click: Product Type
  const buttonClick_ProductType = (productType: string) => {
    setActiveTab(productType);
    info(`Active Tab: ${productType}`);
    loadProductList();
  };

  // Button Click: Product
  // const handleProductClick = (selectedProduct: Type_ProductData) => {
  //   // Handle product click logic here
  // };

  // const getStyleForValue = (value: string) => {
  //   return parseFloat(value) >= 0 ? Style.Positive : Style.Negative;
  // };

  // const formatPercentage = (value: string) => {
  //   return parseFloat(value).toFixed(2);
  // };

  /* -------------------------------------------------------------------------------------------- */

  return (
    <div className={Style.Component}>
      <div className={Style.NavMenu}>
        <div
          className={`${Style.NavButton} ${activeTab === 'SPOT' ? Style.Active : ''}`}
          onClick={() => {
            // setActiveTab('SPOT');
            buttonClick_ProductType('SPOT');
          }}
        >
          Spot
        </div>
        <div
          className={`${Style.NavButton} ${activeTab === 'FUTURE' ? Style.Active : ''}`}
          onClick={() => {
            // setActiveTab('FUTURE');
            buttonClick_ProductType('FUTURE');
          }}
        >
          Futures
        </div>
        <div
          className={`${Style.NavButton} ${activeTab === 'PERPETUAL' ? Style.Active : ''}`}
          onClick={() => {
            // setActiveTab('PERPETUAL');
            buttonClick_ProductType('PERPETUAL');
          }}
        >
          Perps
        </div>
      </div>
      {/* <div className={Style.Product_List}>
        {selectedProducts.map((product, index) => (
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
      </div> */}
    </div>
  );
};

export default Coinbase_Product_List;

/* ---------------------------------------------------------------------------------------------- */
