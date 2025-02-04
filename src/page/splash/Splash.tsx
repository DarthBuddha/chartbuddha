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

// Tauri
import { info } from '@tauri-apps/plugin-log'
// React
import React from 'react'
// Hooks
import { useAppContext } from 'hooks/useAppContext'
// Interface:
import { ApiListInterface, ApiLisType } from 'interface/ApiListContext'
// CSS Module
import Style from './css/Splash.module.css'
// Common
import { SetupReact } from 'common/SetupReact'

/* ---------------------------------------------------------------------------------------------- */

const Splash: React.FC = () => {
  // Context: Interface
  const { setInterface } = useAppContext()
  const { setApiList } = useAppContext()

  React.useEffect(() => {
    const initialize = async () => {
      const apiListRecord = await SetupReact()
      setInterface({
        page: 'Home',
      })
      info('selApiList: ' + JSON.stringify(apiListRecord))
      setApiList({
        api_list_values: Object.keys(apiListRecord).filter(
          key => apiListRecord[key],
        ) as ApiLisType[],
      } as ApiListInterface)
    }
    initialize()
  }, [setInterface, setApiList])

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
