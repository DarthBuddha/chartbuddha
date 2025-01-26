/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Context: Context App - AppConfig
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This context is responsible for managing the Coinbase API.
/* ---------------------------------------------------------------------------------------------- */
//! #### Types:
//! * AppConfigType
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: context/app/AppConfig.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react'

/* ---------------------------------------------------------------------------------------------- */

export type DatabaseType = 'MySql' | 'Postgres' | 'Sqlite' | null

export interface AppConfigType {
  app_init_run: boolean | null
  app_update: string | null
  app_version: string | null
  database_type: DatabaseType
  database_name: string | null
  database_url: string | null
}

/* ---------------------------------------------------------------------------------------------- */

const AppConfigContext = createContext<AppConfigType | null>(null)

export { AppConfigContext }

/* ---------------------------------------------------------------------------------------------- */
