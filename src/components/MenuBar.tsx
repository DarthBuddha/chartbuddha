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
import { useAppContext } from '../hooks/useAppContext'
// CSS Module
import Style from './MenuBar.module.css'

/* ---------------------------------------------------------------------------------------------- */

const MenuBar: React.FC = () => {
  // State Management
  const { setPage, setConnectTab } = useAppContext()

  // Handle Click
  const handleClick = async (selectedPage: string) => {
    const resetPages = ['home', 'connect', 'subscribe', 'dashboard', 'analyze', 'news', 'profile']

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
        <div className={Style.Button} onClick={() => handleClick('home')}>
          Home
        </div>
      </div>
      <div className={Style.BarContainerCenter}>
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
      <div className={Style.BarContainerRight}>
        <div className={Style.Button} onClick={() => handleClick('profile')}>
          Profile
        </div>
      </div>
    </div>
  )
}

export default MenuBar

/* ---------------------------------------------------------------------------------------------- */
