/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Interface: ConfigContext
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This context is responsible for managing the global state of the Config.
/* ---------------------------------------------------------------------------------------------- */
//! #### Interface:
//! * ConfigContext
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/interface/ConfigContext.ts
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react'

/* ---------------------------------------------------------------------------------------------- */

export type DatabaseType = 'MySql' | 'Postgres' | 'Sqlite' | null

/* ---------------------------------------------------------------------------------------------- */

export interface ConfigInterface {
  app_init_run: boolean | null
  app_update: string | null
  app_version: string | null
  database_type: DatabaseType
  database_name: string | null
  database_url: string | null
}

/* ---------------------------------------------------------------------------------------------- */

const ConfigContext = createContext<ConfigInterface | null>(null)

export { ConfigContext }

/* ---------------------------------------------------------------------------------------------- */
