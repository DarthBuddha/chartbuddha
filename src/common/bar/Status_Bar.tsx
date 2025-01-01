//! # Status Bar
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
import { NavLink } from 'react-router-dom';
// Interface
import { useContext_Page } from 'interface/Context_Page';
import { useContext_Broker } from 'interface/Context_Broker';
// CSS Module
import Style from './Bar.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Status_Bar: React.FC = () => {
  const { setSelectedPage } = useContext_Page();
  const { setSelectedBroker } = useContext_Broker();

  const handleNavLinkClick = (page: string) => {
    setSelectedPage(page);
    setSelectedBroker(null);
  };

  return (
    <div className={Style.Menu_Container}>
      <div className={Style.LeftSection}></div>
      <div className={Style.CenterSection}></div>
      <div className={Style.RightSection}>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => handleNavLinkClick('About')}
        >
          <div className={Style.Nav_Button_About}>About</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Status_Bar;
//
/* ------------------------------------------------------------------------------------------------------------------ */
