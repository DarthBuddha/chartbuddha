//! Status Bar
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
import { NavLink } from 'react-router-dom';
// Interface
import { useContext_Window } from 'interface/Context_Window';
import { useContext_Broker } from 'interface/Context_Broker';
// CSS Module
import Style from './Bar.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Status_Bar: React.FC = () => {
  const { setSelected_Page } = useContext_Window();
  const { setSelected_Broker } = useContext_Broker();
  const { setSelected_BrokerProduct } = useContext_Broker();
  const { setSelected_BrokerProductType } = useContext_Broker();

  const handleNavLinkClick = (page: string) => {
    setSelected_Page(page);
    setSelected_Broker('none');
    setSelected_BrokerProduct('none');
    setSelected_BrokerProductType('none');
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
