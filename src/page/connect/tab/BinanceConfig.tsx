/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Connect Tab - BinanceConfig
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Binance api connection settings.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/connect/tab/BinanceConfig.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Tauri
import { load } from '@tauri-apps/plugin-store'
import { info, error } from '@tauri-apps/plugin-log'
import { invoke } from '@tauri-apps/api/core'
// Context
import { useInterfaceContext } from '../../../context/InterfaceContext'
import { DataApiPermissionsType } from '../../../context/broker/Coinbase'
// CSS Module
import Style from './Config.module.css'

/* ---------------------------------------------------------------------------------------------- */

const BinanceConfig: React.FC = () => {
  // State Management
  const { selCoinbaseApiKey, setCoinbaseApiKey } = useInterfaceContext()
  const { selCoinbaseApiKeySecret, setCoinbaseApiKeySecret } = useInterfaceContext()
  const { selCoinbaseApiPermissions, setCoinbaseApiPermissions } = useInterfaceContext()

  // Delete API
  const deleteApi = async () => {
    const store = await load('binance.json')
    try {
      await store.set('coinbase', {
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

  // Button Click: Api Save
  const clickApiSave = async () => {
    try {
      const response: string = await invoke('coinbase_store_api_keys', {
        coinbaseApiKey: selCoinbaseApiKey,
        coinbaseApiSecret: selCoinbaseApiKeySecret,
      })

      const parsedResponse: DataApiPermissionsType = JSON.parse(response)
      info('Parsed Response: ' + JSON.stringify(parsedResponse))
      // Update context state explicitly
      setCoinbaseApiPermissions(parsedResponse)

      // Reload the API to ensure store consistency
      // await loadApi();
    } catch (err) {
      error(err instanceof Error ? err.toString() : String(err))
    }
  }

  // Button Click - Api Delete
  const clickApiDelete = async () => {
    deleteApi()
  }

  /* -------------------------------------------------------------------------------------------- */

  return (
    <div className={Style.ConnectConfigTab}>
      <div className={Style.Header}>Connect Binance API</div>

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
                {selCoinbaseApiPermissions
                  ? String(selCoinbaseApiPermissions.can_view)
                  : 'undefined'}
              </div>
            </div>
            <div className={Style.Info_Section_Row}>
              <div className={Style.Info_Section_Cell_Key}>Can Trade:</div>
              <div className={Style.Info_Section_Cell_Result}>
                {' '}
                {selCoinbaseApiPermissions
                  ? String(selCoinbaseApiPermissions.can_trade)
                  : 'undefined'}
              </div>
            </div>
            <div className={Style.Info_Section_Row}>
              <div className={Style.Info_Section_Cell_Key}>Can Transfer:</div>
              <div className={Style.Info_Section_Cell_Result}>
                {' '}
                {selCoinbaseApiPermissions
                  ? String(selCoinbaseApiPermissions.can_transfer)
                  : 'undefined'}
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
        <div className={Style.Header}>Binance Configuration</div>
        <div className={Style.Input_Section}>
          <div className={Style.Input_Section_Row}>
            <div className={Style.Input_Section_Cell}>
              <div className={Style.Header}>API Key</div>
              <input
                type="text"
                id="api_key"
                value={selCoinbaseApiKey ?? ''}
                onChange={(e) => setCoinbaseApiKey(e.target.value)}
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
                onChange={(e) => setCoinbaseApiKeySecret(e.target.value)}
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

export default BinanceConfig

/* ---------------------------------------------------------------------------------------------- */
