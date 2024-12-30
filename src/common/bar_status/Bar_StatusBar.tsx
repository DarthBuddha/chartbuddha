//! # Bar - StatusBar
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
import { NavLink } from 'react-router-dom';
// Components
import { useInterfaceContext } from 'interface/Interface_Context';
// CSS Module
import Style from './Bar_StatusBar.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Bar_StatusBar: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useInterfaceContext();
  const { selectedProduct, setSelectedProduct } = useInterfaceContext();
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

export default Bar_StatusBar;
//
/* ------------------------------------------------------------------------------------------------------------------ */
