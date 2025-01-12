/* ---------------------------------------------------------------------------------------------- */
//! - CoinbaseProductsMaintenance.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react';

/* ---------------------------------------------------------------------------------------------- */

export interface CoinbaseProductsMaintenanceType {
  start_time: string; // RFC3339 Timestamp
  end_time: string; // RFC3339 Timestamp
}

const CoinbaseProductsMaintenanceContext = createContext<CoinbaseProductsMaintenanceType | null>(
  null,
);

export default CoinbaseProductsMaintenanceContext;

/* ---------------------------------------------------------------------------------------------- */
