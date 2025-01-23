/* ---------------------------------------------------------------------------------------------- */
//! - context/coinbase/data_api/permissions/Permissions.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react'

/* ---------------------------------------------------------------------------------------------- */

export interface PermissionsType {
  can_view: boolean
  can_trade: boolean
  can_transfer: boolean
  portfolio_uuid: string
  portfolio_type: string
}

const PermissionsContext = createContext<PermissionsType | null>(null)

export default PermissionsContext

/* ---------------------------------------------------------------------------------------------- */
