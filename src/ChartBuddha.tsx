//! ---------------------------------------------------------------------------------------------------------------- !//
//! - ChartBuddha
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Components
import MenuBar from 'common/MenuBar';
import Index from 'common/Index';
import StatusBar from 'common/StatusBar';
// CSS Modules
import Style from './ChartBuddha.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const ChartBuddha: React.FC = () => {
  return (
    <div className={Style.ChartBuddha}>
      <div className={Style.MenuBar_Container}>
        <MenuBar />
      </div>

      <div className={Style.Page_Container}>
        <Index />
      </div>

      <div className={Style.StatusBar_Container}>
        <StatusBar />
      </div>
    </div>
  );
};

export default ChartBuddha;
//
/* ------------------------------------------------------------------------------------------------------------------ */
