// ------------------------------------------------------------------------------------------------------------------ //
//! - usePageConnect.ts
// ------------------------------------------------------------------------------------------------------------------ //

// React
import { useState, useEffect } from 'react';
// Interface
import { useTauriStore } from 'interface/useTauriStore';

/* ------------------------------------------------------------------------------------------------------------------ */

export const usePageConnect = () => {
  const { getKey, onKeyChange } = useTauriStore('.interface.json');
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

/* ------------------------------------------------------------------------------------------------------------------ */
