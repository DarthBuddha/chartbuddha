/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Connect Tab - DatabaseConfig
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Database connection settings.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/connect/tab/DatabaseConfig.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Tauri
import { load } from '@tauri-apps/plugin-store'
import { info, error } from '@tauri-apps/plugin-log'
// import { invoke } from '@tauri-apps/api/core'
// Context
import { useInterfaceContext } from 'context/InterfaceContext'
// import { DataApiPermissionsType } from 'app/context/broker/Coinbase.tsx'
// CSS Module
import Style from './DatabaseConfig.module.css'

/* ---------------------------------------------------------------------------------------------- */

const store = await load('app_config.json')

/* ---------------------------------------------------------------------------------------------- */

const DatabaseConfig: React.FC = () => {
  // Context: Interface
  const { selDatabaseName, setDatabaseName } = useInterfaceContext()
  const { selDatabaseUrl, setDatabaseUrl } = useInterfaceContext()

  // Save Database Configuration
  const saveDatabase = async () => {
    try {
      await store.set('Database', {
        database_name: selDatabaseName,
        database_url: selDatabaseUrl,
      })
      await store.save()

      info('Database configuration has been saved.')
    } catch (err) {
      error(err instanceof Error ? err.toString() : String(err))
    }
  }

  // Drop Database Configuration
  const dropDatabase = async () => {
    try {
      await store.set('Database', {
        database_name: null,
        database_url: null,
      })
      await store.save()

      info('Database configuration has been dropped.')
    } catch (err) {
      error(err instanceof Error ? err.toString() : String(err))
    }
  }

  // Click: Api Save
  const clickSaveDatabase = async () => {
    saveDatabase()
  }

  // Click: Api Delete
  const clickDropDatabase = async () => {
    dropDatabase()
  }

  /* -------------------------------------------------------------------------------------------- */

  return (
    <div className={Style.Component}>
      <div className={Style.Title}>Database</div>
      <div className={Style.Top_Container}>
        <div className={Style.Top_Left_Container}>
          <div className={Style.Title}>Configuration</div>
          <div className={Style.Settings_Box}>
            <div className={Style.Settings_Text}>
              <p>ChartBuddha requires a database to store your data.</p>
              <p>You can configure your database here.</p>
            </div>
          </div>
        </div>

        <div className={Style.Top_Right_Container}>
          <div className={Style.Title}>Database Info</div>
        </div>
      </div>
      <div className={Style.Bottom_Container}>
        <div className={Style.Title}>Your Database</div>
        <div className={Style.Input_Container}>
          <div className={Style.Input_Box}>
            <div className={Style.Input_Label}>Database Name</div>
            <input
              type="text"
              id="database_name"
              value={selDatabaseName ?? ''}
              onChange={(e) => setDatabaseName(e.target.value)}
              className={Style.Input}
              autoComplete="off"
              placeholder="Enter the name of your Database"
            />
          </div>

          <div className={Style.Input_Box}>
            <div className={Style.Input_Label}>Database Url</div>
            <input
              type="text"
              id="database_url"
              value={selDatabaseUrl ?? ''}
              onChange={(e) => setDatabaseUrl(e.target.value)}
              className={Style.Input}
              autoComplete="off"
              placeholder="Enter the URL of your Database"
            />
          </div>
        </div>
        <div className={Style.Button_Box}>
          <button type="button" onClick={clickSaveDatabase} className={Style.Save_Button}>
            Save Database Configuration
          </button>
          <button type="button" onClick={clickDropDatabase} className={Style.Delete_Button}>
            Drop Database Configuration
          </button>
        </div>
      </div>
    </div>
  )
}

export default DatabaseConfig

/* ---------------------------------------------------------------------------------------------- */
