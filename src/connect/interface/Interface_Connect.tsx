//! # ChartBuddha
//!
//! Page: Interface Connect
//! Description: Context for the selected provider.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import React, { useContext, useState, ReactNode } from "react";
// Tauri
// Components
import ProviderContext, { ProviderContext_Type } from "./ProviderContext";
// CSS Modules
//
/* ---------------------------------------------------------------------------------- */
export const Interface_Connect: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  //
  return (
    <ProviderContext.Provider value={{ selectedProvider, setSelectedProvider }}>
      {children}
    </ProviderContext.Provider>
  );
};
/* ---------------------------------------------------------------------------------- */
export const useProviderContext = (): ProviderContext_Type => {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error("useProviderContext must be used within a Context_Connect_Interface");
  }
  return context;
};
/* ---------------------------------------------------------------------------------- */
