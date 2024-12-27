//! # Subscribe Product Coinbase Product List
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React, { useState } from "react";
// Components
import Coinbase_Product_List_Spot from "./spot/Coinbase_Product_List_Spot";
import Coinbase_Product_List_Futures from "./futures/Coinbase_Product_List_Futures";
import Coinbase_Product_List_Perpetual from "./perpetual/Coinbase_Product_List_Perpetual";
// CSS Modules
import Style from "./Coinbase_Product_List.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Coinbase_Product_List: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("spot");
  //
  const renderActiveWidget = () => {
    switch (activeTab) {
      case "spot":
        return <Coinbase_Product_List_Spot />;
      case "futures":
        return <Coinbase_Product_List_Futures />;
      case "perpetual":
        return <Coinbase_Product_List_Perpetual />;
      default:
        return <Coinbase_Product_List_Spot />;
    }
  };
  //
  return (
    <div className={Style.Page}>
      <div className={Style.NavMenu}>
        <button
          className={`${Style.NavButton} ${activeTab === "spot" ? Style.Active : ""
            }`}
          onClick={() => setActiveTab("spot")}
        >
          Spot
        </button>
        <button
          className={`${Style.NavButton} ${activeTab === "futures" ? Style.Active : ""
            }`}
          onClick={() => setActiveTab("futures")}
        >
          Futures
        </button>
        <button
          className={`${Style.NavButton} ${activeTab === "perpetual" ? Style.Active : ""
            }`}
          onClick={() => setActiveTab("perpetual")}
        >
          Perps
        </button>
      </div>
      <div>{renderActiveWidget()}</div>
    </div>
  );
};
//
export default Coinbase_Product_List;
/* ---------------------------------------------------------------------------------- */
