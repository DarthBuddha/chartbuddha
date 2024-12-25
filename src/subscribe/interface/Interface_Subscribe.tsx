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
import Subscription_Context, { Subscription_Type } from "./Subscription_Type";
import { Product_Type } from "./Product_Type";
//
/* ---------------------------------------------------------------------------------- */
export const Interface_Subscribe: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product_Type | null>(null);
  //
  return (
    <Subscription_Context.Provider value={{
      selectedProvider, setSelectedProvider,
      selectedProduct, setSelectedProduct
    }}>
      {children}
    </Subscription_Context.Provider>
  );
};
/* ---------------------------------------------------------------------------------- */
export const useSubscriptionContext = (): Subscription_Type => {
  const context = useContext(Subscription_Context);
  if (!context) {
    throw new Error("useSubscriptionContext must be used within a Context_Subscribe_Interface");
  }
  return context;
};
/* ---------------------------------------------------------------------------------- */
