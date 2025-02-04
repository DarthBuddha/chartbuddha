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
import { useState, useEffect } from 'react'
// Tauri
import { info } from '@tauri-apps/plugin-log'
import { listen } from '@tauri-apps/api/event'
// Utils
import { SetupReact } from 'common/SetupReact'

/* ---------------------------------------------------------------------------------------------- */

export function useSetupReact() {
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const [apiListRecord, setApiListRecord] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const setup = async () => {
      await info('Setting up logging') // Ensure logging is set up
      const unlisten = await listen('tauri_ready', async () => {
        info('tauri_ready event received')
        const apiList = await SetupReact()
        setApiListRecord(apiList)
      })

      // Simulate setup completion
      setTimeout(() => {
        setIsSetupComplete(true)
      }, 1000) // Adjust the timeout as needed

      return () => {
        unlisten()
      }
    }

    setup()
  }, [])

  return { isSetupComplete, apiListRecord }
}

/* ---------------------------------------------------------------------------------------------- */
