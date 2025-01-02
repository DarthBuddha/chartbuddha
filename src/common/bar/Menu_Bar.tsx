//! Menu Bar
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
import { NavLink } from 'react-router-dom';
// Tauri
// import { info } from '@tauri-apps/plugin-log';
// Interface
import { useContext_Window } from 'interface/Context_Window';
import { useContext_Broker } from 'interface/Context_Broker';
// CSS Module
import Style from './Bar.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Menu_Bar: React.FC = () => {
  const { setSelected_Page } = useContext_Window();
  const { setSelected_Broker } = useContext_Broker();
  const { setSelected_BrokerProduct } = useContext_Broker();
  const { setSelected_BrokerProductType } = useContext_Broker();

  const handleNavLinkClick = (page: string) => {
    setSelected_Page(page);
    setSelected_Broker('Select Broker');
    setSelected_BrokerProduct('Select Broker Product');
    setSelected_BrokerProductType('Select Broker Product Type');
  };

  return (
    <div className={Style.Menu_Container}>
      <div className={Style.LeftSection}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => handleNavLinkClick('Home')}
        >
          <div className={Style.Nav_Button_Profile}>Home</div>
        </NavLink>
      </div>
      <div className={Style.CenterSection}>
        <NavLink
          to="/connect"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => handleNavLinkClick('Connect')}
        >
          <div className={Style.Nav_Button_Menu}>Connect</div>
        </NavLink>

        <NavLink
          to="/subscribe"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => handleNavLinkClick('Subscribe')}
        >
          <div className={Style.Nav_Button_Menu}>Subscribe</div>
        </NavLink>

        <NavLink
          to="/chart"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => handleNavLinkClick('Chart')}
        >
          <div className={Style.Nav_Button_Menu}>Chart</div>
        </NavLink>

        <NavLink
          to="/analyze"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => handleNavLinkClick('Analyze')}
        >
          <div className={Style.Nav_Button_Menu}>Analyze</div>
        </NavLink>

        <NavLink
          to="/news"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => handleNavLinkClick('News')}
        >
          <div className={Style.Nav_Button_Menu}>News</div>
        </NavLink>
      </div>
      <div className={Style.RightSection}>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => handleNavLinkClick('Profile')}
        >
          <div className={Style.Nav_Button_Profile}>Profile</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Menu_Bar;
//
/* ------------------------------------------------------------------------------------------------------------------ */
