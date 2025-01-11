/* ---------------------------------------------------------------------------------------------- */
//! - MenuBar.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react';
// Interface
import { useInterfaceContext } from 'interface/InterfaceContext';
// CSS Module
import Style from './MenuBar.module.css';

/* ---------------------------------------------------------------------------------------------- */

const MenuBar: React.FC = () => {
  // State Management
  const { setSelectedPage, setSelectedApi } = useInterfaceContext();

  // Handle Click
  const handleClick = async (selectedPage: string) => {
    const resetPages = ['home', 'connect', 'subscribe', 'dashboard', 'analyze', 'news', 'profile'];

    // Logic: Reset Interface Context
    if (resetPages.includes(selectedPage)) {
      setSelectedPage(selectedPage);
      setSelectedApi(null);
    }
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
