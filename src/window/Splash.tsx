/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Window - Splash
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Splash window for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: window/Splash.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { useEffect } from 'react'
// Tauri
import { info } from '@tauri-apps/plugin-log'
import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'
import { load } from '@tauri-apps/plugin-store'
// Interface
// import { useInterfaceContext } from 'context/InterfaceContext';
// Common
// import MenuBar from './components/menubar/MenuBar';
// import StatusBar from './components/statusbar/StatusBar';
// CSS Module
import Style from './Page.module.css'

/* ---------------------------------------------------------------------------------------------- */

// Utility function to implement a sleep function in TypeScript
function sleep(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

// Setup function
async function setupReact() {
  // Load the app state from the store
  const store = await load('app_state.json')
  // Fake perform some really heavy setup task
  info('Fake Pause...')
  await sleep(3)

  // React Setup Tasks Complete
  info('React Ready...')
  try {
    const appState = await store.get<{ react_ready: boolean }>('Setup')
    if (appState) {
      appState.react_ready = true
      await store.set('Setup', appState)
      await store.save()
    } else {
      info('Failed to load app state')
    }
  } catch (err) {
    info(String(err))
  }

  // Set the frontend task as being completed
  invoke('setup_complete')
}

const Splash: React.FC = () => {
  useEffect(() => {
    const unlisten = listen('tauri-ready', () => {
      info('Tauri Ready - event received')
      setupReact()
    })

    return () => {
      unlisten.then((fn) => fn())
    }
  }, [])

  return (
    <div className={Style.SplashComponent}>
      <div className={Style.MenuBarContainer}>{/* <MenuBar /> */}</div>
      <div className={Style.PageContainer}>
        <div className={Style.SplashText}>
          <h1>Welcome to ChartBuddha</h1>
          {/* TODO - Show loading information */}
          <p>Setting up the application...</p>
        </div>
      </div>
      <div className={Style.StatusBarContainer}>{/* <StatusBar /> */}</div>
    </div>
  )
}

export default Splash

/* ---------------------------------------------------------------------------------------------- */
