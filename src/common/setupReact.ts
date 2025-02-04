/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Common: SetupReact
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This file contains the setup function for the React Frontend.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/common/SetupReact.ts
/* ---------------------------------------------------------------------------------------------- */

// Tauri
import { info } from '@tauri-apps/plugin-log'
import { invoke } from '@tauri-apps/api/core'
import { load } from '@tauri-apps/plugin-store'

import { SetupApiList } from './SetupApiList.ts'

/* ---------------------------------------------------------------------------------------------- */
// Constants
import { STATE_STORE } from 'constants.ts'
/* ---------------------------------------------------------------------------------------------- */

// React setup function
export async function SetupReact(): Promise<Record<string, boolean>> {
  info('Setup Api List...')
  const apiList = await SetupApiList() // Ensure SetupApiList is awaited

  info('React Ready...')
  try {
    const store = await load(STATE_STORE)
    const appState = await store.get<{ react_ready: boolean }>('State')
    if (appState) {
      appState.react_ready = true
      await store.set('State', appState)
      await store.save()
    } else {
      info('Failed to load app state')
    }
  } catch (err) {
    info(String(err))
  }

  const apiListRecord: Record<string, boolean> = apiList.reduce(
    (acc, api) => {
      acc[api] = true
      return acc
    },
    {} as Record<string, boolean>,
  )

  info('Invoke: setup_complete...')
  invoke('setup_complete')

  return apiListRecord
}

/* ---------------------------------------------------------------------------------------------- */
