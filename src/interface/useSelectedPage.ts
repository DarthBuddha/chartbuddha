// ---------------------------------------------------------------------------------------------- //
//! - useSelectedPage.ts
// ---------------------------------------------------------------------------------------------- //

// React
import { useState, useEffect } from 'react';
// Interface
import { accessTauriStore } from 'interface/accessTauriStore';

/* ---------------------------------------------------------------------------------------------- */

export const useSelectedPage = () => {
  const { getKey, onKeyChange } = accessTauriStore('.interface.json');
  const [page, setSelectedPage] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const selected = await getKey<{ page: string }>('page_interface');
      if (selected) setSelectedPage(selected.page);

      const unlisten = await onKeyChange<{ page: string }>('page_interface', (newValue) => {
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
