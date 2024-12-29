//! # Interface
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React, { useState, ReactNode } from "react";
// Components
import Interface_Context from "./Interface_Context_Type";
import { Product_Type } from "./type/Product_Type";
//
/* ---------------------------------------------------------------------------------- */
//
export const Interface: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product_Type | null>(null);
  //
  return (
    <Interface_Context.Provider value={{
      selectedProvider, setSelectedProvider,
      selectedProduct, setSelectedProduct
    }}>
      {children}
    </Interface_Context.Provider>
  );
};
//
/* ---------------------------------------------------------------------------------- */
