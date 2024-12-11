//! # ChartBuddha
//! Page: Connect - Center Panel
//! Description: Displays settings for the selected provider.
//! ##### pages/connect/center/Connect_Center.tsx
//
// Dependencies
// import { invoke } from "@tauri-apps/api/core";
import React from "react";
// Modules
import Coinbase from "./providers/Coinbase";
import { useContext_Connect } from "./interface/Context_Connect";
// CSS
import Styles from "./Connect_Center.module.css";
//
/*------------------------------------< Constant >------------------------------------*/
// Fetch configured providers from the backend
// const fetchConfiguredProviders = async (): Promise<string[]> => {
//   try {
//     return await invoke("get_configured_providers");
//   } catch (error) {
//     console.error("Failed to fetch configured providers:", error);
//     return [];
//   }
// };
/*--------------------------------------< Page >--------------------------------------*/
const Connect_Center: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useContext_Connect();
  // onProviderConfigured: (provider: string) => void;
  // onProviderDeleted: (provider: string) => void; // Add callback for deletion

  if (!selectedProvider) {
    return (
      <div className={Styles.Connect_Center}>
        <h1>Select a provider to configure settings.</h1>
      </div>
    );
  }

  switch (selectedProvider?.toLowerCase()) {
    case "coinbase":
      return (
        <div className={Styles.Connect_Center}>
          <Coinbase
            onConfigured={() => onProviderConfigured("coinbase")}
            onDelete={() => onProviderDeleted("coinbase")} // Pass deletion callback
          />
        </div>

      );
    default:
      return (
        <div className={Styles.Connect_Center}>
          <h1>{selectedProvider} is not supported yet.</h1>
        </div>
      );
  }
};

export default Connect_Center;
/*------------------------------------< End-Code >------------------------------------*/
