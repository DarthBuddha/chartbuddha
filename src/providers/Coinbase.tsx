//! # ChartBuddha
//!
//! Page: Connect Coinbase
//! Description: Coinbase connect configuration.
//!
//! ##### pages/connect/center/widgets/Coinbase.tsx
//
// React
import React, { useState, useEffect } from "react";
// Tauri
import { load } from "@tauri-apps/plugin-store";
import { info, error } from "@tauri-apps/plugin-log";
import { invoke } from "@tauri-apps/api/core";
// CSS
import Styles from "./Coinbase.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const Coinbase: React.FC = () => {
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
    info("Loading keys...");
    const loadKeys = async () => {
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
      const response: string = await invoke("coinbase_keys_test");
      info("Response from coinbase_keys_test: " + response);
      setActionResult(response);
    } catch (err) {
      handleError(err);
      setActionResult("Failed to test API keys.");
      info("Failed to test API keys.");
    }
  };

  return (
    <div className={Styles.Coinbase}>
      <div className={Styles.Text_Container}>
        <p>
          <li>Coinbase requires your API key and secret to connect.</li>
          <li>You can generate these from the Coinbase Pro website.</li>
          <li>Make sure to keep your secret key secure.</li>
        </p>
      </div>

      <div className={Styles.Input_Container}>
        <label htmlFor="apiKey">API Key</label>
        <input
          type="text"
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className={Styles.Input}
          autoComplete="off"
          placeholder="Enter your Coinbase API Key"
        />
      </div>

      <div className={Styles.Input_Container}>
        <label htmlFor="apiSecret">API Secret</label>
        <input
          type="text"
          id="apiSecret"
          value={apiSecret}
          onChange={(e) => setApiSecret(e.target.value)}
          className={Styles.Input}
          autoComplete="off"
          placeholder="Enter your Coinbase API Secret"
        />
      </div>

      <div className={Styles.Button_Container}>
        <button onClick={button_SaveKeys} className={Styles.Save_Button}>
          Save Keys
        </button>
        <button onClick={button_DeleteKeys} className={Styles.Delete_Button}>
          Delete Keys
        </button>
        <button onClick={button_TestKeys} className={Styles.Test_Button}>
          Test Keys
        </button>
      </div>

      {actionResult && (
        <div className={Styles.Result_Container}>
          <h3>Action Result:</h3>
          <pre
            className={`${Styles.Result_Text} ${actionResult.includes("ApiKeyPermissionsResponse") ||
              actionResult.includes("successfully")
              ? Styles.success
              : Styles.error
              }`}
          >
            {actionResult}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Coinbase;
/*------------------------------------< End-Code >------------------------------------*/

