/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Common: SetupApiList
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This file contains the setup function for the React Frontend.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/common/SetupApiList.ts
/* ---------------------------------------------------------------------------------------------- */

// Tauri
import { info, error } from '@tauri-apps/plugin-log'
// import { invoke } from '@tauri-apps/api/core'
import { load } from '@tauri-apps/plugin-store'
// Interface
// import { ApiListInterface } from '../interface/app/contextApiList'

/* ---------------------------------------------------------------------------------------------- */
// Constants
import { API_LIST_STORE } from 'constants.ts'
/* ---------------------------------------------------------------------------------------------- */

// Load Api List from store
export async function SetupApiList(): Promise<string[]> {
  try {
    info('Load Api List from store...')

    const store = await load(API_LIST_STORE)
    const apiList = await store.get<Record<string, boolean>>('ApiList')
    const enabledApis = apiList ? Object.keys(apiList).filter(key => apiList[key]) : []
    info(`Enabled APIs: ${enabledApis.join(', ')}`)
    return enabledApis
  } catch (err) {
    error(String(err))
    return []
  }
}

/* ---------------------------------------------------------------------------------------------- */
