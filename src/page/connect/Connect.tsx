//! # Connect Page
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Common
import Menu_Bar from 'common/bar/Menu_Bar';
import Status_Bar from 'common/bar/Status_Bar';
import List_Providers from 'common/list/providers/Providers_List';
// Interface
import Connect_Provider from './Connect_Provider';
// CSS Modules
import Style from './Connect.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Connect: React.FC = () => {
  return (
    <div className={Style.Page}>
      <Menu_Bar />
      <div className={Style.Main_Container}>
        <div className={Style.List_Container}>
          <List_Providers />
        </div>
        <div className={Style.Provider_Container}>
          <Connect_Provider />
        </div>
      </div>
      <Status_Bar />
    </div>
  );
};

export default Connect;
//
/* ------------------------------------------------------------------------------------------------------------------ */
