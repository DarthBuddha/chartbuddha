/* ------------------------------------------------------------------------------------------------------------------ */
//! - interface.coinbase.products.session.Session.tsx
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import { createContext } from 'react';
// Components
import { MaintenanceType } from './maintenance/Maintenance';

/* ------------------------------------------------------------------------------------------------------------------ */

export interface SessionType {
  is_session_open: boolean;
  open_time: string; // RFC3339 Timestamp
  close_time: string; // RFC3339 Timestamp
  session_state: string;
  after_hours_order_entry_disabled: boolean;
  closed_reason: string;
  maintenance: MaintenanceType; // Object
}

const SessionContext = createContext<SessionType | null>(null);

export default SessionContext;

/* ------------------------------------------------------------------------------------------------------------------ */
