/* ---------------------------------------------------------------------------------------------- */
//! - Type ApiPermissions
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react';

/* ---------------------------------------------------------------------------------------------- */

export interface Type_ApiPermissions {
  can_view: boolean;
  can_trade: boolean;
  can_transfer: boolean;
  portfolio_uuid: string;
  portfolio_type: string;
}

const Context_ProductData = createContext<Type_ApiPermissions | null>(null);

export default Context_ProductData;

/* ---------------------------------------------------------------------------------------------- */