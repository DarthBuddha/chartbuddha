//! # ChartBuddha
//!
//! Page: Subscription Type
//! Description: Short description of the page.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import { createContext } from "react";
import { Product_Type } from "./Product_Type";
//
/* ---------------------------------------------------------------------------------- */
export interface Subscription_Type {
  selectedProvider: string | null;
  setSelectedProvider: React.Dispatch<React.SetStateAction<string | null>>;
  selectedProduct: Product_Type | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product_Type | null>>;
}
/* ---------------------------------------------------------------------------------- */
const Subscription_Context = createContext<Subscription_Type | null>(null);
//
export default Subscription_Context;
/* ---------------------------------------------------------------------------------- */
