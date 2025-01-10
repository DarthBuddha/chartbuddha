import { useState, useEffect } from 'react';
import { accessTauriStore } from 'hooks/accessTauriStore';

export const useTauriStore = <T>(storeFile: string, key: string) => {
  const { getKey, onKeyChange, setKey } = accessTauriStore(storeFile);
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    const init = async () => {
      const storedValue = await getKey<T>(key);
      if (storedValue) setValue(storedValue);

      const unlisten = await onKeyChange<T>(key, (newValue) => {
        if (newValue) setValue(newValue);
      });

      return () => {
        unlisten();
      };
    };

    init();
  }, [getKey, onKeyChange, key]);

  const updateValue = async (newValue: T) => {
    await setKey(key, newValue);
    setValue(newValue);
  };

  return { value, setValue: updateValue };
};
