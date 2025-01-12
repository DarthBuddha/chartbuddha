/* ---------------------------------------------------------------------------------------------- */
//! - SubscribeCoinbase.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react';
import Split from 'react-split';
// Interface
import { useInterfaceContext } from 'interface/InterfaceContext';
// Components
import SubscribeCoinbaseProduct from './SubscribeCoinbaseProduct';
import SubscribeCoinbaseProductList from './SubscribeCoinbaseProductList';
// CSS Modules
import Style from './SubscribeCoinbase.module.css';

/* ---------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------- */

const SubscribeCoinbase: React.FC = () => {
  // State Management
  const { selectedProductType, setSelectedProductType } = useInterfaceContext();

  // Logic: Reset Interface Context
  if (selectedProductType === null) {
    setSelectedProductType('spot');
  }

  return (
    <div className={Style.Page}>
      <Split
        className={Style.Split}
        sizes={[90, 10]}
        minSize={[400, 160]}
        maxSize={[Infinity, 650]}
        expandToMin={true}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={20}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <div className={Style.Coinbase_Product}>
          <SubscribeCoinbaseProduct />
        </div>
        <div className={Style.Coinbase_Product_List}>
          <SubscribeCoinbaseProductList />
        </div>
      </Split>
    </div>
  );
};

export default SubscribeCoinbase;

/* ---------------------------------------------------------------------------------------------- */
