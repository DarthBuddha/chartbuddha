import React, { createContext, useContext, useState, useEffect } from 'react';
import { accessTauriStore } from 'hooks/accessTauriStore';

type SelectedPageContextType = {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
};

const SelectedPageContext = createContext<SelectedPageContextType | undefined>(undefined);

export const SelectedPageProvider: React.FC = ({ children }) => {
  const { getKey, onKeyChange, setKey } = accessTauriStore('.interface.json');
  const [selectedPage, setSelectedPage] = useState<string>('home');

  useEffect(() => {
    const init = async () => {
      const selected = await getKey<{ selectedPage: string }>('interface');
      if (selected) setSelectedPage(selected.selectedPage);

      const unlisten = await onKeyChange<{ selectedPage: string }>('interface', (newValue) => {
        if (newValue) setSelectedPage(newValue.selectedPage);
      });

      return () => {
        unlisten();
      };
    };

    init();
  }, [getKey, onKeyChange]);

  const updateSelectedPage = async (newPage: string) => {
    const currentData = await getKey<{ [key: string]: unknown }>('interface');
    await setKey('interface', { ...currentData, selectedPage: newPage });
    setSelectedPage(newPage);
  };

  return (
    <SelectedPageContext.Provider value={{ selectedPage, setSelectedPage: updateSelectedPage }}>
      {children}
    </SelectedPageContext.Provider>
  );
};

export const useSelectedPage = () => {
  const context = useContext(SelectedPageContext);
  if (!context) {
    throw new Error('useSelectedPage must be used within a SelectedPageProvider');
  }
  return context;
};
