/* ------------------------------------------------------------------------------------------------------------------ */
//! - pages/connect/coinbase/ConnectCoinbase.tsx
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React, { useCallback, useEffect } from 'react';
// Tauri
import { load } from '@tauri-apps/plugin-store';
import { info, error } from '@tauri-apps/plugin-log';
import { invoke } from '@tauri-apps/api/core';
// Interface
import { useInterfaceContext } from 'interface/InterfaceContext';
import { PermissionsType } from 'interface/coinbase/api/permissions/Permissions';
import { ApiType } from 'interface/coinbase/api/Api';
// CSS Modules
import Style from './ConnectCoinbase.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */

const store = await load('app_apis.json');

/* ------------------------------------------------------------------------------------------------------------------ */

const ConnectCoinbase: React.FC = () => {
  // State Management
  const { selCoinbaseApiKey, setCoinbaseApiKey } = useInterfaceContext();
  const { selCoinbaseApiKeySecret, setCoinbaseApiKeySecret } = useInterfaceContext();
  const { selCoinbaseApiPermissions, setCoinbaseApiPermissions } = useInterfaceContext();

  // Load API
  const loadApi = useCallback(async () => {
    try {
      const savedApi = await store.get<ApiType>('coinbase');

      if (savedApi) {
        console.log('Loaded API:', savedApi);
        setCoinbaseApiKey(savedApi.api_key ? savedApi.api_key : '');
        setCoinbaseApiKeySecret(savedApi.api_key_secret ? savedApi.api_key_secret : '');
        setCoinbaseApiPermissions(savedApi.api_permissions);
        console.log('Permissions:', savedApi.api_permissions);
      }
    } catch (err) {
      if (err instanceof Error) {
        error(err.toString());
      } else {
        error(String(err));
      }
    }
  }, [setCoinbaseApiKey, setCoinbaseApiKeySecret, setCoinbaseApiPermissions]);

  // Initialize on Component load
  useEffect(() => {
    loadApi();
  }, [loadApi]);

  // Delete API
  const deleteApi = async () => {
    try {
      await store.set('coinbase', {
        api_configured: false,
        api_key: null,
        api_secret: null,
        api_permissions: {
          perm_can_trade: false,
          perm_can_transfer: false,
          perm_can_view: false,
          perm_portfolio_type: '',
          perm_portfolio_uuid: '',
        },
      });
      await store.save();

      setCoinbaseApiKey('');
      setCoinbaseApiKeySecret('');
      setCoinbaseApiPermissions({
        perm_can_view: false,
        perm_can_trade: false,
        perm_can_transfer: false,
        perm_portfolio_uuid: '',
        perm_portfolio_type: '',
      });

      info('Coinbase API configuration has been reset.');
    } catch (err) {
      if (err instanceof Error) {
        error(err.toString());
      } else {
        error(String(err));
      }
    }
  };

  // Button Click: Api Save
  const clickApiSave = async () => {
    try {
      const response: string = await invoke('coinbase_store_api_keys', {
        coinbaseApiKey: selCoinbaseApiKey,
        coinbaseApiSecret: selCoinbaseApiKeySecret,
      });
      info('[coinbase_keys_test]\n' + response);

      // Parse the response and set API permissions
      const parsedResponse = response.split('\n').reduce(
        (acc: PermissionsType, line) => {
          const [key, value] = line.split(':').map((item) => item.trim());
          if (key && value !== undefined) {
            if (key === 'perm_can_view' || key === 'perm_can_trade' || key === 'perm_can_transfer') {
              acc[key as 'perm_can_view' | 'perm_can_trade' | 'perm_can_transfer'] = value === 'true';
            } else if (key === 'perm_portfolio_uuid' || key === 'perm_portfolio_type') {
              acc[key as 'perm_portfolio_uuid' | 'perm_portfolio_type'] = value;
            }
          }
          return acc;
        },
        {
          perm_can_view: false,
          perm_can_trade: false,
          perm_can_transfer: false,
          perm_portfolio_uuid: '',
          perm_portfolio_type: '',
        } as PermissionsType,
      );

      setCoinbaseApiPermissions(parsedResponse);

      // Load API permissions after saving
      await loadApi();
    } catch (err) {
      if (err instanceof Error) {
        error(err.toString());
      } else {
        error(String(err));
      }
    }
  };

  // Button Click - Api Delete
  const clickApiDelete = async () => {
    deleteApi();
  };

  /* ---------------------------------------------------------------------------------------------------------------- */

  return (
    <div className={Style.Component}>
      <div className={Style.Title}>Coinbase</div>
      <div className={Style.Top_Container}>
        <div className={Style.Top_Left_Container}>
          <div className={Style.Title}>API Settings</div>
          <div className={Style.Settings_Box}>
            <div className={Style.Settings_Text}>
              Coinbase requires your API key and secret to connect. You can generate these from the Coinbase Pro
              website. Make sure to keep your secret key secure.
            </div>
          </div>
        </div>

        <div className={Style.Top_Right_Container}>
          <div className={Style.Title}>Api Permissions</div>
          <div className={Style.Permission_Box}>
            <div>
              <div className={Style.Permission_Text}>
                Can View: {selCoinbaseApiPermissions ? String(selCoinbaseApiPermissions.perm_can_view) : ''}
              </div>
              <div className={Style.Permission_Text}>
                Can Trade: {selCoinbaseApiPermissions ? String(selCoinbaseApiPermissions.perm_can_trade) : ''}
              </div>
              <div className={Style.Permission_Text}>
                Can Transfer: {selCoinbaseApiPermissions ? String(selCoinbaseApiPermissions.perm_can_transfer) : ''}
              </div>
              <div className={Style.Permission_Text}>
                Portfolio uuid: {selCoinbaseApiPermissions ? selCoinbaseApiPermissions.perm_portfolio_uuid : ''}
              </div>
              <div className={Style.Permission_Text}>
                Portfolio Type: {selCoinbaseApiPermissions ? selCoinbaseApiPermissions.perm_portfolio_type : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Style.Bottom_Container}>
        <div className={Style.Title}>Your API Keys</div>
        <div className={Style.Input_Container}>
          <div className={Style.Input_Box}>
            <div className={Style.Input_Label}>API Key</div>
            <input
              type="text"
              id="api_key"
              value={selCoinbaseApiKey ?? ''}
              onChange={(e) => setCoinbaseApiKey(e.target.value)}
              className={Style.Input}
              autoComplete="off"
              placeholder="Enter your Coinbase API Key"
            />
          </div>

          <div className={Style.Input_Box}>
            <div className={Style.Input_Label}>API Secret</div>
            <input
              type="text"
              id="api_key_secret"
              value={selCoinbaseApiKeySecret ?? ''}
              onChange={(e) => setCoinbaseApiKeySecret(e.target.value)}
              className={Style.Input}
              autoComplete="off"
              placeholder="Enter your Coinbase API Secret"
            />
          </div>
        </div>
        <div className={Style.Button_Box}>
          <button type="button" onClick={clickApiSave} className={Style.Save_Button}>
            Save and Test Configuration
          </button>
          <button type="button" onClick={clickApiDelete} className={Style.Delete_Button}>
            Delete Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectCoinbase;

/* ------------------------------------------------------------------------------------------------------------------ */
