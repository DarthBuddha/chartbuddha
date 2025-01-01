//! # Status Bar
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
import { NavLink } from 'react-router-dom';
// Interface
import { useInterface_PageContext } from 'interface/Interface_PageContext';
// CSS Module
import Style from './Bar.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Status_Bar: React.FC = () => {
  const { setSelectedPage } = useInterface_PageContext();

  const handleNavLinkClick = (page: string) => {
    setSelectedPage(page);
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
