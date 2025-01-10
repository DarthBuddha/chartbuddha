// ---------------------------------------------------------------------------------------------- //
//! - useConnectApiData.ts
// ---------------------------------------------------------------------------------------------- //

// React
import { useState, useEffect } from 'react';
// Interface
import { accessTauriStore } from 'hooks/accessTauriStore';

/* ---------------------------------------------------------------------------------------------- */

export const usePageConnect = () => {
  const { getKey, onKeyChange } = accessTauriStore('.nav_connect.json');
  const [api_data, set_api_data] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const selected = await getKey<{ api_data: string }>('nav_connect');
      if (selected) set_api_data(selected.api_data);

      const unlisten = await onKeyChange<{ api_data: string }>('nav_connect', (newValue) => {
        if (newValue) set_api_data(newValue.api_data);
      });

      return () => {
        unlisten();
      };
    };

    init();
  }, [getKey, onKeyChange]);

  return { api_data, set_api_data };
};

/* ---------------------------------------------------------------------------------------------- */
