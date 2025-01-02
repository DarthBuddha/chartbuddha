//! # Subscribe Product Coinbase Product List
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { useState } from 'react';
// Interface
import { useContext_Broker } from 'interface/Context_Broker';
// Components
import Coinbase_ProductList_Spot from './Coinbase_ProductList_Spot';
import Coinbase_ProductList_Futures from './Coinbase_ProductList_Futures';
import Coinbase_ProductList_Perps from './Coinbase_ProductList_Perps';
// CSS Modules
import Style from './Coinbase_ProductList.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Coinbase_Product_List: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('spot');
  const { setSelected_BrokerProductType } = useContext_Broker();

  // Handle Broker Click
  const handleClick = (productType: string) => {
    setSelected_BrokerProductType(productType);
  };

  const renderActiveWidget = () => {
    switch (activeTab) {
      case 'spot':
        return <Coinbase_ProductList_Spot />;
      case 'futures':
        return <Coinbase_ProductList_Futures />;
      case 'perpetual':
        return <Coinbase_ProductList_Perps />;
      default:
        return <Coinbase_ProductList_Spot />;
    }
  };

  return (
    <div className={Style.Component}>
      <div className={Style.NavMenu}>
        <button
          className={`${Style.NavButton} ${activeTab === 'spot' ? Style.Active : ''}`}
          onClick={() => {
            setActiveTab('spot');
            handleClick('spot');
          }}
        >
          Spot
        </button>
        <button
          className={`${Style.NavButton} ${activeTab === 'futures' ? Style.Active : ''}`}
          onClick={() => {
            setActiveTab('futures');
            handleClick('futures');
          }}
        >
          Futures
        </button>
        <button
          className={`${Style.NavButton} ${activeTab === 'perpetual' ? Style.Active : ''}`}
          onClick={() => {
            setActiveTab('perps');
            handleClick('perps');
          }}
        >
          Perps
        </button>
      </div>
      <div>{renderActiveWidget()}</div>
    </div>
  );
};

export default Coinbase_Product_List;
/* ------------------------------------------------------------------------------------------------------------------ */
