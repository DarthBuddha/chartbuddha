//! # Provider Context
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import { createContext } from "react";
//
/* ---------------------------------------------------------------------------------- */
export interface ProviderContext_Type {
  selectedProvider: string | null;
  setSelectedProvider: React.Dispatch<React.SetStateAction<string | null>>;
}
/* ---------------------------------------------------------------------------------- */
const ProviderContext = createContext<ProviderContext_Type | null>(null);
//
export default ProviderContext;
/* ---------------------------------------------------------------------------------- */
