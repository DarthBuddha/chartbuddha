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
import { useAppContext } from 'hooks/useAppContext.ts'
import { BrokerApiInterface } from 'interface/BrokerApiContext.ts'
// import { BrokerDataApiInterface } from 'interface/BrokerApiContext.ts'
import { BrokerDataApiPermissionsInterface } from 'interface/BrokerApiContext.ts'
// Constants
import { COINBASE_STORE } from 'constants.ts'
// CSS Modules
import Style_App from 'css/App.module.css'
import Style from '../css/Connect_Tab.module.css'

/* ---------------------------------------------------------------------------------------------- */

const CoinbaseConfig: React.FC = () => {
  // State Management
  const { selApis, setApis } = useAppContext()

  // Use Effect: On Component Load
  useEffect(() => {
    const loadCoinbaseConfig = async () => {
      const store = await load(COINBASE_STORE)
      try {
        const coinbaseStore = await store.get<BrokerApiInterface>('Coinbase')

        if (coinbaseStore) {
          setApis(prevApis => ({
            ...prevApis,
            coinbase_api: coinbaseStore,
            binance_api: prevApis?.binance_api ?? null,
          }))
        }
      } catch (err) {
        error(`Error loading Database Config: ${err instanceof Error ? err.message : String(err)}`)
      }
    }

    info('useEffect: loadCoinbaseConfig')
    loadCoinbaseConfig()
  }, [setApis])

  // Button Click: Save Api Keys
  const clickApiSave = async () => {
    try {
      const response: string = await invoke('save_coinbase_cmd', {
        coinbaseApiKey: selApis?.coinbase_api?.broker_data_api?.api_key,
        coinbaseApiSecret: selApis?.coinbase_api?.broker_data_api?.api_key_secret,
      })

      // Ensure the response is parsed correctly
      const parsedResponse: BrokerDataApiPermissionsInterface = JSON.parse(response)
      info('Parsed Response: ' + JSON.stringify(parsedResponse))
      // Update context state explicitly
      setApis(prevApis => ({
        ...prevApis,
        coinbase_api: {
          ...prevApis?.coinbase_api,
          broker_data_api: {
            ...prevApis?.coinbase_api?.broker_data_api,
            api_permissions: parsedResponse,
            api_key: prevApis?.coinbase_api?.broker_data_api?.api_key ?? '',
            api_key_secret: prevApis?.coinbase_api?.broker_data_api?.api_key_secret ?? '',
          },
          broker_products: prevApis?.coinbase_api?.broker_products ?? null,
        },
        binance_api: prevApis?.binance_api ?? null,
      }))

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
        broker_data_api: {
          api_key: null,
          api_key_secret: null,
          api_permissions: {
            can_trade: false,
            can_transfer: false,
            can_view: false,
            portfolio_type: '',
            portfolio_uuid: '',
          },
        },
      })
      await store.save()

      // Reset context explicitly
      setApis(prevApis => ({
        ...prevApis,
        coinbase_api: null,
        binance_api: prevApis?.binance_api ?? null,
      }))

      info('Coinbase API configuration has been reset.')
    } catch (err) {
      error(err instanceof Error ? err.toString() : String(err))
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'api_key' | 'api_key_secret',
  ) => {
    setApis(prevApis => ({
      ...prevApis,
      coinbase_api: {
        ...prevApis?.coinbase_api,
        broker_data_api: {
          ...prevApis?.coinbase_api?.broker_data_api,
          [field]: e.target.value || '',
          api_permissions: prevApis?.coinbase_api?.broker_data_api?.api_permissions ?? {
            can_view: false,
            can_trade: false,
            can_transfer: false,
            portfolio_uuid: '',
            portfolio_type: '',
          },
        },
        broker_products: prevApis?.coinbase_api?.broker_products ?? null,
      },
      binance_api: prevApis?.binance_api ?? null,
    }))
  }

  /* -------------------------------------------------------------------------------------------- */

  return (
    <div className={Style.Tab_Config}>
      <div className={Style_App.Header}>Connect Coinbase API</div>

      <div className={Style.Frame_Top}>
        <div className={Style.Frame_TopLeft}>
          <div className={Style_App.Header}>Configuration</div>
          <div className={Style.Config_Section}>
            <div className={Style.ConfigText}>
              Coinbase requires your API key and secret to connect. You can generate these from the
              Coinbase Pro website. Make sure to keep your secret key secure.
            </div>
          </div>
        </div>

        <div className={Style.Frame_TopRight}>
          <div className={Style_App.Header}>Api Permissions</div>
          <div className={Style.Info_Section}>
            <div className={Style.Info_Section_Row}>
              <div className={Style.Info_Section_Cell_Key}>Can View:</div>
              <div className={Style.Info_Section_Cell_Result}>
                {' '}
                {selApis?.coinbase_api?.broker_data_api?.api_permissions
                  ? String(selApis.coinbase_api.broker_data_api.api_permissions.can_view)
                  : ' '}
              </div>
            </div>
            <div className={Style.Info_Section_Row}>
              <div className={Style.Info_Section_Cell_Key}>Can Trade:</div>
              <div className={Style.Info_Section_Cell_Result}>
                {' '}
                {selApis?.coinbase_api?.broker_data_api?.api_permissions
                  ? String(selApis.coinbase_api.broker_data_api.api_permissions.can_trade)
                  : ' '}
              </div>
            </div>
            <div className={Style.Info_Section_Row}>
              <div className={Style.Info_Section_Cell_Key}>Can Transfer:</div>
              <div className={Style.Info_Section_Cell_Result}>
                {' '}
                {selApis?.coinbase_api?.broker_data_api?.api_permissions
                  ? String(selApis.coinbase_api.broker_data_api.api_permissions.can_transfer)
                  : ' '}
              </div>
            </div>
            <div className={Style.Info_Section_Row}>
              <div className={Style.Info_Section_Cell_Key}>Portfolio uuid:</div>
              <div className={Style.Info_Section_Cell_Result}>
                {' '}
                {selApis?.coinbase_api?.broker_data_api?.api_permissions
                  ? selApis.coinbase_api.broker_data_api.api_permissions.portfolio_uuid
                  : ''}
              </div>
            </div>
            <div className={Style.Info_Section_Row}>
              <div className={Style.Info_Section_Cell_Key}>Portfolio Type:</div>
              <div className={Style.Info_Section_Cell_Result}>
                {' '}
                {selApis?.coinbase_api?.broker_data_api?.api_permissions
                  ? selApis.coinbase_api.broker_data_api.api_permissions.portfolio_type
                  : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={Style.Frame_Bottom}>
        <div className={Style_App.Header}>Coinbase Configuration</div>
        <div className={Style.Input_Section}>
          <div className={Style.Input_Section_Row}>
            <div className={Style.Input_Section_Cell}>
              <div className={Style.Header}>API Key</div>
              <input
                type="text"
                id="api_key"
                onChange={e => handleInputChange(e, 'api_key')}
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
                onChange={e => handleInputChange(e, 'api_key_secret')}
                className={Style.UserInput_Text}
                autoComplete="off"
                placeholder="Enter your Coinbase API Secret"
              />
            </div>
          </div>

          <div className={Style.Section_Button}>
            <button type="button" onClick={clickApiSave} className={Style.Button_Save}>
              Save and Test Configuration
            </button>
            <button type="button" onClick={clickApiDelete} className={Style.Button_Delete}>
              Delete Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinbaseConfig

/* ---------------------------------------------------------------------------------------------- */
