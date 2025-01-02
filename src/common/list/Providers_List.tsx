//! # Providers List
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
const Providers_List: React.FC = () => {
  const { setSelected_Broker } = useContext_Broker() || {};

  const handleNavLinkClick = (broker: string) => {
    setSelected_Broker(broker);
  };

  return (
    <div className={Style.List_Container}>
      <div className={Style.Title_Bar}>Providers</div>
      <div className={Style.List}>
        <div className={Style.Row} onClick={() => handleNavLinkClick('coinbase')}>
          Coinbase
        </div>
        <div className={Style.Row} onClick={() => handleNavLinkClick('binance')}>
          Binance
        </div>
      </div>
    </div>
  );
};

export default Providers_List;
//
/* ------------------------------------------------------------------------------------------------------------------ */
