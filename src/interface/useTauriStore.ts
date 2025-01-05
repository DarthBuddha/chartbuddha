// ------------------------------------------------------------------------------------------------------------------ //
//! - useTauriStore.ts
// ------------------------------------------------------------------------------------------------------------------ //

// Tauri
import { load } from '@tauri-apps/plugin-store';

/* ------------------------------------------------------------------------------------------------------------------ */

export const useTauriStore = (storeFile: string) => {
  const initStore = async () => await load(storeFile);

  const getKey = async <T>(key: string): Promise<T | null> => {
    const store = await initStore();
    const result = await store.get<T>(key);
    return result !== undefined ? result : null;
  };

  const setKey = async <T>(key: string, value: T): Promise<void> => {
    const store = await initStore();
    await store.set(key, value);
  };

  const onKeyChange = async <T>(key: string, callback: (value: T | undefined) => void): Promise<() => void> => {
    const store = await initStore();
    return await store.onKeyChange<T>(key, callback);
  };

  return { getKey, setKey, onKeyChange };
};

/* ------------------------------------------------------------------------------------------------------------------ */
