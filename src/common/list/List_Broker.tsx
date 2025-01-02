//! # List - Broker
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Tauri
// import { info } from '@tauri-apps/plugin-log';
// Interface
import { useContext_Broker } from 'interface/Context_Broker';
// CSS Modules
import Style from './List.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const List_Broker: React.FC = () => {
  const { setSelected_Broker } = useContext_Broker();
  const { setSelected_BrokerProduct } = useContext_Broker();
  const { setSelected_BrokerProductType } = useContext_Broker();

  const handleBrokerClick = (broker: string) => {
    setSelected_Broker(broker);
    setSelected_BrokerProduct('Select Broker Product');
    setSelected_BrokerProductType('Select Broker Product Type');
  };

  return (
    <div className={Style.List_Container}>
      <div className={Style.Title_Bar}>Brokers</div>
      <div className={Style.List}>
        <div className={Style.Row} onClick={() => handleBrokerClick('coinbase')}>
          Coinbase
        </div>
        <div className={Style.Row} onClick={() => handleBrokerClick('binance')}>
          Binance
        </div>
      </div>
    </div>
  );
};

export default List_Broker;
//
/* ------------------------------------------------------------------------------------------------------------------ */
