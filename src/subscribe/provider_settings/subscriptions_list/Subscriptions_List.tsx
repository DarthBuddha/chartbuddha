//! # ChartBuddha
//!
//! Component: Subscriptions List
//! Description: List of Subscriptions.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import React from "react";
// Tauri
// import { load } from "@tauri-apps/plugin-store";
import { info, error } from "@tauri-apps/plugin-log";
// import { invoke } from "@tauri-apps/api/core";
// Components
import { useSubscriptionContext } from "../../interface/Interface_Subscribe";
// CSS Modules
import Style from "./Subscriptions_List.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Subscriptions_List: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useSubscriptionContext();
  console.log(selectedProvider);
  //
  const { selectedProduct, setSelectedProduct } = useSubscriptionContext();
  console.log(selectedProduct);
  //
  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      error(err.message);
    } else {
      error("An unknown error occurred");
    }
  };
  //
  // Function to handle saving the keys (Save Keys button)
  const Subscribe_Button = async () => {
    try {
      info("Saving keys...");
      // const store = await load("providers.json");
      // const formattedApiSecret = convertApiSecret(apiSecret);
      // await store.set("coinbase.configured", true);
      // await store.set("coinbase.api_key", apiKey);
      // await store.set("coinbase.api_secret", formattedApiSecret);
      // await store.save();
      // setActionResult("API keys saved successfully.");
      // info("API keys saved successfully.");
    } catch (err) {
      handleError(err);
      // setActionResult("Failed to save API keys.");
      info("Failed to save API keys.");
    }
  };
  // Function to handle deleting the keys (Delete Keys button)
  const UnSubscribe_Button = async () => {
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
      handleError(err);
      // setActionResult("Failed to delete API keys.");
      info("Failed to delete API keys.");
    }
  };
  //
  return (
    <div className={Style.Page}>
      <div className={Style.Title}>Subscriptions</div>
      <div className={Style.Subscription_List}>
        Subscriptions
      </div>
      <div className={Style.Button_Container}>
        <button onClick={Subscribe_Button} className={Style.Subscribe_Button}>
          Subscribe
        </button>
        <button onClick={UnSubscribe_Button} className={Style.UnSubscribe_Button}>
          UnSubscribe
        </button>
      </div>
    </div>
  );
};
//
export default Subscriptions_List;
/* ---------------------------------------------------------------------------------- */
