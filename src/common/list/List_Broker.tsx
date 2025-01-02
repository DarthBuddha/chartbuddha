//! # List - Broker
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Interface
import { useContext_Broker } from 'interface/Context_Broker';
import { useContext_Window } from 'interface/Context_Window';
// CSS Modules
import Style from './List.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const List_Broker: React.FC = () => {
  const { selected_Page } = useContext_Window();
  const { setSelected_Broker } = useContext_Broker();
  // const { setSelected_BrokerProduct } = useContext_Broker();
  // const { setSelected_BrokerProductType } = useContext_Broker();

  // // Handle Broker Click
  // const handleClick = (broker: string) => {
  //   setSelected_Broker(broker);
  //   setSelected_BrokerProduct('none');
  //   if (selected_Page === 'connect') {
  //     setSelected_BrokerProductType('none');
  //   } else if (selected_Page === 'subscribe') {
  //     setSelected_BrokerProductType('spot');
  //   }
  // };

  // Handle Broker Click
  const handleClick = (broker: string) => {
    setSelected_Broker(broker);
  };

  if (selected_Page !== 'connect' && selected_Page !== 'subscribe') {
    return null;
  }

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
