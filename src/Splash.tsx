/* ---------------------------------------------------------------------------------------------- */
//! - Index.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { useEffect } from 'react';
// Tauri
import { info } from '@tauri-apps/plugin-log';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
// Interface
// import { useInterfaceContext } from 'context/InterfaceContext';
// Common
// import MenuBar from './components/menubar/MenuBar';
// import StatusBar from './components/statusbar/StatusBar';
// CSS Module
import Style from './Splash.module.css';

/* ---------------------------------------------------------------------------------------------- */

const Splash: React.FC = () => {
  useEffect(() => {
    const unlisten = listen('backend-setup-complete', () => {
      info('Backend setup complete event received');
      setup();
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return (
    <main className={Style.Splash_Container}>
      <h1>Welcome to ChartBuddha</h1>
    </main>
  );
};

export default Splash;

// Utility function to implement a sleep function in TypeScript
function sleep(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

// Setup function
async function setup() {
  // Fake perform some really heavy setup task
  info('Performing really heavy frontend setup task...');
  await sleep(3);
  info('Frontend setup task complete!');
  // Set the frontend task as being completed
  invoke('set_complete', { task: 'frontend' });
}

/* ---------------------------------------------------------------------------------------------- */
