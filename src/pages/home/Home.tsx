/* ---------------------------------------------------------------------------------------------- */
//! - Home.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useEffect } from 'react';
// Tauri
import { invoke } from '@tauri-apps/api/core';
import { info } from '@tauri-apps/plugin-log';
// CSS Modules
import Style from './Home.module.css';

/* ---------------------------------------------------------------------------------------------- */

const Home: React.FC = () => {
  // Initialize websocket on component mount
  useEffect(() => {
    const initializeWebSocket = async () => {
      try {
        await invoke('initialize_websocket_command');
        info('WebSocket initialized');
      } catch (err) {
        info(`Failed to initialize WebSocket: ${err instanceof Error ? err.toString() : String(err)}`);
      }
    };

    initializeWebSocket();
  }, []);

  return (
    <div className={Style.Home}>
      <div className={Style.Main_Container}>
        <h1>Welcome to ChartBuddha</h1>
      </div>
    </div>
  );
};

export default Home;

/* ---------------------------------------------------------------------------------------------- */
