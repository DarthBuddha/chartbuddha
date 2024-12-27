//! # Subscribe Product Coinbase
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React from "react";
import Split from "react-split";
// Components
import Subscribe_Product_Coinbase_Product from "./product/Subscribe_Product_Coinbase_Product";
import Subscribe_Product_Coinbase_Product_List from "./product_list/Subscribe_Provider_Coinbase_Product_List";
// CSS Modules
import Style from "./Subscribe_Provider_Coinbase.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Subscribe_Product_Coinbase: React.FC = () => {
  //
  return (
    <div className={Style.Page}>
      <Split className={Style.Split}
        sizes={[90, 10]}
        minSize={[400, 200]}
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
          <Subscribe_Product_Coinbase_Product />
        </div>
        <div className={Style.Coinbase_Product_List}>
          <Subscribe_Product_Coinbase_Product_List />
        </div>
      </Split>
    </div>
  );
};
//
export default Subscribe_Product_Coinbase;
/* ---------------------------------------------------------------------------------- */
