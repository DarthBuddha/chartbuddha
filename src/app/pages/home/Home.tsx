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
