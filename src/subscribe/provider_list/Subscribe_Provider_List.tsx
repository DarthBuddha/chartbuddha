//! # Subscribe Provider List
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React from "react";
// Tauri
// import { load } from "@tauri-apps/plugin-store";
import { info, error } from "@tauri-apps/plugin-log";
import { invoke } from "@tauri-apps/api/core";
// Components
import { useSubscriptionContext } from "../interface/Interface_Subscribe";
// CSS Modules
import Style from "./Subscribe_Provider_List.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Subscribe_Provider_List: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useSubscriptionContext();
  console.log(selectedProvider);
  //
  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      error(err.message);
    } else {
      error("An unknown error occurred");
    }
  };
  // Function to handle testing the keys (Test Keys button)
  const coinbase_load_product_list = async () => {
    try {
      const response: string = await invoke("coinbase_load_product_list");
      info("Response from coinbase_load_product_list: " + response);
    } catch (err) {
      handleError(err);

      info("Failed: coinbase_load_product_list.");
    }
  };
  //
  return (
    <div className={Style.Page}>
      <div className={Style.List}>
        <div className={Style.Title}>
          Providers
        </div>
        <div className={Style.List_Content}>
          <li>
            <button onClick={() => {
              setSelectedProvider("coinbase");
              coinbase_load_product_list();
            }}>Coinbase</button>
          </li>
          <li>
            <button onClick={() => setSelectedProvider("binance")}>Binance</button>
          </li>
        </div>
      </div>
    </div>
  );
};
//
export default Subscribe_Provider_List;
/* ---------------------------------------------------------------------------------- */

