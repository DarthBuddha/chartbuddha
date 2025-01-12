/* ------------------------------------------------------------------------------------------------------------------ */
//! - interface.coinbase.api.permissions.Permissions.tsx
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import { createContext } from 'react';

/* ------------------------------------------------------------------------------------------------------------------ */

export interface PermissionsType {
  perm_can_view: boolean;
  perm_can_trade: boolean;
  perm_can_transfer: boolean;
  perm_portfolio_uuid: string;
  perm_portfolio_type: string;
}

const PermissionsContext = createContext<PermissionsType | null>(null);

export default PermissionsContext;

/* ------------------------------------------------------------------------------------------------------------------ */
