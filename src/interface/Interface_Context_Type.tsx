//! # Interface Context Type
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import { createContext } from "react";
// Components
import { Product_Type } from "./type/Product_Type";
//
/* ---------------------------------------------------------------------------------- */
//
export interface Interface_Context_Type {
  selectedProvider: string | null;
  setSelectedProvider: React.Dispatch<React.SetStateAction<string | null>>;
  selectedProduct: Product_Type | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product_Type | null>>;
}
//
/* ---------------------------------------------------------------------------------- */
//
export const Interface_Context = createContext<Interface_Context_Type | null>(null);

export default Interface_Context;
//
/* ---------------------------------------------------------------------------------- */
