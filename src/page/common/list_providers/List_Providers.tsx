//! # List Providers
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React from "react";
// Components
import { useInterface_Context } from "interface/Interface_Context";
// CSS Modules
import Style from "./List_Providers.module.css";
//
/* ---------------------------------------------------------------------------------- */
const List_Providers: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useInterface_Context();
  console.log(selectedProvider);

  return (
    <div className={Style.Page}>
      <div className={Style.Title}>Providers</div>
      <div className={Style.List_Providers}>
        <li>
          <button onClick={() => setSelectedProvider("coinbase")}>Coinbase</button>
        </li>
        <li>
          <button onClick={() => setSelectedProvider("binance")}>Binance</button>
        </li>
        {/* <p>Selected: {selectedProvider}</p> */}
      </div>
    </div>
  );
};

export default List_Providers;
/* ---------------------------------------------------------------------------------- */
