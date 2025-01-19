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
    await invoke('cmd_app_setup', { task: 'frontend' });
    info('Frontend setup marked as complete.');
  } catch (err) {
    info(`Setup failed: ${err instanceof Error ? err.toString() : String(err)}`);
  }
}

// Listen for the backend setup completion event
listen('backend-setup-complete', async () => {
  info('Backend setup complete event received.');
  // Perform any additional frontend setup tasks here
  await setup();
  info('Setup Complete.');
});

/* ---------------------------------------------------------------------------------------------- */
