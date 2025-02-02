/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Connect - ConnectApiList
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * ConnectApiList component is responsible for rendering the list of available apis.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/connect/ConnectApiList.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Context
import { useAppContext } from 'hooks/useAppContext'
import { PageTabType } from 'interface/InterfaceContext'
// CSS Module
import Style from './css/Connect.module.css'

/* ---------------------------------------------------------------------------------------------- */

const ConnectApiList: React.FC = () => {
  // Context: Interface
  const { setInterface } = useAppContext()

  // Click: Connect Api List
  const handleClick = async (tab: string) => {
    const resetTab = ['Database-Tab', 'Coinbase-Tab']

    // Logic: Set Context
    if (resetTab.includes(tab)) {
      setInterface({
        page: 'Connect',
        page_tab: tab as PageTabType,
        list_type_product: null,
        product_broker: null,
        product_symbol: null,
      })
    }
  }

  return (
    <div className={Style.ConnectApiListComponent}>
      <div className={Style.Header}>Data Source</div>
      <div className={Style.List}>
        <div className={Style.Row} onClick={() => handleClick('Database-Tab')}>
          Database
        </div>
        {/* <div className={Style.Row} onClick={() => handleClick('Binance-Tab')}>
          Binance
        </div> */}
        <div className={Style.Row} onClick={() => handleClick('Coinbase-Tab')}>
          Coinbase
        </div>
      </div>
    </div>
  )
}

export default ConnectApiList

/* ---------------------------------------------------------------------------------------------- */
