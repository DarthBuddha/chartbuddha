/* ---------------------------------------------------------------------------------------------- */
//! - Main.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Tauri
import { info } from '@tauri-apps/plugin-log';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
// Index
import Index from './Index';
// Interface
import { InterfaceProvider } from 'context/InterfaceProvider';

/* ---------------------------------------------------------------------------------------------- */

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <InterfaceProvider>
      <Index />
    </InterfaceProvider>
  </StrictMode>,
);

// Utility function to implement a sleep function in TypeScript
function sleep(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

// Setup function
async function setup() {
  try {
    info('Starting frontend setup...');
    // Fake perform some really heavy setup task
    info('Performing really heavy frontend setup task...');
    await sleep(3);
    info('Frontend setup task complete!');
    // Set the frontend task as being completed
    await invoke('set_complete', { task: 'frontend' });
    info('Frontend setup marked as complete.');
  } catch (err) {
    info(`Setup failed: ${err instanceof Error ? err.toString() : String(err)}`);
  }
}

// function initialize() {
//   info('Initializing application...');
//   setup()
//     .then(() => {
//       info('Setup function executed.');
//     })
//     .catch((err) => {
//       info(`Setup function failed: ${err instanceof Error ? err.toString() : String(err)}`);
//     });
// }

// if (document.readyState === 'loading') {
//   window.addEventListener('DOMContentLoaded', () => {
//     info('DOMContentLoaded event fired.');
//     initialize();
//   });
// } else {
//   info('Document already loaded.');
//   initialize();
// }

// // Alternative event listener for the 'load' event
// window.addEventListener('load', () => {
//   info('Load event fired.');
//   initialize();
// });

// Listen for the backend setup completion event
listen('backend-setup-complete', () => {
  // Perform any additional frontend setup tasks here
  setup();
  info('Backend setup is complete.');
});

/* ---------------------------------------------------------------------------------------------- */
