//! # ChartBuddha
//!
//! Page: Product Type
//! Description: Short description of the page.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import { createContext } from "react";
//
/* ---------------------------------------------------------------------------------- */
export interface Product_Type {
  display_name: string;
  price: string;
  price_percentage_change_24h: string;
  status: string;
  volume_24h: string;
  volume_percentage_change_24h: string;
  // Add other properties as needed
}
/* ---------------------------------------------------------------------------------- */
const Product_Context = createContext<Product_Type | null>(null);
//
export default Product_Context;
/* ---------------------------------------------------------------------------------- */
