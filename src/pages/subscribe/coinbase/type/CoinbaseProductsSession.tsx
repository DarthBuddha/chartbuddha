/* ---------------------------------------------------------------------------------------------- */
//! - CoinbaseProductsSession.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react';
// Interface
import { CoinbaseProductsMaintenanceType } from './CoinbaseProductsMaintenance';

/* ---------------------------------------------------------------------------------------------- */

export interface CoinbaseProductsSessionType {
  is_session_open: boolean;
  open_time: string; // RFC3339 Timestamp
  close_time: string; // RFC3339 Timestamp
  session_state: string;
  after_hours_order_entry_disabled: boolean;
  closed_reason: string;
  maintenance: CoinbaseProductsMaintenanceType; // Object
}

const CoinbaseProductsSessionContext = createContext<CoinbaseProductsSessionType | null>(null);

export default CoinbaseProductsSessionContext;

/* ---------------------------------------------------------------------------------------------- */
