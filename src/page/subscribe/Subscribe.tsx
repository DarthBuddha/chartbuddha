//! # Subscribe
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Common
import Menu_Bar from 'common/bar/menu/Menu_Bar';
import Status_Bar from 'common/bar/status/Status_Bar';
import List_Providers from 'common/list/providers/Providers_List';
import List_Subscriptions from 'common/list/subscriptions/Subscriptions_List';
// Components
import Subscribe_Provider from './provider/Subscribe_Provider';
// CSS Modules
import Style_App from 'common/App_Window.module.css';
import Style from './Subscribe.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Subscribe: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <Menu_Bar />
      <div className={Style.Page}>
        <div className={Style.List_Providers}>
          <List_Providers />
        </div>
        <div className={Style.Product_Panel}>
          <Subscribe_Provider />
        </div>
        <div className={Style.List_Subscriptions}>
          <List_Subscriptions />
        </div>
      </div>
      <Status_Bar />
    </div>
  );
};

export default Subscribe;
//
/* ------------------------------------------------------------------------------------------------------------------ */
