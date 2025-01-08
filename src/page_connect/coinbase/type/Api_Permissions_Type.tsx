/* ---------------------------------------------------------------------------------------------- */
//! - Type ApiPermissions
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react';

/* ---------------------------------------------------------------------------------------------- */

export interface Api_Permissions_Type {
  perm_can_view: boolean;
  perm_can_trade: boolean;
  perm_can_transfer: boolean;
  perm_portfolio_uuid: string;
  perm_portfolio_type: string;
}

const Context_ApiPermissions = createContext<Api_Permissions_Type | null>(null);

export default Context_ApiPermissions;

/* ---------------------------------------------------------------------------------------------- */
