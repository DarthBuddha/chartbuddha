//! # Connect Provider List
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React from "react";
// Components
import { useProviderContext } from "../interface/Interface_Connect";
// CSS Modules
import Style from "./Connect_Provider_List.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Connect_Provider_List: React.FC = () => {
  const { selectedProvider, setSelectedProvider } = useProviderContext();
  console.log(selectedProvider);
  //
  return (
    <div className={Style.Page}>
      <div className={Style.Title}>Providers</div>
      <div className={Style.List}>
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
//
export default Connect_Provider_List;
/* ---------------------------------------------------------------------------------- */
