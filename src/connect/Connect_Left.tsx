//! # ChartBuddha
//!
//! Page: Connect - Left Panel
//! Description: Displays configured providers.
//!
//! ##### pages/connect/left/Connect_Left.tsx
//
// React
import React, { useState, useEffect } from "react";
import { load } from "@tauri-apps/plugin-store";
// Local
import { useProviderContext } from "./interface/Connect_Interface";
// CSS
import Styles from "./Connect_Left.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const Connect_Left: React.FC = () => {
  const { setSelectedProvider } = useProviderContext();
  const [configuredProviders, setConfiguredProviders] = useState<string[]>([]);

  useEffect(() => {
    const fetchConfiguredProviders = async () => {
      try {
        const store = await load("providers.json");
        const coinbaseConfigured = await store.get<boolean>("coinbase.configured");
        const binanceConfigured = await store.get<boolean>("binance.configured");

        const providers = [];
        if (coinbaseConfigured) providers.push("coinbase");
        if (binanceConfigured) providers.push("binance");

        setConfiguredProviders(providers);
      } catch (error) {
        console.error("Failed to fetch configured providers:", error);
      }
    };

    fetchConfiguredProviders();
  }, []);

  return (
    <div className={Styles.Connect_Left}>
      <h2>Configured Providers</h2>
      <ul>
        {configuredProviders.includes("coinbase") && (
          <li>
            <button onClick={() => setSelectedProvider("coinbase")}>Coinbase</button>
          </li>
        )}
        {configuredProviders.includes("binance") && (
          <li>
            <button onClick={() => setSelectedProvider("binance")}>Binance</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Connect_Left;
/*------------------------------------< End-Code >------------------------------------*/
