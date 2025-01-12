/* ---------------------------------------------------------------------------------------------- */
//! - CoinbaseApi.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react';
// Interface
import { CoinbaseApiPermissionsType } from './api/Permissions';

/* ---------------------------------------------------------------------------------------------- */

export interface CoinbaseApiType {
  api_key: string;
  api_secret: string;
  api_permissions: CoinbaseApiPermissionsType;
}

const CoinbaseApiContext = createContext<CoinbaseApiType | null>(null);

export default CoinbaseApiContext;

/* ---------------------------------------------------------------------------------------------- */
