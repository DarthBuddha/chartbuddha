//! # ChartBuddha
//!
//! Page: Context_Connect_Interface
//! Description: Manages the selected provider state.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import React, { useContext, useState, ReactNode } from "react";
// Components
import ProviderContext, { ProviderContext_Type } from "./ProviderContext";
//
/* ---------------------------------------------------------------------------------- */
export const Interface_Subscribe: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

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
    throw new Error("useProviderContext must be used within a Context_Subscribe_Interface");
  }
  return context;
};
/* ---------------------------------------------------------------------------------- */
