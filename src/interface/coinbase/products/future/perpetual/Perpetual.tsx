/* ------------------------------------------------------------------------------------------------------------------ */
//! - interface.coinbase.products.future.perpetual.Perpetual.tsx
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import { createContext } from 'react';

/* ------------------------------------------------------------------------------------------------------------------ */

export interface PerpetualType {
  open_interest: string;
  funding_rate: string;
  funding_time: string; // RFC3339 Timestamp
  max_leverage: string;
  base_asset_uuid: string;
  underlying_type: string;
}

const PerpetualContext = createContext<PerpetualType | null>(null);

export default PerpetualContext;

/* ------------------------------------------------------------------------------------------------------------------ */
