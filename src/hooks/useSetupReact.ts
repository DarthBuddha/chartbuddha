/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Hooks: useSetupReact
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This hook is used to start the  setup of the React Frontend.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/hooks/useSetupReact.ts
/* ---------------------------------------------------------------------------------------------- */

// React
import { useEffect } from 'react'
// Tauri
import { info } from '@tauri-apps/plugin-log'
import { listen } from '@tauri-apps/api/event'
// Utils
import { SetupReact } from '../common/SetupReact'

/* ---------------------------------------------------------------------------------------------- */

export function useSetupReact() {
  useEffect(() => {
    const unlisten = listen('tauri_ready', () => {
      info('tauri_ready event received')
      SetupReact()
    })

    return () => {
      unlisten.then(fn => fn())
    }
  }, [])
}

/* ---------------------------------------------------------------------------------------------- */
