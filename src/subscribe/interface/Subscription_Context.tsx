//! # ChartBuddha
//!
//! Page: Subscription_Context
//! Description: Short description of the page.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import { createContext } from "react";
import { Product_Type } from "./Product_Type";
//
/* ---------------------------------------------------------------------------------- */
export interface Subscription_Context_Type {
  selectedProvider: string | null;
  setSelectedProvider: React.Dispatch<React.SetStateAction<string | null>>;
  selectedProduct: Product_Type | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product_Type | null>>;
}
/* ---------------------------------------------------------------------------------- */
const SubscriptionContext = createContext<Subscription_Context_Type | null>(null);
//
export default SubscriptionContext;
/* ---------------------------------------------------------------------------------- */
