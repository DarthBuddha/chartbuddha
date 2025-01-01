//! # Provider Type
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import { createContext } from 'react';
// Interface
import { Product_Type } from './Product_Type';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export interface Provider_Type {
  selectedProvider: string | null;
  setSelectedProvider: React.Dispatch<React.SetStateAction<string | null>>;
  selectedProduct: Product_Type | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product_Type | null>>;
  productData: Product_Type | null;
  fetchProductData: () => void;
  subscribeToProduct: (product: Product_Type | null) => Promise<void>;
  unsubscribeFromProduct: (product: Product_Type | null) => Promise<void>;
}
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Provider_Context = createContext<Provider_Type | null>(null);

export default Provider_Context;
//
/* ------------------------------------------------------------------------------------------------------------------ */
