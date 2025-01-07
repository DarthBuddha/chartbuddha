/* ---------------------------------------------------------------------------------------------- */
//! - MenuBar.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react';
// Tauri
import { load } from '@tauri-apps/plugin-store';
// CSS Module
import Style from './MenuBar.module.css';

/* ---------------------------------------------------------------------------------------------- */

interface MenuBar_Props {
  setPage: (page: string) => void;
}

/* ---------------------------------------------------------------------------------------------- */

const store = await load('page_interface.json');

/* ---------------------------------------------------------------------------------------------- */

const MenuBar: React.FC<MenuBar_Props> = ({ setPage }) => {
  // Handle Click
  const handleClick = async (page: string) => {
    const resetPages = ['home', 'connect', 'subscribe', 'dashboard', 'analyze', 'news', 'profile'];

    if (resetPages.includes(page)) {
      await store.reset();
    }

    await store.set('page_interface', { page });
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

        <div className={Style.Button} onClick={() => handleClick('dashboard')}>
          Dashboard
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

/* ---------------------------------------------------------------------------------------------- */
