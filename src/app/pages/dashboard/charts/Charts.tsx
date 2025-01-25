/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! - pages/dashboard/trades/Charts.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
import Split from 'react-split'
// Components
import ChartsChart from './ChartsChart'
// CSS Modules
import Style from './Chart.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Charts: React.FC = () => {
  /* -------------------------------------------------------------------------------------------- */
  return (
    <div className={Style.Page}>
      <Split
        className={Style.Container_Chart}
        sizes={[80, 10, 10]}
        minSize={100}
        expandToMin={true}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={10}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <div className={Style.Panel_Chart}>
          <h3>Chart</h3>
          <ChartsChart />
        </div>
        <div className={Style.Panel_OrderBook}>
          <h3>Order Book</h3>
          {/* <OrderBook /> */}
        </div>
        <div className={Style.Panel_Volume}>
          <h3>Volume</h3>
          {/* <Volume /> */}
        </div>
      </Split>
    </div>
  )
}

export default Charts

/* ---------------------------------------------------------------------------------------------- */
