/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page -> Splash
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Splash page for the application
/* ---------------------------------------------------------------------------------------------- */
//! #####
//! * src/page/Splash.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Hooks
import { useAppContext } from 'hooks/useAppContext'
import { useSetupReact } from 'hooks/useSetupReact'
// CSS Module
import Style from './css/Splash.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Splash: React.FC = () => {
  // Context: Interface
  const { setInterface } = useAppContext()
  const isSetupComplete = useSetupReact() // Call the hook here

  React.useEffect(() => {
    if (isSetupComplete) {
      setInterface({
        page: 'Home',
        page_tab: null,
        list_type_product: null,
        product_broker: null,
        product_symbol: null,
      })
    }
  }, [isSetupComplete, setInterface])

  return (
    <div className={Style.Page}>
      <div className={Style.Component_MenuBar}></div>
      <div className={Style.Frame}>
        <h1>Splash</h1>
      </div>
      <div className={Style.Component_StatusBar}></div>
    </div>
  )
}

export default Splash

/* ---------------------------------------------------------------------------------------------- */
