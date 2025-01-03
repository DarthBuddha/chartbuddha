//! ---------------------------------------------------------------------------------------------------------------- !//
//! Status Bar
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
import { NavLink } from 'react-router-dom';
// Interface
import { useContext_Interface } from 'interface/Context_Interface';
// CSS Module
import Style from './Bar.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const Status_Bar: React.FC = () => {
  const { setFocus_Page } = useContext_Interface();

  const handleNavLinkClick = (page: string) => {
    setFocus_Page(page);
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
