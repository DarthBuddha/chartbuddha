//! ---------------------------------------------------------------------------------------------------------------- !//
//! - StatusBar
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// import { NavLink } from 'react-router-dom';
// Tauri
// import { info } from '@tauri-apps/plugin-log';
// Interface
// import { useContext_Interface } from 'interface/Context_Interface';
// CSS Module
import Style from './Bar.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const StatusBar: React.FC = () => {
  // const { selected_Page, setFocus_Page } = useContext_Interface();
  // const { setFocus_DataApi } = useContext_Interface();
  // const { setFocus_ApiPermissions } = useContext_Interface();
  // const { setFocus_Broker } = useContext_Interface();
  // const { setFocus_ProductType } = useContext_Interface();
  // const { setFocus_ProductName } = useContext_Interface();

  const handleNavLinkClick = (page: string) => {
    // if (selected_Page == 'connect' && page != 'connect') {
    //   setFocus_DataApi(null);
    //   setFocus_ApiPermissions(null);
    //   info(`Reset Values\nData Api: null\nApi Permissions: null`);
    // } else if (selected_Page == 'subscribe' && page != 'subscribe') {
    //   setFocus_Broker(null);
    //   setFocus_ProductType(null);
    //   setFocus_ProductName(null);
    //   info(`Reset Values\nBroker: null\nProduct Type: null\nProduct Name: null`);
    // }
    // setFocus_Page(page);
    // info(`Selected Page: ${page}`);
  };

  return (
    <div className={Style.StatusBar}>
      <div className={Style.Container_Left}></div>
      <div className={Style.Container_Center}></div>
      <div className={Style.Container_Right}>
        <div className={Style.Button} onClick={() => handleNavLinkClick('about')}>
          About
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
//
/* ------------------------------------------------------------------------------------------------------------------ */
