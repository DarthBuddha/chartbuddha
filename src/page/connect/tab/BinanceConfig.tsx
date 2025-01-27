/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Connect Tab -> BinanceConfig
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Configure binance api settings.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/page/connect/tab/BinanceConfig.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useEffect } from 'react'
// Tauri
import { invoke } from '@tauri-apps/api/core'
import { info, error } from '@tauri-apps/plugin-log'
import { load } from '@tauri-apps/plugin-store'
// Context
import { useInterfaceContext } from '../../../context/InterfaceContext'
import { BinanceDataApiPermissionsType } from '../../../context/apis/Binance'
// CSS Module
import Style from './Config.module.css'

/* ---------------------------------------------------------------------------------------------- */

const BinanceConfig: React.FC = () => {
  // State Management
  const { selBinanceApiKey, setBinanceApiKey } = useInterfaceContext()
  const { selBinanceApiKeySecret, setBinanceApiKeySecret } = useInterfaceContext()
  const { selBinanceApiPermissions, setBinanceApiPermissions } = useInterfaceContext()

  // Use Effect: On Component Load
  useEffect(() => {
    const loadBinanceConfig = async () => {
      const store = await load('binance.json')
      try {
        const binanceStore = await store.get<{
          api_key: string
          api_key_secret: string
          api_permissions: BinanceDataApiPermissionsType
        }>('Binance')

        if (binanceStore) {
          setBinanceApiKey(binanceStore.api_key || '')
          setBinanceApiKeySecret(binanceStore.api_key_secret || '')
          setBinanceApiPermissions(
            binanceStore.api_permissions || {
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

    info('useEffect: loadBinanceConfig')
    loadBinanceConfig()
  }, [setBinanceApiKey, setBinanceApiKeySecret, setBinanceApiPermissions])

  // Button Click: Save Api Keys
  const clickApiSave = async () => {
    try {
      const response: string = await invoke('store_binance_api_keys', {
        binanceApiKey: selBinanceApiKey,
        binanceApiSecret: selBinanceApiKeySecret,
      })

      const parsedResponse: BinanceDataApiPermissionsType = JSON.parse(response)
      info('Parsed Response: ' + JSON.stringify(parsedResponse))
      // Update context state explicitly
      setBinanceApiPermissions(parsedResponse)

      // Reload the API to ensure store consistency
      // await loadApi();
    } catch (err) {
      error(err instanceof Error ? err.toString() : String(err))
    }
  }

  // Button Click - Delete Api Keys
  const clickApiDelete = async () => {
    const store = await load('binance.json')
    try {
      await store.set('Binance', {
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
      setBinanceApiKey('')
      setBinanceApiKeySecret('')
      setBinanceApiPermissions({
        can_view: false,
        can_trade: false,
        can_transfer: false,
        portfolio_uuid: '',
        portfolio_type: '',
      })

      info('Binance API configuration has been reset.')
    } catch (err) {
      error(err instanceof Error ? err.toString() : String(err))
    }
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
              Binance requires your API key and secret to connect. You can generate these from the
              Binance Pro website. Make sure to keep your secret key secure.
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
                {selBinanceApiPermissions ? String(selBinanceApiPermissions.can_view) : 'undefined'}
              </div>
            </div>
            <div className={Style.Info_Section_Row}>
              <div className={Style.Info_Section_Cell_Key}>Can Trade:</div>
              <div className={Style.Info_Section_Cell_Result}>
                {' '}
                {selBinanceApiPermissions
                  ? String(selBinanceApiPermissions.can_trade)
                  : 'undefined'}
              </div>
            </div>
            <div className={Style.Info_Section_Row}>
              <div className={Style.Info_Section_Cell_Key}>Can Transfer:</div>
              <div className={Style.Info_Section_Cell_Result}>
                {' '}
                {selBinanceApiPermissions
                  ? String(selBinanceApiPermissions.can_transfer)
                  : 'undefined'}
              </div>
            </div>
            <div className={Style.Info_Section_Row}>
              <div className={Style.Info_Section_Cell_Key}>Portfolio uuid:</div>
              <div className={Style.Info_Section_Cell_Result}>
                {' '}
                {selBinanceApiPermissions ? selBinanceApiPermissions.portfolio_uuid : ''}
              </div>
            </div>
            <div className={Style.Info_Section_Row}>
              <div className={Style.Info_Section_Cell_Key}>Portfolio Type:</div>
              <div className={Style.Info_Section_Cell_Result}>
                {' '}
                {selBinanceApiPermissions ? selBinanceApiPermissions.portfolio_type : ''}
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
                value={selBinanceApiKey ?? ''}
                onChange={(e) => setBinanceApiKey(e.target.value)}
                className={Style.UserInput_Text}
                autoComplete="off"
                placeholder="Enter your Binance API Key"
              />
            </div>
          </div>
          <div className={Style.Input_Section_Row}>
            <div className={Style.Input_Section_Cell}>
              <div className={Style.Header}>API Secret</div>
              <input
                type="text"
                id="api_key_secret"
                value={selBinanceApiKeySecret ?? ''}
                onChange={(e) => setBinanceApiKeySecret(e.target.value)}
                className={Style.UserInput_Text}
                autoComplete="off"
                placeholder="Enter your Binance API Secret"
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
