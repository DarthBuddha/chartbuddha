//! # Subscribe Product Coinbase
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React from "react";
import Split from "react-split";
// Components
import Coinbase_Product from "./product/Coinbase_Product";
import Coinbase_Product_List from "./product_list/Coinbase_Product_List";
// CSS Modules
import Style from "./Coinbase_Subscribe.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Coinbase_Subscribe: React.FC = () => {
  //
  return (
    <div className={Style.Page}>
      <Split className={Style.Split}
        sizes={[90, 10]}
        minSize={[400, 400]}
        // maxSize={400}
        expandToMin={true}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={20}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <div className={Style.Coinbase_Product}>
          <Coinbase_Product />
        </div>
        <div className={Style.Coinbase_Product_List}>
          <Coinbase_Product_List />
        </div>
      </Split>
    </div>
  );
};
//
export default Coinbase_Subscribe;
/* ---------------------------------------------------------------------------------- */
