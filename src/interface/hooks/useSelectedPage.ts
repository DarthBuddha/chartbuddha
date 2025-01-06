// ---------------------------------------------------------------------------------------------- //
//! - useSelectedPage.ts
// ---------------------------------------------------------------------------------------------- //

// React
import { useState, useEffect } from 'react';
// Interface
import { accessTauriStore } from 'interface/hooks/accessTauriStore';

/* ---------------------------------------------------------------------------------------------- */

export const useSelectedPage = () => {
  const { getKey, onKeyChange } = accessTauriStore('.interface.json');
  const [page, setSelectedPage] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const selected = await getKey<{ page: string }>('interface');
      if (selected) setSelectedPage(selected.page);

      const unlisten = await onKeyChange<{ page: string }>('interface', (newValue) => {
        if (newValue) setSelectedPage(newValue.page);
      });

      return () => {
        unlisten();
      };
    };

    init();
  }, [getKey, onKeyChange]);

  return { page, setSelectedPage };
};

/* ---------------------------------------------------------------------------------------------- */
