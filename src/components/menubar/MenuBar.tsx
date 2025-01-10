/* ---------------------------------------------------------------------------------------------- */
//! - MenuBar.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react';
// Tauri
import { load } from '@tauri-apps/plugin-store';
// CSS Module
import Style from './MenuBar.module.css';
// Context
import { useSelectedPage } from 'context/SelectedPageContext';

/* ---------------------------------------------------------------------------------------------- */

// Define a type for the props
type MenuBarProps = {
  setSelectedPage: (selectedPage: string) => void;
};

/* ---------------------------------------------------------------------------------------------- */

const store_interface = await load('.interface.json');

/* ---------------------------------------------------------------------------------------------- */

const MenuBar: React.FC = () => {
  const { setSelectedPage } = useSelectedPage();

  // Handle Click
  const handleClick = async (selectedPage: string) => {
    const resetPages = ['home', 'connect', 'subscribe', 'dashboard', 'analyze', 'news', 'profile'];

    // Logic: Reset Store
    if (resetPages.includes(selectedPage)) {
      await store_interface.reset();
    }

    const currentData = await store_interface.get<{ [key: string]: unknown }>('interface');
    await store_interface.set('interface', { ...currentData, selectedPage });
    setSelectedPage(selectedPage);
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
