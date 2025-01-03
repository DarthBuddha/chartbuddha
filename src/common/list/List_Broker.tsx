//! ---------------------------------------------------------------------------------------------------------------- !//
//! - List Broker
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Interface
import { useContext_Interface } from 'interface/Context_Interface';
// CSS Modules
import Style from './List.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const List_Broker: React.FC = () => {
  const { setFocus_Broker } = useContext_Interface();

  // Handle Broker Click
  const handleClick = (broker: string) => {
    setFocus_Broker(broker);
  };

  return (
    <div className={Style.List_Container}>
      <div className={Style.Title_Bar}>Brokers</div>
      <div className={Style.List}>
        <div className={Style.Row} onClick={() => handleClick('binance')}>
          Binance
        </div>
        <div className={Style.Row} onClick={() => handleClick('coinbase')}>
          Coinbase
        </div>
      </div>
    </div>
  );
};

export default List_Broker;
//
/* ------------------------------------------------------------------------------------------------------------------ */
