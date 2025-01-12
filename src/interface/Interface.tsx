/* ------------------------------------------------------------------------------------------------------------------ */
//! - interface.Interface.tsx
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import { createContext } from 'react';
// Interface
import { PermissionsType } from './coinbase/api/permissions/Permissions';

/* ------------------------------------------------------------------------------------------------------------------ */

// Global State Management
export interface InterfaceType {
  // Global Context
  selPage: string | null;
  setPage: React.Dispatch<React.SetStateAction<string | null>>;
  selApi: string | null;
  setApi: React.Dispatch<React.SetStateAction<string | null>>;
  // Coinbase Context
  selCoinbaseApiKey: string | null;
  setCoinbaseApiKey: React.Dispatch<React.SetStateAction<string | null>>;
  selCoinbaseApiSecret: string | null;
  setCoinbaseApiSecret: React.Dispatch<React.SetStateAction<string | null>>;
  selCoinbaseApiPermissions: PermissionsType | null;
  setCoinbaseApiPermissions: React.Dispatch<React.SetStateAction<PermissionsType | null>>;
  // selCoinbaseApi: CoinbaseType | null;
  // setCoinbaseApi: React.Dispatch<React.SetStateAction<CoinbaseType | null>>;
  // selCoinbaseProductType: string | null;
  // setCoinbaseProductType: React.Dispatch<React.SetStateAction<string | null>>;
  // selCoinbaseProductList: InterfaceType | null;
  // setCoinbaseProductList: React.Dispatch<React.SetStateAction<InterfaceType | null>>;
  // selCoinbaseProductName: string | null;
  // setCoinbaseProductName: React.Dispatch<React.SetStateAction<string | null>>;
}

const InterfaceContext = createContext<InterfaceType | null>(null);

export default InterfaceContext;

/* ------------------------------------------------------------------------------------------------------------------ */
