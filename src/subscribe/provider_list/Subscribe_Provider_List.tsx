//! # Subscribe Provider List
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React, { useEffect } from "react";
// Tauri
import { listen } from "@tauri-apps/api/event";
import { info } from "@tauri-apps/plugin-log";
import { invoke } from "@tauri-apps/api/core";
// Components
import { useSubscriptionContext } from "../interface/Interface_Subscribe";
// CSS Modules
import Style from "./Subscribe_Provider_List.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Subscribe_Provider_List: React.FC = () => {
  const { setSelectedProvider } = useSubscriptionContext();

  useEffect(() => {
    const unlisten = listen("coinbase_products_loaded", (event) => {
      info("Event received: " + event.payload);
      // Update the UI here, e.g., render the product list in the center panel
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  const coinbase_load_product_list = async () => {
    try {
      const response: string = await invoke("coinbase_load_product_list");
      info("Response from coinbase_load_product_list: " + response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={Style.Page}>
      <div className={Style.List}>
        <div className={Style.Title}>Providers</div>
        <div className={Style.List_Content}>
          <li>
            <button
              onClick={() => {
                setSelectedProvider("coinbase");
                coinbase_load_product_list();
              }}
            >
              Coinbase
            </button>
          </li>
          <li>
            <button onClick={() => setSelectedProvider("binance")}>
              Binance
            </button>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Subscribe_Provider_List;
/* ---------------------------------------------------------------------------------- */

