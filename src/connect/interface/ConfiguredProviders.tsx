//! # ChartBuddha
//!
//! Page: Configured Providers
//! Description: Context for the selected provider.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import { createContext } from "react";
// Tauri
// Components
// CSS Modules
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
