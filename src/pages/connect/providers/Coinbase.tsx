//! # ChartBuddha
//! Page: Connect Coinbase
//! Description: Coinbase connect configuration.
//! ##### pages/connect/center/widgets/Coinbase.tsx
//
// Dependencies
import { useState } from "react";
// Modules
import { invoke } from "@tauri-apps/api/core";
import { warn, debug, trace, info, error } from "@tauri-apps/plugin-log";
// CSS
import styles from "./Coinbase.module.css";
//
/*--------------------------------------< Type >--------------------------------------*/
// Define the Props type for ConnectCoinbase
type ConnectCoinbaseProps = object;
// onConfigured: () => void; // Callback for when keys are saved
// onDelete: () => void; // Callback for when keys are deleted
// };
/*--------------------------------------< Page >--------------------------------------*/
// const Coinbase: React.FC<ConnectCoinbaseProps> = ({ onConfigured, onDelete }) => {
const Coinbase: React.FC<ConnectCoinbaseProps> = () => {
  // State for storing API key and secret
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");

  // State for storing the results of Save/Delete actions
  const [actionResult, setActionResult] = useState<string | null>(null);

  // Function to handle saving the keys (Save Keys button)
  const buttonSaveKeys = async () => {
    try {
      const response: string = await invoke("coinbase_save_keys", {
        apiKey: apiKey,
        apiSecret: apiSecret,
      });
      // console.log("Keys saved successfully:", response);
      setActionResult(response); // Display success message
      // onConfigured(); // Notify parent component
      info("Keys saved successfully");
    } catch {
      // console.error("Failed to save keys:", error);
      setActionResult("Failed to save API keys."); // Display error message
      info("Failed to save API keys.");
    }
  };


  // Function to handle deleting the keys (Delete Keys button)
  const buttonDeleteKeys = async () => {
    try {
      await invoke("coinbase_delete_keys");
      console.log("Keys deleted successfully");
      setActionResult("API keys deleted successfully!");

      // Clear input fields
      setApiKey("");
      setApiSecret("");

      // Notify parent of deletion
      // onDelete();
    } catch (error) {
      console.error("Failed to delete keys:", error);
      setActionResult("Failed to delete API keys.");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h2>Coinbase Advanced</h2>
      <div className={styles.textAreaContainer}>
        <p>
          <li>Coinbase requires your API key and secret to connect.</li>
          <li>You can generate these from the Coinbase Pro website.</li>
          <li>Make sure to keep your secret key secure.</li>
        </p>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="apiKey">API Key</label>
        <input
          type="text" // Correct input type
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className={styles.input}
          autoComplete="off"
          placeholder="Enter your Coinbase API Key"
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="apiSecret">API Secret</label>
        <input
          type="text" // Corrected input type
          id="apiSecret"
          value={apiSecret}
          onChange={(e) => setApiSecret(e.target.value)}
          className={styles.input}
          autoComplete="off"
          placeholder="Enter your Coinbase API Secret"
        />
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={buttonSaveKeys} className={styles.testButton}>
          Save Keys
        </button>
        <button onClick={buttonDeleteKeys} className={styles.deleteButton}>
          Delete Keys
        </button>
      </div>

      {actionResult && (
        <div className={styles.resultContainer}>
          <h3>Action Result:</h3>
          <pre
            className={`${styles.resultText} ${actionResult.includes("successfully") ? styles.success : styles.error
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



