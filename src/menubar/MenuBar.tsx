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

const store_interface = await load('.interface.json');
const store_nav_connect = await load('.nav_connect.json');
const store_nav_dashboard = await load('.nav_dashboard.json');
const store_nav_subscribe = await load('.nav_subscribe.json');

/* ---------------------------------------------------------------------------------------------- */

const MenuBar: React.FC<MenuBar_Props> = ({ setPage }) => {
  // Handle Click
  const handleClick = async (page: string) => {
    const resetPages = ['home', 'connect', 'subscribe', 'dashboard', 'analyze', 'news', 'profile'];

    // Logic: Reset Store
    if (resetPages.includes(page)) {
      if (page === 'connect') {
        await store_nav_connect.reset();
      } else if (page === 'dashboard') {
        await store_nav_dashboard.reset();
      } else if (page === 'subscribe') {
        await store_nav_subscribe.reset();
      }
      await store_interface.reset();
    }

    // if (resetPages.includes(page)) {
    //   await store_interface.reset();
    //   await store_nav_connect.reset();
    //   await store_nav_dashboard.reset();
    //   await store_nav_subscribe.reset();
    // }

    await store_interface.set('interface', { page });
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
