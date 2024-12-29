//! # Subscribe Product Coinbase Product List
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React, { useState } from "react";
// Components
import Coinbase_Product_List_Spot from "./Coinbase_Product_List_Spot";
import Coinbase_Product_List_Futures from "./Coinbase_Product_List_Futures";
import Coinbase_Product_List_Perpetual from "./Coinbase_Product_List_Perpetual";
// CSS Modules
import Style from "./Coinbase_Product_List.module.css";
//
/* ---------------------------------------------------------------------------------- */
// useEffect(() => {
//   const unlisten = listen("coinbase_products_loaded", (event) => {
//     info("Event received: " + event.payload);
//     // Update the UI here, e.g., render the product list in the center panel
//   });

//   return () => {
//     unlisten.then((f) => f());
//   };
// }, []);

// const coinbase_load_product_list = async () => {
//   try {
//     const response: string = await invoke("coinbase_list_products");
//     info("Response from coinbase_load_product_list: " + response);
//   } catch (err) {
//     console.error(err);
//   }
// };
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
