//! # ChartBuddha
//! Page: Context_Connect_Interface
//! Description: Manages the selected provider state.
//! ##### pages/connect/interface/Context_Connect_Interface.tsx
//
// Dependencies
import React, { useContext, useState, ReactNode } from "react";
import ProviderContext, { ProviderContext_Type } from "./ProviderContext";
// Modules
// CSS
//
/*------------------------------------< Constant >------------------------------------*/
export const Context_Connect_Interface: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  return (
    <ProviderContext.Provider value={{ selectedProvider, setSelectedProvider }}>
      {children}
    </ProviderContext.Provider>
  );
};

export const useProviderContext = (): ProviderContext_Type => {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error("useProviderContext must be used within a Context_Connect_Interface");
  }
  return context;
};
/*------------------------------------< End-Code >------------------------------------*/
