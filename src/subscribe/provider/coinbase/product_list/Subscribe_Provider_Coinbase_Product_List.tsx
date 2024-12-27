//! # Subscribe Product Coinbase Product List
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React, { useState } from "react";
// Components
import Coinbase_Spot from "./spot/Subscribe_Provider_Coinbase_Product_List_Spot";
import Coinbase_Futures from "./futures/Subscribe_Provider_Coinbase_Product_List_Futures";
import Coinbase_Perpetual from "./perpetual/Subscribe_Provider_Coinbase_Product_List_Perpetual";
// CSS Modules
import Style from "./Subscribe_Provider_Coinbase_Product_List.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Subscribe_Product_Coinbase_Product_List: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("spot");
  //
  const renderActiveWidget = () => {
    switch (activeTab) {
      case "spot":
        return <Coinbase_Spot />;
      case "futures":
        return <Coinbase_Futures />;
      case "perpetual":
        return <Coinbase_Perpetual />;
      default:
        return <Coinbase_Spot />;
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
export default Subscribe_Product_Coinbase_Product_List;
/* ---------------------------------------------------------------------------------- */
