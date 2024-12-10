//! # ChartBuddha
//! Page: Connect - Left Panel
//! Description: Displays configured providers.
//! ##### pages/connect/left/Connect_Left.tsx
//
// Dependencies
import React from "react";
// Modules
// CSS
import Styles from "./Connect_Left.module.css";
//
/*------------------------------------< Constant >------------------------------------*/
// Right Panel Component: Displays available providers
// const RightPanel: React.FC<{
//   onProviderSelect: (provider: string) => void;
// }> = ({ onProviderSelect }) => (
//   <div className={ConnectStyle.rightPanel}>
//     <h2>Providers</h2>
//     <ul>
//       <li onClick={() => onProviderSelect("coinbase")}>Coinbase</li>
//       {/* Add more providers here */}
//     </ul>
//   </div>
// );
/*--------------------------------------< Page >--------------------------------------*/
const Connect_Left: React.FC = () => {

  return (
    //     onProviderSelect: (provider: string) => void;
    // }> = ({ onProviderSelect }) => (
    <div className={Styles.LeftPanel}>
      <h2>Configured</h2>
      <ul>
        {/* <li onClick={() => onProviderSelect("coinbase")}>Coinbase</li> */}
        {/* Add more providers here */}
      </ul>
    </div>
  );
};

export default Connect_Left;
/*------------------------------------< End-Code >------------------------------------*/
