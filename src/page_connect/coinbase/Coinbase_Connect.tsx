/* ---------------------------------------------------------------------------------------------- */
//! - Coinbase_Connect.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useEffect, useState } from 'react';
// Tauri
import { load } from '@tauri-apps/plugin-store';
import { info, error } from '@tauri-apps/plugin-log';
import { invoke } from '@tauri-apps/api/core';
// Interface
import { Api_Permissions_Type } from './type/Api_Permissions_Type';
// CSS Modules
import Style from './Coinbase_Connect.module.css';
/* ---------------------------------------------------------------------------------------------- */

const store = await load('app_apis.json');

/* ---------------------------------------------------------------------------------------------- */

const Coinbase_Connect: React.FC = () => {
  // State
  const [selected_api_key, set_selected_api_key] = useState('');
  const [selected_api_secret, set_selected_api_secret] = useState('');
  const [selected_ApiPermissions, setSelected_ApiPermissions] =
    useState<Api_Permissions_Type | null>(null);

  useEffect(() => {
    loadKeys();
  }, []);

  const loadKeys = async () => {
    try {
      const savedApiKey = await store.get<{ api_key: string }>('coinbase');
      const savedApiSecret = await store.get<{ api_secret: string }>('coinbase');
      const savedApiPermissions = await store.get<{
        perm_can_view?: boolean;
        perm_can_trade?: boolean;
        perm_can_transfer?: boolean;
        perm_portfolio_uuid?: string;
        perm_portfolio_type?: string;
      }>('coinbase');

      if (savedApiKey) {
        set_selected_api_key(savedApiKey.api_key);
      }

      if (savedApiSecret) {
        set_selected_api_secret(savedApiSecret.api_secret);
      }

      if (savedApiPermissions) {
        setSelected_ApiPermissions({
          perm_can_view: savedApiPermissions.perm_can_view ?? false,
          perm_can_trade: savedApiPermissions.perm_can_trade ?? false,
          perm_can_transfer: savedApiPermissions.perm_can_transfer ?? false,
          perm_portfolio_uuid: savedApiPermissions.perm_portfolio_uuid ?? '',
          perm_portfolio_type: savedApiPermissions.perm_portfolio_type ?? '',
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        error(err.toString());
      } else {
        error(String(err));
      }
    }
  };

  // Button Click - Api Save
  const buttonClick_Api_Save = async () => {
    try {
      const response: string = await invoke('coinbase_connect_api_save', {
        api_key: selected_api_key,
        api_secret: selected_api_secret,
      });
      info('[coinbase_keys_test]\n' + response);

      // Parse the response and set API permissions
      const parsedResponse = response.split('\n').reduce(
        (acc: Api_Permissions_Type, line) => {
          const [key, value] = line.split(':').map((item) => item.trim());
          if (key && value !== undefined) {
            if (
              key === 'perm_can_view' ||
              key === 'perm_can_trade' ||
              key === 'perm_can_transfer'
            ) {
              acc[key as 'perm_can_view' | 'perm_can_trade' | 'perm_can_transfer'] =
                value === 'true';
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
        } as Api_Permissions_Type,
      );

      setSelected_ApiPermissions({
        perm_can_view: parsedResponse.perm_can_view ?? false,
        perm_can_trade: parsedResponse.perm_can_trade ?? false,
        perm_can_transfer: parsedResponse.perm_can_transfer ?? false,
        perm_portfolio_uuid: parsedResponse.perm_portfolio_uuid ?? '',
        perm_portfolio_type: parsedResponse.perm_portfolio_type ?? '',
      });
    } catch (err) {
      if (err instanceof Error) {
        error(err.toString());
      } else {
        error(String(err));
      }
      info('Failed to test API keys.');
    }
  };

  // Button Click - Api Delete
  const buttonClick_Api_Delete = async () => {};

  return (
    <div className={Style.Component}>
      <div className={Style.Title}>Coinbase</div>
      <div className={Style.Top_Container}>
        <div className={Style.Top_Left_Container}>
          <div className={Style.Title}>API Settings</div>
          <div className={Style.Settings_Box}>
            <div className={Style.Settings_Text}>
              Coinbase requires your API key and secret to connect. You can generate these from the
              Coinbase Pro website. Make sure to keep your secret key secure.
            </div>
          </div>
        </div>

        <div className={Style.Top_Right_Container}>
          <div className={Style.Title}>Api Permissions</div>
          <div className={Style.Permission_Box}>
            <div>
              <div className={Style.Permission_Text}>
                Can View:{' '}
                {selected_ApiPermissions ? String(selected_ApiPermissions.perm_can_view) : ''}
              </div>
              <div className={Style.Permission_Text}>
                Can Trade:{' '}
                {selected_ApiPermissions ? String(selected_ApiPermissions.perm_can_trade) : ''}
              </div>
              <div className={Style.Permission_Text}>
                Can Transfer:{' '}
                {selected_ApiPermissions ? String(selected_ApiPermissions.perm_can_transfer) : ''}
              </div>
              <div className={Style.Permission_Text}>
                Portfolio uuid:{' '}
                {selected_ApiPermissions ? selected_ApiPermissions.perm_portfolio_uuid : ''}
              </div>
              <div className={Style.Permission_Text}>
                Portfolio Type:{' '}
                {selected_ApiPermissions ? selected_ApiPermissions.perm_portfolio_type : ''}
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
              value={selected_api_key}
              onChange={(e) => set_selected_api_key(e.target.value)}
              className={Style.Input}
              autoComplete="off"
              placeholder="Enter your Coinbase API Key"
            />
          </div>

          <div className={Style.Input_Box}>
            <div className={Style.Input_Label}>API Secret</div>
            <input
              type="text"
              id="api_secret"
              value={selected_api_secret}
              onChange={(e) => set_selected_api_secret(e.target.value)}
              className={Style.Input}
              autoComplete="off"
              placeholder="Enter your Coinbase API Secret"
            />
          </div>
        </div>
        <div className={Style.Button_Box}>
          <button type="button" onClick={buttonClick_Api_Save} className={Style.Save_Button}>
            Save and Test API Keys
          </button>
          <button type="button" onClick={buttonClick_Api_Delete} className={Style.Delete_Button}>
            Delete Api Keys
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coinbase_Connect;
//
/* ---------------------------------------------------------------------------------------------- */
