/* ---------------------------------------------------------------------------------------------- */
//! - context/coinbase/products/maintenance/Maintenance.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react';

/* ---------------------------------------------------------------------------------------------- */

export interface MaintenanceType {
  start_time: string; // RFC3339 Timestamp
  end_time: string; // RFC3339 Timestamp
}

const MaintenanceContext = createContext<MaintenanceType | null>(null);

export default MaintenanceContext;

/* ---------------------------------------------------------------------------------------------- */
