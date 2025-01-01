//! # Status Bar
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
import { NavLink } from 'react-router-dom';
// Interface
import { useInterface_ProviderContext } from 'interface/provider/Interface_ProviderContext';
// CSS Module
import Style from './Status_Bar.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Status_Bar: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useInterface_ProviderContext();
  const { selectedProduct, setSelectedProduct } = useInterface_ProviderContext();
  console.log(selectedProvider);
  console.log(selectedProduct);

  const handleHomeClick = () => {
    setSelectedProvider(null);
    setSelectedProduct(null);
  };

  return (
    <div className={Style.Menu_Container}>
      <div className={Style.LeftSection}></div>
      <div className={Style.CenterSection}></div>
      <div className={Style.RightSection}>
        <NavLink to="/About" className={({ isActive }) => (isActive ? 'active' : '')}>
          <div className={Style.Nav_Button} onClick={handleHomeClick}>
            About
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Status_Bar;
//
/* ------------------------------------------------------------------------------------------------------------------ */
