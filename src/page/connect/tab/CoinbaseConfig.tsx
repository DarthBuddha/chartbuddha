/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Connect Tab -> CoinbaseConfig
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Configure coinbase api settings.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/page/connect/tab/CoinbaseConfig.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useEffect } from 'react'
// Tauri
import { invoke } from '@tauri-apps/api/core'
import { info, error } from '@tauri-apps/plugin-log'
import { load } from '@tauri-apps/plugin-store'
// Context
import { useAppContext } from '../../../hooks/useAppContext'
import { CoinbaseDataApiPermissionsInterface } from '../../../interface/CoinbaseContext'
// Constants
import { COINBASE_STORE } from '../../../constants'
// CSS Module
import Style from './Config.module.css'

/* ---------------------------------------------------------------------------------------------- */

const CoinbaseConfig: React.FC = () => {
  // State Management
  const { selCoinbaseApiKey, setCoinbaseApiKey } = useAppContext()
  const { selCoinbaseApiKeySecret, setCoinbaseApiKeySecret } = useAppContext()
  const { selCoinbaseApiPermissions, setCoinbaseApiPermissions } = useAppContext()

  // Use Effect: On Component Load
  useEffect(() => {
    const loadCoinbaseConfig = async () => {
      const store = await load(COINBASE_STORE)
      try {
        const coinbaseStore = await store.get<{
          api_key: string
          api_key_secret: string
          api_permissions: CoinbaseDataApiPermissionsInterface
        }>('Coinbase')

        if (coinbaseStore) {
          setCoinbaseApiKey(coinbaseStore.api_key || '')
          setCoinbaseApiKeySecret(coinbaseStore.api_key_secret || '')
          setCoinbaseApiPermissions(
            coinbaseStore.api_permissions || {
              can_view: false,
              can_trade: false,
              can_transfer: false,
              portfolio_uuid: '',
              portfolio_type: '',
            },
          )
        }
      } catch (err) {
        error(`Error loading Database Config: ${err instanceof Error ? err.message : String(err)}`)
      }
    }

    info('useEffect: loadCoinbaseConfig')
    loadCoinbaseConfig()
  }, [setCoinbaseApiKey, setCoinbaseApiKeySecret, setCoinbaseApiPermissions])

  // Button Click: Save Api Keys
  const clickApiSave = async () => {
    try {
      const response: string = await invoke('save_coinbase_cmd', {
        coinbaseApiKey: selCoinbaseApiKey,
        coinbaseApiSecret: selCoinbaseApiKeySecret,
      })

      // Ensure the response is parsed correctly
      const parsedResponse: CoinbaseDataApiPermissionsInterface = JSON.parse(response)
      info('Parsed Response: ' + JSON.stringify(parsedResponse))
      // Update context state explicitly
      setCoinbaseApiPermissions(parsedResponse)

      // Reload the API to ensure store consistency
      // await loadApi();
    } catch (err) {
      error(err instanceof Error ? err.toString() : String(err))
    }
  }

  // Button Click - Delete Api Keys
  const clickApiDelete = async () => {
    const store = await load(COINBASE_STORE)
    try {
      await store.set('Coinbase', {
        api_configured: false,
        api_key: null,
        api_secret: null,
        api_permissions: {
          can_trade: false,
          can_transfer: false,
          can_view: false,
          portfolio_type: '',
          portfolio_uuid: '',
        },
      })
      await store.save()

      // Reset context explicitly
      setCoinbaseApiKey('')
      setCoinbaseApiKeySecret('')
      setCoinbaseApiPermissions({
        can_view: false,
        can_trade: false,
        can_transfer: false,
        portfolio_uuid: '',
        portfolio_type: '',
      })

      info('Coinbase API configuration has been reset.')
    } catch (err) {
      error(err instanceof Error ? err.toString() : String(err))
    }
  }

  /* -------------------------------------------------------------------------------------------- */

  return (
    <div className={Style.ConnectConfigTab}>
      <div className={Style.Header}>Connect Coinbase API</div>

      <div className={Style.BoxFrame_Top}>
        <div className={Style.BoxFrame_TopLeft}>
          <div className={Style.Header}>Configuration</div>
          <div className={Style.Config_Section}>
            <div className={Style.ConfigText}>
              Coinbase requires your API key and secret to connect. You can generate these from the
              Coinbase Pro website. Make sure to keep your secret key secure.
            </div>
          </div>
        </div>

        <div className={Style.BoxFrame_TopRight}>
          <div className={Style.Header}>Api Permissions</div>
          <div className={Style.Info_Section}>
            <div className={Style.Info_Section_Row}>
              <div className={Style.Info_Section_Cell_Key}>Can View:</div>
              <div className={Style.Info_Section_Cell_Result}>
                {' '}
                {selCoinbaseApiPermissions ? String(selCoinbaseApiPermissions.can_view) : ' '}
              </div>
            </div>
            <div className={Style.Info_Section_Row}>
              <div className={Style.Info_Section_Cell_Key}>Can Trade:</div>
              <div className={Style.Info_Section_Cell_Result}>
                {' '}
                {selCoinbaseApiPermissions ? String(selCoinbaseApiPermissions.can_trade) : ' '}
              </div>
            </div>
            <div className={Style.Info_Section_Row}>
              <div className={Style.Info_Section_Cell_Key}>Can Transfer:</div>
              <div className={Style.Info_Section_Cell_Result}>
                {' '}
                {selCoinbaseApiPermissions ? String(selCoinbaseApiPermissions.can_transfer) : ' '}
              </div>
            </div>
            <div className={Style.Info_Section_Row}>
              <div className={Style.Info_Section_Cell_Key}>Portfolio uuid:</div>
              <div className={Style.Info_Section_Cell_Result}>
                {' '}
                {selCoinbaseApiPermissions ? selCoinbaseApiPermissions.portfolio_uuid : ''}
              </div>
            </div>
            <div className={Style.Info_Section_Row}>
              <div className={Style.Info_Section_Cell_Key}>Portfolio Type:</div>
              <div className={Style.Info_Section_Cell_Result}>
                {' '}
                {selCoinbaseApiPermissions ? selCoinbaseApiPermissions.portfolio_type : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={Style.BoxFrame_Bottom}>
        <div className={Style.Header}>Coinbase Configuration</div>
        <div className={Style.Input_Section}>
          <div className={Style.Input_Section_Row}>
            <div className={Style.Input_Section_Cell}>
              <div className={Style.Header}>API Key</div>
              <input
                type="text"
                id="api_key"
                value={selCoinbaseApiKey ?? ''}
                onChange={e => setCoinbaseApiKey(e.target.value)}
                className={Style.UserInput_Text}
                autoComplete="off"
                placeholder="Enter your Coinbase API Key"
              />
            </div>
          </div>
          <div className={Style.Input_Section_Row}>
            <div className={Style.Input_Section_Cell}>
              <div className={Style.Header}>API Secret</div>
              <input
                type="text"
                id="api_key_secret"
                value={selCoinbaseApiKeySecret ?? ''}
                onChange={e => setCoinbaseApiKeySecret(e.target.value)}
                className={Style.UserInput_Text}
                autoComplete="off"
                placeholder="Enter your Coinbase API Secret"
              />
            </div>
          </div>
        </div>

        <div className={Style.Box_Button}>
          <button type="button" onClick={clickApiSave} className={Style.Button_Save}>
            Save and Test Configuration
          </button>
          <button type="button" onClick={clickApiDelete} className={Style.Button_Delete}>
            Delete Configuration
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoinbaseConfig

/* ---------------------------------------------------------------------------------------------- */
