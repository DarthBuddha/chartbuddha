//! # ChartBuddha
//!
//! Page: Page Name
//! Description: Short description of the page.
//!
//! ##### FileName.tsx
//
// Dependencies
import { createContext } from "react";
// Modules
// CSS
//
/*------------------------------------< Interface >-----------------------------------*/
export interface ProviderContext_Type {
  selectedProvider: string | null;
  setSelectedProvider: React.Dispatch<React.SetStateAction<string | null>>;
}
/*------------------------------------< Constant >------------------------------------*/
const ProviderContext = createContext<ProviderContext_Type | null>(null);

export default ProviderContext;
/*------------------------------------< End-Code >------------------------------------*/
