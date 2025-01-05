//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Subscribe
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Common
import Menu_Bar from 'MenuBar';
import Status_Bar from 'StatusBar';
// Components
import Subscribe_Data from './Subscribe_Data';
import Subscribe_Api_List from 'subscribe/Subscribe_Api_List';
import Subscribe_Sub_List from 'subscribe/Subscribe_Sub_List';
// CSS Modules
import Style from './Subscribe.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const Subscribe: React.FC = () => {
  return (
    <div className={Style.Page}>
      <Menu_Bar />
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
      <Status_Bar />
    </div>
  );
};

export default Subscribe;
//
/* ------------------------------------------------------------------------------------------------------------------ */
