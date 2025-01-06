//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Subscribe
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Components
import Subscribe_Data from './Subscribe_Data';
import Subscribe_Api_List from './Subscribe_Api_List';
import Subscribe_Sub_List from './Subscribe_Sub_List';
// CSS Modules
import Style from './Subscribe.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const Subscribe: React.FC = () => {
  return (
    <div className={Style.Subscribe}>
      <div className={Style.Main_Container}>
        <div className={Style.List_Providers}>
          <Subscribe_Api_List />
        </div>
        <div className={Style.Product_Panel}>
          <Subscribe_Data />
        </div>
        <div className={Style.List_Subscriptions}>
          <Subscribe_Sub_List />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
//
/* ------------------------------------------------------------------------------------------------------------------ */
