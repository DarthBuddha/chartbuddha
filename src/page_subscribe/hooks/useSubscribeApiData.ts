// ---------------------------------------------------------------------------------------------- //
//! - useSubscribeApiData.ts
// ---------------------------------------------------------------------------------------------- //

// React
import { useState, useEffect } from 'react';
// Interface
import { accessTauriStore } from 'interface/accessTauriStore';

/* ---------------------------------------------------------------------------------------------- */

export const usePageSubscribe = () => {
  const { getKey, onKeyChange } = accessTauriStore('.nav_subscribe.json');
  const [api_data, set_api_data] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const selected = await getKey<{ api_data: string }>('nav_subscribe');
      if (selected) set_api_data(selected.api_data);

      const unlisten = await onKeyChange<{ api_data: string }>('nav_subscribe', (newValue) => {
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
