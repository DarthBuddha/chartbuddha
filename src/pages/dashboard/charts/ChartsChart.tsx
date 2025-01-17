// ------------------------------------------------------------------------------------------------------------------ //
//! - pages/dashboard/charts/ChartsChart.tsx
// ------------------------------------------------------------------------------------------------------------------ //

// React
// Tauri
import { listen } from '@tauri-apps/api/event';
// import { info, error } from '@tauri-apps/plugin-log';
// Components
// CSS Modules

/* ------------------------------------------------------------------------------------------------------------------ */

listen('coinbase-data', (event) => {
  console.log('Received data:', event.payload);
  // Update your UI with the received data
});

/* ------------------------------------------------------------------------------------------------------------------ */
