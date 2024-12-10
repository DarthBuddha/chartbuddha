//! # ChartBuddha
//! Page: Dashboard_Left
//! Description: Left Panel of the Dashboard.
//! ##### page/dashboard/left/Dashboard_Left.tsx
//
// Dependencies
import React, { useState } from "react";
// Modules
import WatchList from "./products/WatchList";
import Spot from "./products/Spot";
import Futures from "./products/Futures";
import Perpetual from "./products/Perpetual";
// CSS
import Styles from "./Dashboard_Left.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const ConnectLeftPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("watchlist");

  const renderActiveWidget = () => {
    switch (activeTab) {
      case "watchlist":
        return <WatchList />;
      case "spot":
        return <Spot />;
      case "futures":
        return <Futures />;
      case "perpetual":
        return <Perpetual />;
      default:
        return <WatchList />;
    }
  };

  return (
    <div className={Styles.Dashboard_Left}>
      <div className={Styles.NavMenu}>
        <button
          className={`${Styles.NavButton} ${activeTab === "watchlist" ? Styles.Active : ""
            }`}
          onClick={() => setActiveTab("watchlist")}
        >
          Watchlist
        </button>
        <button
          className={`${Styles.NavButton} ${activeTab === "spot" ? Styles.Active : ""
            }`}
          onClick={() => setActiveTab("spot")}
        >
          Spot
        </button>
        <button
          className={`${Styles.NavButton} ${activeTab === "futures" ? Styles.Active : ""
            }`}
          onClick={() => setActiveTab("futures")}
        >
          Futures
        </button>
        <button
          className={`${Styles.NavButton} ${activeTab === "perpetual" ? Styles.Active : ""
            }`}
          onClick={() => setActiveTab("perpetual")}
        >
          Perps
        </button>
      </div>
      <div className={Styles.WidgetContainer}>{renderActiveWidget()}</div>
    </div>
  );
};

export default ConnectLeftPanel;
/*------------------------------------< End-Code >------------------------------------*/
