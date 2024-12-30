//! # Connect Page
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Components
import Bar_MenuBar from 'common/bar_menu/Bar_MenuBar';
import Bar_StatusBar from 'common/bar_status/Bar_StatusBar';
import Connect_Provider from './provider/Connect_Provider';
import List_Providers from 'common/list_providers/List_Providers';
// CSS Modules
import Style from './Connect.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Connect: React.FC = () => {
  return (
    <div className={Style.Page}>
      <Bar_MenuBar />
      <div className={Style.Main_Container}>
        <div className={Style.List_Container}>
          <List_Providers />
        </div>
        <div className={Style.Provider_Container}>
          <Connect_Provider />
        </div>
      </div>
      <Bar_StatusBar />
    </div>
  );
};

export default Connect;
//
/* ------------------------------------------------------------------------------------------------------------------ */
