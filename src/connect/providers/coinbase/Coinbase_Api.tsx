//! # ChartBuddha
//!
//! Page: Coinbase_Api
//! Description: Coinbase connect configuration.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import React, { useState, useEffect } from "react";
// Tauri
import { load } from "@tauri-apps/plugin-store";
import { info, error } from "@tauri-apps/plugin-log";
import { invoke } from "@tauri-apps/api/core";
// CSS Modules
import Style from "./Coinbase_Api.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Coinbase_Api: React.FC = () => {
  // State for storing API key and secret
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  // State for storing the results of Save/Delete actions
  const [actionResult, setActionResult] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      error(err.message);
    } else {
      error("An unknown error occurred");
    }
  };

  // Load the API key and secret from the store when the component mounts
  useEffect(() => {
    const loadKeys = async () => {
      info("Loading Api Key & Secret...");
      try {
        const store = await load("providers.json");
        const savedApiKey = await store.get<string>("coinbase.api_key");
        const savedApiSecret = await store.get<string>("coinbase.api_secret");
        if (savedApiKey) setApiKey(savedApiKey);
        if (savedApiSecret) setApiSecret(convertApiSecret(savedApiSecret));
      } catch (err) {
        handleError(err);
      }
    };
    loadKeys();
  }, []);

  // Function to convert an EC private key from SEC1 PEM format to PKCS8 PEM format
  const convertApiSecret = (apiSecret: string): string => {
    // Replace escaped newlines (in case of JSON saved with "\\n") with actual newlines
    let formattedSecret = apiSecret.replace(/\\n/g, "\n");

    // Convert the headers and footers if needed
    formattedSecret = formattedSecret
      .replace("-----BEGIN EC PRIVATE KEY-----", "-----BEGIN PRIVATE KEY-----")
      .replace("-----END EC PRIVATE KEY-----", "-----END PRIVATE KEY-----");

    // Format the key into proper PEM with newlines
    formattedSecret = `-----BEGIN PRIVATE KEY-----\n${formattedSecret
      .replace("-----BEGIN PRIVATE KEY-----", "")
      .replace("-----END PRIVATE KEY-----", "")
      .replace(/\n/g, "") // Remove any existing line breaks to standardize
      .match(/.{1,64}/g) // PEM typically splits the content every 64 characters
      ?.join("\n")}\n-----END PRIVATE KEY-----\n`;

    return formattedSecret;
  };

  // Function to handle saving the keys (Save Keys button)
  const button_SaveKeys = async () => {
    try {
      info("Saving keys...");
      const store = await load("providers.json");
      const formattedApiSecret = convertApiSecret(apiSecret);
      await store.set("coinbase.configured", true);
      await store.set("coinbase.api_key", apiKey);
      await store.set("coinbase.api_secret", formattedApiSecret);
      await store.save();
      setActionResult("API keys saved successfully.");
      info("API keys saved successfully.");
    } catch (err) {
      handleError(err);
      setActionResult("Failed to save API keys.");
      info("Failed to save API keys.");
    }
  };

  // Function to handle deleting the keys (Delete Keys button)
  const button_DeleteKeys = async () => {
    try {
      info("Deleting keys...");
      const store = await load("providers.json");
      await store.set("coinbase.configured", false);
      await store.set("coinbase.api_key", "");
      await store.set("coinbase.api_secret", "");
      await store.save();
      setActionResult("API keys deleted successfully.");

      // Clear input fields
      setApiKey("");
      setApiSecret("");
      info("API keys deleted successfully.");
    } catch (err) {
      handleError(err);
      setActionResult("Failed to delete API keys.");
      info("Failed to delete API keys.");
    }
  };

  // Function to handle testing the keys (Test Keys button)
  const button_TestKeys = async () => {
    try {
      const response: string = await invoke("connect_coinbase_api");
      info("Response from coinbase_keys_test: " + response);
      setActionResult(response);
    } catch (err) {
      handleError(err);
      setActionResult("Failed to test API keys.");
      info("Failed to test API keys.");
    }
  };

  return (
    <div className={Style.Page_Coinbase_Api}>
      <div className={Style.Top_Container}>
        <div className={Style.Text_Container}>
          <div className={Style.Text_Title}>
            Coinbase API Settings
          </div>
          <p>Coinbase requires your API key and secret to connect.</p>
          <p>You can generate these from the Coinbase Pro website.</p>
          <p>Make sure to keep your secret key secure.</p>
        </div>

        <div className={Style.Result_Container}>
          <div className={Style.Result_Title}>
            Api Permissions
          </div>
          <div>
            {actionResult && (
              <div>

                <pre
                  className={`${Style.Result_Text} ${actionResult.includes("ApiKeyPermissionsResponse") ||
                    actionResult.includes("true")
                    ? Style.success
                    : Style.error
                    }`}
                >
                  {actionResult}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={Style.Bottom_Container}>
        <div className={Style.Input_Container}>
          <label htmlFor="apiKey">API Key</label>
          <input
            type="text"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className={Style.Input}
            autoComplete="off"
            placeholder="Enter your Coinbase API Key"
          />
        </div>

        <div className={Style.Input_Container}>
          <label htmlFor="apiSecret">API Secret</label>
          <input
            type="text"
            id="apiSecret"
            value={apiSecret}
            onChange={(e) => setApiSecret(e.target.value)}
            className={Style.Input}
            autoComplete="off"
            placeholder="Enter your Coinbase API Secret"
          />
        </div>
        <div className={Style.Button_Container}>
          <button onClick={button_SaveKeys} className={Style.Save_Button}>
            Save Keys
          </button>
          <button onClick={button_DeleteKeys} className={Style.Delete_Button}>
            Delete Keys
          </button>
          <button onClick={button_TestKeys} className={Style.Test_Button}>
            Test API
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coinbase_Api;
/* ---------------------------------------------------------------------------------- */

