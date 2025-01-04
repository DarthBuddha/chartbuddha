//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Menu Bar
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
import { NavLink } from 'react-router-dom';
// Tauri
import { info } from '@tauri-apps/plugin-log';
// Interface
import { useContext_Interface } from 'interface/Context_Interface';
// CSS Module
import Style from './Bar.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const Menu_Bar: React.FC = () => {
  const { selected_Page, setFocus_Page } = useContext_Interface();
  const { setFocus_DataApi } = useContext_Interface();

  const handleNavLinkClick = (page: string) => {
    if (selected_Page == 'connect' && page != 'connect') {
      setFocus_DataApi(null);
      info('\nData api: null');
    }
    setFocus_Page(page);
    info(`\nPage: ${page}`);
  };

  return (
    <div className={Style.Menu_Container}>
      <div className={Style.LeftSection}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => handleNavLinkClick('home')}
        >
          <div className={Style.Nav_Button_Profile}>Home</div>
        </NavLink>
      </div>
      <div className={Style.CenterSection}>
        <NavLink
          to="/connect"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => handleNavLinkClick('connect')}
        >
          <div className={Style.Nav_Button_Menu}>Connect</div>
        </NavLink>

        <NavLink
          to="/subscribe"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => handleNavLinkClick('subscribe')}
        >
          <div className={Style.Nav_Button_Menu}>Subscribe</div>
        </NavLink>

        <NavLink
          to="/chart"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => handleNavLinkClick('chart')}
        >
          <div className={Style.Nav_Button_Menu}>Chart</div>
        </NavLink>

        <NavLink
          to="/analyze"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => handleNavLinkClick('analyze')}
        >
          <div className={Style.Nav_Button_Menu}>Analyze</div>
        </NavLink>

        <NavLink
          to="/news"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => handleNavLinkClick('news')}
        >
          <div className={Style.Nav_Button_Menu}>News</div>
        </NavLink>
      </div>
      <div className={Style.RightSection}>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => handleNavLinkClick('profile')}
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
