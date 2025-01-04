//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Connect
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Common
import Menu_Bar from 'common/bar/Menu_Bar';
import Status_Bar from 'common/bar/Status_Bar';
// Components
import Connect_DataApi from './Connect_DataApi';
import Connect_DataApi_List from './Connect_DataApi_List';
// CSS Modules
import Style from './Connect.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const Connect: React.FC = () => {
  return (
    <div className={Style.Page}>
      <Menu_Bar />
      <div className={Style.Main_Container}>
        <div className={Style.List_Container}>
          <Connect_DataApi_List />
        </div>
        <div className={Style.Provider_Container}>
          <Connect_DataApi />
        </div>
      </div>
      <Status_Bar />
    </div>
  );
};

export default Connect;
//
/* ------------------------------------------------------------------------------------------------------------------ */
