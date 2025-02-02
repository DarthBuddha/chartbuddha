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
// Hooks
import { useAppContext } from 'hooks/useAppContext'
// Interface
import { PageType } from 'interface/InterfaceContext'
// CSS Module
import Style from './css/MenuBar.module.css'

/* ---------------------------------------------------------------------------------------------- */

const MenuBar: React.FC = () => {
  // State Management
  const { setInterface } = useAppContext()

  // Handle Click
  const handleClick = async (page: string) => {
    const resetPage = ['Home', 'Connect', 'Subscribe', 'Dashboard', 'Analyze', 'News', 'Profile']

    // Logic: Set Context
    if (resetPage.includes(page)) {
      setInterface({
        page: page as PageType,
        page_tab: null,
        list_type_product: null,
        product_broker: null,
        product_symbol: null,
      })
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
