//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Connect
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Common
import Menu_Bar from 'MenuBar';
import Status_Bar from 'StatusBar';
// Components
import Connect_Data from './Connect_Data';
import Connect_Api_List from './Connect_Api_List';
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
          <Connect_Api_List />
        </div>
        <div className={Style.Provider_Container}>
          <Connect_Data />
        </div>
      </div>
      <Status_Bar />
    </div>
  );
};

export default Connect;
//
/* ------------------------------------------------------------------------------------------------------------------ */
