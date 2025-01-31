/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Window -> MenuBar
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This component is responsible for rendering the application's menu bar.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/window/components/MenuBar.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Context
import { useAppContext } from '../../hooks/useAppContext'
// CSS Module
import Style from '../../css/MenuBar.module.css'

/* ---------------------------------------------------------------------------------------------- */

const MenuBar: React.FC = () => {
  // State Management
  const { setPage, setConnectTab } = useAppContext()

  // Handle Click
  const handleClick = async (selectedPage: string) => {
    const resetPages = ['Home', 'Connect', 'Subscribe', 'Dashboard', 'Analyze', 'News', 'Profile']

    // Logic: Reset Interface Context
    if (resetPages.includes(selectedPage)) {
      // Global Context
      setPage(selectedPage)
      setConnectTab(null)
      // Coinbase Context
      // setCoinbaseProductType(null)
    }
  }

  return (
    <div className={Style.MenuBarComponent}>
      <div className={Style.BarContainerLeft}>
        <div className={Style.Button} onClick={() => handleClick('Home')}>
          Home
        </div>
      </div>
      <div className={Style.BarContainerCenter}>
        <div className={Style.Button} onClick={() => handleClick('Connect')}>
          Connect
        </div>

        <div className={Style.Button} onClick={() => handleClick('Subscribe')}>
          Subscribe
        </div>

        <div className={Style.Button} onClick={() => handleClick('Dashboard')}>
          Dashboard
        </div>

        <div className={Style.Button} onClick={() => handleClick('Analyze')}>
          Analyze
        </div>

        <div className={Style.Button} onClick={() => handleClick('News')}>
          News
        </div>
      </div>
      <div className={Style.BarContainerRight}>
        <div className={Style.Button} onClick={() => handleClick('Profile')}>
          Profile
        </div>
      </div>
    </div>
  )
}

export default MenuBar

/* ---------------------------------------------------------------------------------------------- */
