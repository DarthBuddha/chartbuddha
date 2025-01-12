/* ---------------------------------------------------------------------------------------------- */
//! - pages.subscribe.coinbase.SubscribeCoinbaseProductList.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useCallback, useEffect } from 'react';
// Tauri
import { invoke } from '@tauri-apps/api/core';
import { error, info } from '@tauri-apps/plugin-log';
// Interface
import { useInterfaceContext } from 'interface/InterfaceContext';
import { ProductsType } from 'interface/coinbase/products/Products';
// CSS Modules
import Style from './SubscribeCoinbaseProductList.module.css';

/* ---------------------------------------------------------------------------------------------- */

const SubscribeCoinbaseProductList: React.FC = () => {
  // State Management
  const { selCoinbaseProductType, setCoinbaseProductType } = useInterfaceContext();
  const { selCoinbaseProductList, setCoinbaseProductList } = useInterfaceContext();

  // Button Click: Product Type
  const clickProductType = (productType: string) => {
    const resetProductType = ['spot', 'future', 'perpetual'];
    if (resetProductType.includes(productType)) {
      setCoinbaseProductType(productType);
    }
  };

  // Load: Product List
  const loadProductList = useCallback(async () => {
    try {
      const response: ProductsType = await invoke('coinbase_product_list', {
        productType: selCoinbaseProductType || 'spot',
      });
      setCoinbaseProductList(response);
    } catch (err) {
      if (err instanceof Error) {
        error(err.toString());
      } else {
        error(String(err));
      }
    }
  }, [selCoinbaseProductType, setCoinbaseProductList]);

  // Initialize on Component load
  useEffect(() => {
    if (selCoinbaseProductType) {
      loadProductList();
    }
  }, [selCoinbaseProductType, loadProductList]);

  // const [selectedProducts, setSelectedProducts] = useState<Type_ProductData[]>([]);

  // Button Click: Product
  const clickProduct = (selProduct: ProductsType) => {
    info!(JSON.stringify(selProduct));
    // Handle product click logic here
  };

  const getStyleForValue = (value: string) => {
    return parseFloat(value) >= 0 ? Style.Positive : Style.Negative;
  };

  const formatPercentage = (value: string) => {
    return parseFloat(value).toFixed(2);
  };

  /* -------------------------------------------------------------------------------------------- */

  return (
    <div className={Style.Component}>
      <div className={Style.NavMenu}>
        <div
          className={`${Style.Button} ${selCoinbaseProductType === 'spot' ? Style.Active : ''}`}
          onClick={() => {
            clickProductType('spot');
          }}
        >
          Spot
        </div>
        <div
          className={`${Style.Button} ${selCoinbaseProductType === 'future' ? Style.Active : ''}`}
          onClick={() => {
            clickProductType('future');
          }}
        >
          Futures
        </div>
        <div
          className={`${Style.Button} ${selCoinbaseProductType === 'perps' ? Style.Active : ''}`}
          onClick={() => {
            clickProductType('perps');
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
                    Price: <span className={getStyleForValue(product.price ?? '')}>{product.price}</span>
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

export default SubscribeCoinbaseProductList;

/* ---------------------------------------------------------------------------------------------- */
