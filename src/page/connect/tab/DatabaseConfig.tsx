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
import { useAppContext } from '../../../hooks/useAppContext'
import { DatabaseType } from '../../../interface/ConfigContext'
// Constants
import { CONFIG_STORE } from '../../../constants'
// CSS Module
import Style from '../../../css/Config.module.css'

/* ---------------------------------------------------------------------------------------------- */

const DatabaseConfig: React.FC = () => {
  // Context: Interface
  const { selDatabaseType, setDatabaseType } = useAppContext()
  const { selDatabaseName, setDatabaseName } = useAppContext()
  const { selDatabaseUrl, setDatabaseUrl } = useAppContext()

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
          setDatabaseType(appConfig.database_type as DatabaseType)
          setDatabaseName(appConfig.database_name)
          setDatabaseUrl(appConfig.database_url)
        }
      } catch (err) {
        error(`Error loading Database Config: ${err instanceof Error ? err.message : String(err)}`)
      }
    }

    info('useEffect: loadDatabaseConfig')
    loadDatabaseConfig()
  }, [setDatabaseType, setDatabaseName, setDatabaseUrl])

  // Click: Save Database
  const clickSaveDatabase = async () => {
    // const store = await load(CONFIG_STORE)
    try {
      const saveResponse: string = await invoke('save_database_cmd', {
        databaseType: selDatabaseType ?? '',
        databaseName: selDatabaseName,
        databaseUrl: selDatabaseUrl,
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
    <div className={Style.ConnectConfigTab}>
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
                value={selDatabaseName ?? ''}
                onChange={e => setDatabaseName(e.target.value)}
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
                value={selDatabaseType ?? ''}
                onChange={e => setDatabaseType(e.target.value as DatabaseType)}
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
                value={selDatabaseUrl ?? ''}
                onChange={e => setDatabaseUrl(e.target.value)}
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
