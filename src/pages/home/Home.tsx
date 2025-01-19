/* ---------------------------------------------------------------------------------------------- */
//! - pages/Home.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react';
// import { useEffect } from 'react';
// Tauri
// import { invoke } from '@tauri-apps/api/core';
// import { info } from '@tauri-apps/plugin-log';
// CSS Modules
import Style from './Home.module.css';

/* ---------------------------------------------------------------------------------------------- */

const Home: React.FC = () => {
  // Initialize websocket on component mount
  // useEffect(() => {
  //   const initializeWebSocket = async () => {
  //     try {
  //       await invoke('init_websocket_cmd');
  //       info('WebSocket initialized');
  //     } catch (err) {
  //       info(
  //         `Failed to initialize WebSocket: ${err instanceof Error ? err.toString() : String(err)}`,
  //       );
  //     }
  //   };

  //   initializeWebSocket();
  // });

  // const stopAllStreams = async () => {
  //   try {
  //     await invoke('stop_all_active_streams_command');
  //     info('All active streams stopped');
  //   } catch (err) {
  //     info(
  //       `Failed to stop all active streams: ${err instanceof Error ? err.toString() : String(err)}`,
  //     );
  //   }
  // };

  return (
    <div className={Style.Home}>
      <div className={Style.Main_Container}>
        <h1>Welcome to ChartBuddha</h1>
        {/* <button onClick={stopAllStreams}>Stop All Streams</button> */}
      </div>
    </div>
  );
};

export default Home;

/* ---------------------------------------------------------------------------------------------- */
