//! # ChartBuddha
//! Page: Trades Widget
//! Description: Trades widget.
//! ##### dashboard/trades/TradesWidget.tsx
//
// Dependencies
import React, { useState, useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
// Modules
// CSS
import styles from "./TimeSales.module.css";
//
/*--------------------------------------< Type >--------------------------------------*/
type Trade = {
  price: number;
  size: number;
  side: "BUY" | "SELL";
  timestamp: string;
};
/*------------------------------------< Interface >-----------------------------------*/
interface TradesWidgetProps {
  title: string;
  filter: ((trade: Trade) => boolean) | null;
}
/*--------------------------------------< Page >--------------------------------------*/
const TimeSales: React.FC<TradesWidgetProps> = ({ title, filter }) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Listen for the `tradeUpdate` event from Tauri backend
    const unlisten = listen<Trade>("tradeUpdate", (event) => {
      const trade = event.payload;
      setTrades((prev) => [trade, ...prev.slice(0, 99)]); // Keep the latest 100 trades
    });

    // Cleanup the event listener when the component unmounts
    return () => {
      unlisten.then((unsub) => unsub());
    };
  }, []);

  // Apply the filter if provided
  const filteredTrades = filter ? trades.filter(filter) : trades;

  return (
    <div className={styles.Widget}>
      <div className={styles.Header}>{title}</div>
      <div className={styles.TradeList}>
        {filteredTrades.map((trade, index) => (
          <div key={index} className={`${styles.TradeRow} ${styles[trade.side]}`}>
            <span className={styles.Timestamp}>
              {new Date(trade.timestamp).toLocaleTimeString()}
            </span>
            <span className={styles.Side}>{trade.side}</span>
            <span className={styles.Price}>{trade.price.toFixed(2)}</span>
            <span className={styles.Size}>{trade.size}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSales;
/*------------------------------------< End-Code >------------------------------------*/
