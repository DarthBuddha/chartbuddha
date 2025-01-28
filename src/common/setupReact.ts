/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Common: setupReact
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This file contains the setup function for the React Frontend.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/common/setupReact.ts
/* ---------------------------------------------------------------------------------------------- */

// Tauri
import { info } from '@tauri-apps/plugin-log'
import { invoke } from '@tauri-apps/api/core'
import { load } from '@tauri-apps/plugin-store'

/* ---------------------------------------------------------------------------------------------- */
// Constants
import { STATE_STORE } from '../constants'
/* ---------------------------------------------------------------------------------------------- */

// Sleep utility
export function sleep(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

/* ---------------------------------------------------------------------------------------------- */

// React setup function
export async function setupReact() {
  const store = await load(STATE_STORE)
  info('Fake Pause...')
  await sleep(3)

  info('React Ready...')
  try {
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

  invoke('setup_complete')
}

/* ---------------------------------------------------------------------------------------------- */
