// ---------------------------------------------------------------------------------------------- //
//! - useConnectDataApi.ts
// ---------------------------------------------------------------------------------------------- //

// React
import { useState, useEffect } from 'react';
// Interface
import { accessTauriStore } from 'interface/hooks/accessTauriStore';

/* ---------------------------------------------------------------------------------------------- */

export const usePageConnect = () => {
  const { getKey, onKeyChange } = accessTauriStore('page_connect.json');
  const [dataApi, setDataApi] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const selected = await getKey<{ data_api: string }>('page_connect');
      if (selected) setDataApi(selected.data_api);

      const unlisten = await onKeyChange<{ data_api: string }>('page_connect', (newValue) => {
        if (newValue) setDataApi(newValue.data_api);
      });

      return () => {
        unlisten();
      };
    };

    init();
  }, [getKey, onKeyChange]);

  return { dataApi, setDataApi };
};

/* ---------------------------------------------------------------------------------------------- */
