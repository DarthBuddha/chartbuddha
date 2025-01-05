//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Coinbase Connect
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React, { useState, useEffect } from 'react';
// Tauri
import { getStore } from '@tauri-apps/plugin-store';
import { info, error } from '@tauri-apps/plugin-log';
import { invoke } from '@tauri-apps/api/core';
// Interface
import { useContext_Interface } from 'interface/Context_Interface';
import { Type_ApiPermissions } from 'interface/Type_ApiPermissions';
// CSS Modules
import Style from './Coinbase_Connect.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const store = await getStore('.keys.json');
//
const handleError = (err: unknown) => {
  if (err instanceof Error) {
    error(err.message);
  } else {
    error('An unknown error occurred');
  }
};
// Function to convert an EC private key from SEC1 PEM format to PKCS8 PEM format
const convertApiSecret = (apiSecret: string): string => {
  // Replace escaped newlines (in case of JSON saved with "\\n") with actual newlines
  let formattedSecret = apiSecret.replace(/\\n/g, '\n');
  // Convert the headers and footers if needed
  formattedSecret = formattedSecret
    .replace('-----BEGIN EC PRIVATE KEY-----', '-----BEGIN PRIVATE KEY-----')
    .replace('-----END EC PRIVATE KEY-----', '-----END PRIVATE KEY-----');
  // Format the key into proper PEM with newlines
  formattedSecret = `-----BEGIN PRIVATE KEY-----\n${formattedSecret
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\n/g, '') // Remove any existing line breaks to standardize
    .match(/.{1,64}/g) // PEM typically splits the content every 64 characters
    ?.join('\n')}\n-----END PRIVATE KEY-----\n`;
  return formattedSecret;
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Coinbase_Connect: React.FC = () => {
  // Load the API key and secret from the store when the component mounts
  useEffect(() => {
    loadKeys();
  }, []);

  // Context
  // const { selected_DataApi } = useContext_Interface();
  const { selected_ApiPermissions, setFocus_ApiPermissions } = useContext_Interface();

  // State
  const [selected_ApiKey, setFocus_ApiKey] = useState('');
  const [selected_ApiSecret, setFocus_ApiSecret] = useState('');

  const loadKeys = async () => {
    // info('Loading Api Key & Secret...');
    if (!store) {
      handleError(new Error('Store is not initialized'));
      return;
    }

    try {
      const savedApiKey = await store.get<{ api_key: string }>('coinbase');
      const savedApiSecret = await store.get<{ api_secret: string }>('coinbase');
      if (savedApiKey) setFocus_ApiKey(savedApiKey.api_key);
      if (savedApiSecret) setFocus_ApiSecret(convertApiSecret(savedApiSecret.api_secret));
    } catch (err) {
      handleError(err);
    }
  };

  // Function to handle saving the keys (Save Keys button)
  const button_SaveKeys = async () => {
    const formattedApiSecret = convertApiSecret(selected_ApiSecret);

    if (store) {
      info('Save Keys...');
      await store.set('coinbase', { api_key: selected_ApiKey, api_secret: formattedApiSecret });
    } else {
      throw new Error('Store is not initialized');
    }
  };

  // Function to handle testing the keys (Test Keys button)
  const button_TestKeys = async () => {
    try {
      const response: string = await invoke('coinbase_test_api');
      info('[coinbase_keys_test]\n' + response);

      // Parse the response and set API permissions
      const parsedResponse = response.split('\n').reduce(
        (acc: Type_ApiPermissions, line) => {
          const [key, value] = line.split(':').map((item) => item.trim());
          if (key && value !== undefined) {
            if (key === 'can_view' || key === 'can_trade' || key === 'can_transfer') {
              acc[key as 'can_view' | 'can_trade' | 'can_transfer'] = value === 'true';
            } else if (key === 'portfolio_uuid' || key === 'portfolio_type') {
              acc[key as 'portfolio_uuid' | 'portfolio_type'] = value;
            }
          }
          return acc;
        },
        {
          can_view: false,
          can_trade: false,
          can_transfer: false,
          portfolio_uuid: '',
          portfolio_type: '',
        } as Type_ApiPermissions,
      );

      setFocus_ApiPermissions({
        can_view: parsedResponse.can_view ?? false,
        can_trade: parsedResponse.can_trade ?? false,
        can_transfer: parsedResponse.can_transfer ?? false,
        portfolio_uuid: parsedResponse.portfolio_uuid ?? '',
        portfolio_type: parsedResponse.portfolio_type ?? '',
      });
    } catch (err) {
      handleError(err);
      info('Failed to test API keys.');
    }
  };

  // Function to handle deleting the keys (Delete Keys button)
  const button_DeleteKeys = async () => {
    if (store) {
      info('Delete Keys...');
      await store.set('coinbase', { api_key: null, api_secret: null });
    } else {
      throw new Error('Store is not initialized');
    }
  };

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
                Can View: {selected_ApiPermissions ? String(selected_ApiPermissions.can_view) : ''}
              </div>
              <div className={Style.Permission_Text}>
                Can Trade: {selected_ApiPermissions ? String(selected_ApiPermissions.can_trade) : ''}
              </div>
              <div className={Style.Permission_Text}>
                Can Transfer: {selected_ApiPermissions ? String(selected_ApiPermissions.can_transfer) : ''}
              </div>
              <div className={Style.Permission_Text}>
                Portfolio uuid: {selected_ApiPermissions ? selected_ApiPermissions.portfolio_uuid : ''}
              </div>
              <div className={Style.Permission_Text}>
                Portfolio Type: {selected_ApiPermissions ? selected_ApiPermissions.portfolio_type : ''}
              </div>
              <div className={Style.Permission_Text}>Configure Api Permissions on Coinbase</div>
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
              id="apiKey"
              value={selected_ApiKey}
              onChange={(e) => setFocus_ApiKey(e.target.value)}
              className={Style.Input}
              autoComplete="off"
              placeholder="Enter your Coinbase API Key"
            />
          </div>

          <div className={Style.Input_Box}>
            <div className={Style.Input_Label}>API Secret</div>
            <input
              type="text"
              id="apiSecret"
              value={selected_ApiSecret}
              onChange={(e) => setFocus_ApiSecret(e.target.value)}
              className={Style.Input}
              autoComplete="off"
              placeholder="Enter your Coinbase API Secret"
            />
          </div>
        </div>
        <div className={Style.Button_Box}>
          <button type="button" onClick={button_SaveKeys} className={Style.Save_Button}>
            Save Api Keys
          </button>
          <button type="button" onClick={button_TestKeys} className={Style.Test_Button}>
            Test API
          </button>
          <button type="button" onClick={button_DeleteKeys} className={Style.Delete_Button}>
            Delete Api Keys
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coinbase_Connect;
//
/* ------------------------------------------------------------------------------------------------------------------ */
