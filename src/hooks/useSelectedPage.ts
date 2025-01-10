// ---------------------------------------------------------------------------------------------- //
//! - useSelectedPage.ts
// ---------------------------------------------------------------------------------------------- //

// React
import { useState, useEffect } from 'react';
// Interface
import { accessTauriStore } from 'hooks/accessTauriStore';

/* ---------------------------------------------------------------------------------------------- */

// Define a type for the interface object
type InterfaceObject = {
  selectedPage: string;
  selectedApi: string | null;
  // Add other keys and their types as needed
};

export const useSelectedPage = () => {
  const { getKey, onKeyChange, setKey } = accessTauriStore('.interface.json');
  const [selectedPage, setSelectedPage] = useState<string>('');

  const updateSelectedPage = async (newPage: string) => {
    // Retrieve the current data from the store
    const currentData = await getKey<InterfaceObject>('interface');

    // Merge the new selectedPage value with the existing data
    await setKey('interface', { ...currentData, selectedPage: newPage });

    // Update the local state
    setSelectedPage(newPage);
  };

  useEffect(() => {
    const init = async () => {
      const selected = await getKey<InterfaceObject>('interface');
      if (selected) setSelectedPage(selected.selectedPage);

      const unlisten = await onKeyChange<InterfaceObject>('interface', (newValue) => {
        if (newValue) setSelectedPage(newValue.selectedPage);
      });

      return () => {
        unlisten();
      };
    };

    init();
  }, [getKey, onKeyChange]);

  return { selectedPage, setSelectedPage: updateSelectedPage };
};

/* ---------------------------------------------------------------------------------------------- */
