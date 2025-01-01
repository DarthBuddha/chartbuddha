//! # Menu Bar
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
import { NavLink } from 'react-router-dom';
// Tauri
import { getStore, Store } from '@tauri-apps/plugin-store';
// Interface
import { useInterface_ProviderContext } from 'interface/Interface_ProviderContext';
// CSS Module
import Style from './Menu_Bar.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
let store_interface: Store | null = null;
getStore('.interface.json').then((store) => {
  store_interface = store;
});
//
const Menu_Bar: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useInterface_ProviderContext();
  const { selectedProduct, setSelectedProduct } = useInterface_ProviderContext();
  console.log(selectedProvider);
  console.log(selectedProduct);

  React.useEffect(() => {
    const initializeStore = async () => {
      if (!store_interface) {
        throw new Error('Failed to load store interface');
      }

      await store_interface.set('selectedProvider', { value: null });
      await store_interface.set('selectedProduct', { value: null });
      setSelectedProvider(null);
      setSelectedProduct(null);
    };

    initializeStore();
  }, [setSelectedProvider, setSelectedProduct]);

  return (
    <div className={Style.Menu_Container}>
      <div className={Style.LeftSection}>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          <div className={Style.Nav_Button_Profile}>Home</div>
        </NavLink>
      </div>
      <div className={Style.CenterSection}>
        <NavLink to="/connect" className={({ isActive }) => (isActive ? 'active' : '')}>
          <div className={Style.Nav_Button_Menu}>Connect</div>
        </NavLink>

        <NavLink to="/subscribe" className={({ isActive }) => (isActive ? 'active' : '')}>
          <div className={Style.Nav_Button_Menu}>Subscribe</div>
        </NavLink>

        <NavLink to="/chart" className={({ isActive }) => (isActive ? 'active' : '')}>
          <div className={Style.Nav_Button_Menu}>Chart</div>
        </NavLink>

        <NavLink to="/analyze" className={({ isActive }) => (isActive ? 'active' : '')}>
          <div className={Style.Nav_Button_Menu}>Analyze</div>
        </NavLink>

        <NavLink to="/news" className={({ isActive }) => (isActive ? 'active' : '')}>
          <div className={Style.Nav_Button_Menu}>News</div>
        </NavLink>
      </div>
      <div className={Style.RightSection}>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
          <div className={Style.Nav_Button_Profile}>Profile</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Menu_Bar;
//
/* ------------------------------------------------------------------------------------------------------------------ */
