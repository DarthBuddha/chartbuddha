// ---------------------------------------------------------------------------------------------- //
//! - usePageConnect.ts
// ---------------------------------------------------------------------------------------------- //

// React
import { useState, useEffect } from 'react';
// Interface
import { accessTauriStore } from 'interface/hooks/accessTauriStore';

/* ---------------------------------------------------------------------------------------------- */

export const usePageConnect = () => {
  const { getKey, onKeyChange } = accessTauriStore('.interface.json');
  const [dataApi, setDataApi] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const selected = await getKey<{ dataApi: string }>('pageConnect');
      if (selected) setDataApi(selected.dataApi);

      const unlisten = await onKeyChange<{ dataApi: string }>('pageConnect', (newValue) => {
        if (newValue) setDataApi(newValue.dataApi);
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
