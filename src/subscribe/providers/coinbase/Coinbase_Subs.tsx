//! # ChartBuddha
//!
//! Page: Subscribe_Coinbase
//! Description: Coinbase Subscription Settings.
//!
//! ##### subscribe/providers/Subscribe_Coinbase.tsx
//
// React
import React from "react";
// Tauri
import { load } from "@tauri-apps/plugin-store";
import { info, error } from "@tauri-apps/plugin-log";
import { invoke } from "@tauri-apps/api/core";
// CSS Modules
import Style from "./Coinbase_Subs.module.css";
//
/* ---------------------------------------------------------------------< Component > */
const Subscribe_Coinbase: React.FC = () => {

  // Function to handle saving the keys (Save Keys button)
  const button_Subscribe = async () => {
    try {
      info("Saving keys...");
      // const store = await load("providers.json");
      // const formattedApiSecret = convertApiSecret(apiSecret);
      // await store.set("coinbase.configured", true);
      // await store.set("coinbase.api_key", apiKey);
      // await store.set("coinbase.api_secret", formattedApiSecret);
      // await store.save();
      // setActionResult("API keys saved successfully.");
      info("API keys saved successfully.");
    } catch (err) {
      // handleError(err);
      // setActionResult("Failed to save API keys.");
      info("Failed to save API keys.");
    }
  };

  // Function to handle deleting the keys (Delete Keys button)
  const button_UnSubscribe = async () => {
    try {
      info("Deleting keys...");
      // const store = await load("providers.json");
      // await store.set("coinbase.configured", false);
      // await store.set("coinbase.api_key", "");
      // await store.set("coinbase.api_secret", "");
      // await store.save();
      // setActionResult("API keys deleted successfully.");

      // Clear input fields
      // setApiKey("");
      // setApiSecret("");
      info("API keys deleted successfully.");
    } catch (err) {
      // handleError(err);
      // setActionResult("Failed to delete API keys.");
      info("Failed to delete API keys.");
    }
  };
  return (
    <div className={Style.Component_Coinbase_Subs}>
      <div className={Style.Selected_Product}>
        Current Selected Product
      </div>
      <div className={Style.Settings_Container}>
        Left Side Product Details and settings
      </div>
      {/* <div className={Style.Button_Container}>
        <button onClick={button_Subscribe} className={Style.Subscribe_Button}>
          Subscribe
        </button>
        <button onClick={button_UnSubscribe} className={Style.UnSubscribe_Button}>
          UnSubscribe
        </button>
      </div> */}
    </div>
  );
};
export default Subscribe_Coinbase;
/* ----------------------------------------------------------------------< End-Code > */
