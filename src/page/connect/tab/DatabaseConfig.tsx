/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Connect Tab -> DatabaseConfig
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Configure database settings.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/page/connect/tab/DatabaseConfig.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useEffect } from 'react'
// Tauri
import { invoke } from '@tauri-apps/api/core'
import { info, error } from '@tauri-apps/plugin-log'
import { load } from '@tauri-apps/plugin-store'
// Context
import { useAppContext } from 'hooks/useAppContext.ts'
// import { ConfigInterface } from 'interface/ConfigContext.ts'
import { DatabaseType } from 'interface/ConfigContext.ts'
// Constants
import { CONFIG_STORE } from 'constants.ts'
// CSS Module
import Style from './css/Config.module.css'

/* ---------------------------------------------------------------------------------------------- */

const DatabaseConfig: React.FC = () => {
  info('DatabaseConfig component is rendering') // Debugging line

  // Context: Interface
  const { selConfig, setConfig } = useAppContext()

  // Use Effect: On Component Load
  useEffect(() => {
    const loadDatabaseConfig = async () => {
      const store = await load(CONFIG_STORE)
      try {
        const appConfig = await store.get<{
          database_type: string
          database_name: string
          database_url: string
        }>('Database')

        if (appConfig) {
          setConfig({
            database_type: appConfig.database_type as DatabaseType,
            database_name: appConfig.database_name,
            database_url: appConfig.database_url,
          })
        }
      } catch (err) {
        error(`Error loading Database Config: ${err instanceof Error ? err.message : String(err)}`)
      }
    }

    info('useEffect: loadDatabaseConfig')
    loadDatabaseConfig()
  }, [setConfig])

  // Click: Save Database
  const clickSaveDatabase = async () => {
    try {
      const saveResponse: string = await invoke('save_database_cmd', {
        databaseType: selConfig?.database_type ?? '',
        databaseName: selConfig?.database_name,
        databaseUrl: selConfig?.database_url,
      })

      info(saveResponse)
    } catch (err) {
      error(err instanceof Error ? err.toString() : String(err))
    }
  }

  // Click: Drop Database
  const clickDropDatabase = async () => {
    try {
      const dropResponse: string = await invoke('drop_database_cmd', {
        database_type: '',
        database_name: null,
        database_url: null,
      })

      info(dropResponse)
    } catch (err) {
      error(err instanceof Error ? err.toString() : String(err))
    }
  }

  /* -------------------------------------------------------------------------------------------- */

  return (
    <div className={Style.ConnectConfig}>
      <div className={Style.Header}>Connect Database</div>

      <div className={Style.BoxFrame_Top}>
        <div className={Style.BoxFrame_TopLeft}>
          <div className={Style.Header}>Configuration</div>
          <div className={Style.Config_Section}>
            <div className={Style.ConfigText}>
              <p>ChartBuddha requires a database to store your data.</p>
              <p>You can configure your database here.</p>
            </div>
          </div>
        </div>

        <div className={Style.BoxFrame_TopRight}>
          <div className={Style.Header}>Database Info</div>
          <div className={Style.InfoSection}></div>
        </div>
      </div>
      <div className={Style.BoxFrame_Bottom}>
        <div className={Style.Header}>Database Configuration</div>

        <div className={Style.Input_Section}>
          <div className={Style.Input_Section_Row}>
            <div className={Style.Input_Section_Cell}>
              <label className={Style.Header} htmlFor="database_name">
                Name
              </label>
              <input
                type="text"
                id="database_name"
                value={selConfig?.database_name ?? ''}
                onChange={e =>
                  setConfig({
                    ...selConfig,
                    database_name: e.target.value,
                    database_type: selConfig?.database_type ?? 'MySql',
                    database_url: selConfig?.database_url ?? '',
                  })
                }
                className={Style.UserInput_Text}
                autoComplete="off"
                placeholder="Enter the name of your Database"
              />
            </div>

            <div className={Style.Input_Section_Cell}>
              <label className={Style.Header} htmlFor="database_type">
                Type
              </label>
              <select
                id="database_type"
                value={selConfig?.database_type ?? ''}
                onChange={e =>
                  setConfig({
                    ...selConfig,
                    database_type: e.target.value as DatabaseType,
                    database_name: selConfig?.database_name ?? '',
                    database_url: selConfig?.database_url ?? '',
                  })
                }
                className={Style.UserInput_Dropdown}
              >
                <option value="">Select Database Type</option>
                <option value="MySql">MySql</option>
                <option value="Postgres">Postgres</option>
                <option value="Sqlite">Sqlite</option>
              </select>
            </div>
          </div>

          <div className={Style.Input_Section_Row}>
            <div className={Style.Input_Section_Cell}>
              <label className={Style.Header} htmlFor="database_url">
                Url
              </label>
              <input
                type="text"
                id="database_url"
                value={selConfig?.database_url ?? ''}
                onChange={e =>
                  setConfig({
                    ...selConfig,
                    database_url: e.target.value,
                    database_name: selConfig?.database_name ?? '',
                    database_type: selConfig?.database_type ?? 'MySql',
                  })
                }
                className={Style.UserInput_Text}
                autoComplete="off"
                placeholder="Enter the URL of your Database"
              />
            </div>
          </div>
        </div>

        <div className={Style.Box_Button}>
          <button type="button" onClick={clickSaveDatabase} className={Style.Button_Save}>
            Save Database Configuration
          </button>
          <button type="button" onClick={clickDropDatabase} className={Style.Button_Delete}>
            Drop Database Configuration
          </button>
        </div>
      </div>
    </div>
  )
}

export default DatabaseConfig

/* ---------------------------------------------------------------------------------------------- */
