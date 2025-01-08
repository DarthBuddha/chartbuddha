// ---------------------------------------------------------------------------------------------- //
//! - useConnectDataApi.ts
// ---------------------------------------------------------------------------------------------- //

// React
import { useState, useEffect } from 'react';
// Interface
import { accessTauriStore } from 'interface/accessTauriStore';

/* ---------------------------------------------------------------------------------------------- */

export const usePageConnect = () => {
  const { getKey, onKeyChange } = accessTauriStore('page_connect.json');
  const [data_api, set_data_api] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const selected = await getKey<{ data_api: string }>('page_connect');
      if (selected) set_data_api(selected.data_api);

      const unlisten = await onKeyChange<{ data_api: string }>('page_connect', (newValue) => {
        if (newValue) set_data_api(newValue.data_api);
      });

      return () => {
        unlisten();
      };
    };

    init();
  }, [getKey, onKeyChange]);

  return { data_api, set_data_api };
};

/* ---------------------------------------------------------------------------------------------- */
