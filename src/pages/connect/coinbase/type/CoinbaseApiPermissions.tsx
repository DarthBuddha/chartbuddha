/* ---------------------------------------------------------------------------------------------- */
//! - CoinbaseApiPermissions
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react';

/* ---------------------------------------------------------------------------------------------- */

export interface ApiPermissionsType {
  perm_can_view: boolean;
  perm_can_trade: boolean;
  perm_can_transfer: boolean;
  perm_portfolio_uuid: string;
  perm_portfolio_type: string;
}

const ApiPermissionsContext = createContext<ApiPermissionsType | null>(null);

export default ApiPermissionsContext;

/* ---------------------------------------------------------------------------------------------- */
