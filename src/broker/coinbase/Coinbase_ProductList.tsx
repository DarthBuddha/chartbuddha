//! # Subscribe Product Coinbase Product List
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { useState } from 'react';
// Components
import Coinbase_ProductList_Spot from './Coinbase_ProductList_Spot';
import Coinbase_ProductList_Futures from './Coinbase_ProductList_Futures';
import Coinbase_ProductList_Perpetual from './Coinbase_ProductList_Perpetual';
// CSS Modules
import Style from './Coinbase_Product_List.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Coinbase_Product_List: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('spot');

  const renderActiveWidget = () => {
    switch (activeTab) {
      case 'spot':
        return <Coinbase_ProductList_Spot />;
      case 'futures':
        return <Coinbase_ProductList_Futures />;
      case 'perpetual':
        return <Coinbase_ProductList_Perpetual />;
      default:
        return <Coinbase_ProductList_Spot />;
    }
  };

  return (
    <div className={Style.Component}>
      <div className={Style.NavMenu}>
        <button
          className={`${Style.NavButton} ${activeTab === 'spot' ? Style.Active : ''}`}
          onClick={() => setActiveTab('spot')}
        >
          Spot
        </button>
        <button
          className={`${Style.NavButton} ${activeTab === 'futures' ? Style.Active : ''}`}
          onClick={() => setActiveTab('futures')}
        >
          Futures
        </button>
        <button
          className={`${Style.NavButton} ${activeTab === 'perpetual' ? Style.Active : ''}`}
          onClick={() => setActiveTab('perpetual')}
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
