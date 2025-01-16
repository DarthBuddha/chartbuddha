/* ------------------------------------------------------------------------------------------------------------------ */
//! - pages/connect/coinbase/ConnectCoinbase.tsx
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Tauri
import { load } from '@tauri-apps/plugin-store';
import { info, error } from '@tauri-apps/plugin-log';
import { invoke } from '@tauri-apps/api/core';
// Interface
import { useInterfaceContext } from 'interface/InterfaceContext';
import { PermissionsType } from 'interface/coinbase/api/permissions/Permissions';
// CSS Module
import Style from './ConnectCoinbase.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */

const store = await load('app_apis.json');

/* ------------------------------------------------------------------------------------------------------------------ */

const ConnectCoinbase: React.FC = () => {
  // State Management
  const { selCoinbaseApiKey, setCoinbaseApiKey } = useInterfaceContext();
  const { selCoinbaseApiKeySecret, setCoinbaseApiKeySecret } = useInterfaceContext();
  const { selCoinbaseApiPermissions, setCoinbaseApiPermissions } = useInterfaceContext();

  // Delete API
  const deleteApi = async () => {
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
      });
      await store.save();

      // Reset context explicitly
      setCoinbaseApiKey('');
      setCoinbaseApiKeySecret('');
      setCoinbaseApiPermissions({
        can_view: false,
        can_trade: false,
        can_transfer: false,
        portfolio_uuid: '',
        portfolio_type: '',
      });

      info('Coinbase API configuration has been reset.');
    } catch (err) {
      error(err instanceof Error ? err.toString() : String(err));
    }
  };

  // Button Click: Api Save
  const clickApiSave = async () => {
    try {
      const response: string = await invoke('coinbase_store_api_keys', {
        coinbaseApiKey: selCoinbaseApiKey,
        coinbaseApiSecret: selCoinbaseApiKeySecret,
      });

      const parsedResponse: PermissionsType = JSON.parse(response);
      info('Parsed Response: ' + JSON.stringify(parsedResponse));
      // Update context state explicitly
      setCoinbaseApiPermissions(parsedResponse);

      // Reload the API to ensure store consistency
      // await loadApi();
    } catch (err) {
      error(err instanceof Error ? err.toString() : String(err));
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
                Can View: {selCoinbaseApiPermissions ? String(selCoinbaseApiPermissions.can_view) : 'undefined'}
              </div>
              <div className={Style.Permission_Text}>
                Can Trade: {selCoinbaseApiPermissions ? String(selCoinbaseApiPermissions.can_trade) : 'undefined'}
              </div>
              <div className={Style.Permission_Text}>
                Can Transfer: {selCoinbaseApiPermissions ? String(selCoinbaseApiPermissions.can_transfer) : 'undefined'}
              </div>
              <div className={Style.Permission_Text}>
                Portfolio uuid: {selCoinbaseApiPermissions ? selCoinbaseApiPermissions.portfolio_uuid : ''}
              </div>
              <div className={Style.Permission_Text}>
                Portfolio Type: {selCoinbaseApiPermissions ? selCoinbaseApiPermissions.portfolio_type : ''}
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
