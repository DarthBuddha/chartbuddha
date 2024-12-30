//! # Bar - MenuBar
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
import { NavLink } from 'react-router-dom';
// Tauri
import { load } from '@tauri-apps/plugin-store';
// Components
import { useInterfaceContext } from 'interface/Interface_Context';
// CSS Module
import Style from './Bar_MenuBar.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const store_interface = await load('.interface.json', { autoSave: false });

const Bar_MenuBar: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useInterfaceContext();
  const { selectedProduct, setSelectedProduct } = useInterfaceContext();
  console.log(selectedProvider);
  console.log(selectedProduct);

  const handleHomeClick = async () => {
    setSelectedProvider(null);
    setSelectedProduct(null);
    await store_interface.set('selectedProvider', { value: null });
    await store_interface.set('selectedProduct', { value: null });
  };

  return (
    <div className={Style.Menu_Container}>
      <div className={Style.LeftSection}>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          <div className={Style.Nav_Button_Profile} onClick={handleHomeClick}>
            Home
          </div>
        </NavLink>
      </div>
      <div className={Style.CenterSection}>
        <NavLink to="/connect" className={({ isActive }) => (isActive ? 'active' : '')}>
          <div className={Style.Nav_Button_Menu} onClick={handleHomeClick}>
            Connect
          </div>
        </NavLink>

        <NavLink to="/subscribe" className={({ isActive }) => (isActive ? 'active' : '')}>
          <div className={Style.Nav_Button_Menu} onClick={handleHomeClick}>
            Subscribe
          </div>
        </NavLink>

        <NavLink to="/chart" className={({ isActive }) => (isActive ? 'active' : '')}>
          <div className={Style.Nav_Button_Menu} onClick={handleHomeClick}>
            Chart
          </div>
        </NavLink>

        <NavLink to="/analyze" className={({ isActive }) => (isActive ? 'active' : '')}>
          <div className={Style.Nav_Button_Menu} onClick={handleHomeClick}>
            Analyze
          </div>
        </NavLink>

        <NavLink to="/news" className={({ isActive }) => (isActive ? 'active' : '')}>
          <div className={Style.Nav_Button_Menu} onClick={handleHomeClick}>
            News
          </div>
        </NavLink>
      </div>
      <div className={Style.RightSection}>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
          <div className={Style.Nav_Button_Profile} onClick={handleHomeClick}>
            Profile
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Bar_MenuBar;
//
/* ------------------------------------------------------------------------------------------------------------------ */
