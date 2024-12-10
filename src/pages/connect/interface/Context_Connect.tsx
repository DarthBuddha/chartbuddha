//! # ChartBuddha
//! Page: Context_Connect
//! Description: Manages the selected provider state.
//! ##### interface/Context_Connect.tsx
//
// Dependencies
import React, { createContext, useContext, useState, ReactNode } from 'react';
// Modules
// CSS
//
/*------------------------------------< Interface >-----------------------------------*/
interface Context_Connect_Type {
  selectedProvider: string | null;
  setSelectedProvider: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProviderContext = createContext<Context_Connect_Type | null>(null);
/*------------------------------------< Constant >------------------------------------*/
export const Context_Connect: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  return (
    <ProviderContext.Provider value={{ selectedProvider, setSelectedProvider }}>
      {children}
    </ProviderContext.Provider>
  );
};

export const useContext_Connect = (): Context_Connect_Type => {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error("useContext_Connect must be used within a Context_Connect");
  }
  return context;
};
/*------------------------------------< End-Code >------------------------------------*/
