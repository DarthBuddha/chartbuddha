//! # ChartBuddha
//!
//! Page: Coinbase Spot Products
//! Description: Displays a list of Coinbase Spot products.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import React, { useState, useEffect } from "react";
// Tauri
import { load } from "@tauri-apps/plugin-store";
import { info, error } from "@tauri-apps/plugin-log";
// Components
import { useProviderContext } from "../../../../../interface/Interface_Subscribe";
// CSS Modules
import Style from "./Coinbase_Products.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Coinbase_Spot: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useProviderContext();
  console.log(selectedProvider);
  //
  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      error(err.message);
    } else {
      error("An unknown error occurred");
    }
  };
  //
  // Load the API key and secret from the store when the component mounts
  useEffect(() => {
    const loadKeys = async () => {
      info("Loading Api Key...");
      try {
        const store_coinbase_products = await load("coinbase_products.json");

        // const savedApiKey = await store.get<string>("coinbase.api_key");

        // const savedApiSecret = await store.get<string>("coinbase.api_secret");

      } catch (err) {
        handleError(err);
      }
    };
    loadKeys();
  }, []);
  //
  return (
    <div className={Style.Page}>
      <div className={Style.List}>
        <div className={Style.List_Content}>
          {/* <li>
            <button onClick={() => setSelectedProvider("coinbase")}>Coinbase</button>
          </li>
          <li>
            <button onClick={() => setSelectedProvider("binance")}>Binance</button>
          </li> */}
        </div>
      </div>
    </div>
  );
};
//
export default Coinbase_Spot;
/* ---------------------------------------------------------------------------------- */
