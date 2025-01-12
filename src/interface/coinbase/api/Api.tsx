/* ------------------------------------------------------------------------------------------------------------------ */
//! - interface.coinbase.api.Api.tsx
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import { createContext } from 'react';
// Components
import { PermissionsType } from './permissions/Permissions';

/* ------------------------------------------------------------------------------------------------------------------ */

export interface ApiType {
  api_key: boolean;
  api_secret: boolean;
  api_permissions: PermissionsType;
}

const ApiContext = createContext<ApiType | null>(null);

export default ApiContext;

/* ------------------------------------------------------------------------------------------------------------------ */
