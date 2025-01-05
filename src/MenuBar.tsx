//! ---------------------------------------------------------------------------------------------------------------- !//
//! - MenuBar
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Tauri
import { load } from '@tauri-apps/plugin-store';
// import { info } from '@tauri-apps/plugin-log';
// Interface
// import { useContext_Interface } from 'interface/Context_Interface';
// CSS Module
import Style from './Bar.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const store = await load('.interface.json');
//
/* ------------------------------------------------------------------------------------------------------------------ */

interface MenuBarProps {
  setPage: (page: string) => void;
}

/* ------------------------------------------------------------------------------------------------------------------ */
//
const MenuBar: React.FC<MenuBarProps> = ({ setPage }) => {
  // Handle Click
  const handleClick = async (page: string) => {
    await store.set('interface', { page: page });
    setPage(page);
  };

  return (
    <div className={Style.MenuBar}>
      <div className={Style.Container_Left}>
        <div className={Style.Button} onClick={() => handleClick('home')}>
          Home
        </div>
      </div>
      <div className={Style.Container_Center}>
        <div className={Style.Button} onClick={() => handleClick('connect')}>
          Connect
        </div>

        <div className={Style.Button} onClick={() => handleClick('subscribe')}>
          Subscribe
        </div>

        <div className={Style.Button} onClick={() => handleClick('chart')}>
          Chart
        </div>

        <div className={Style.Button} onClick={() => handleClick('analyze')}>
          Analyze
        </div>

        <div className={Style.Button} onClick={() => handleClick('news')}>
          News
        </div>
      </div>
      <div className={Style.Container_Right}>
        <div className={Style.Button} onClick={() => handleClick('profile')}>
          Profile
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
//
/* ------------------------------------------------------------------------------------------------------------------ */
