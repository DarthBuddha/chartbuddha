// ---------------------------------------------------------------------------------------------- //
//! - setProductType.ts
// ---------------------------------------------------------------------------------------------- //

// React
import { useState, useEffect } from 'react';
// Interface
import { accessTauriStore } from 'hooks/accessTauriStore';

/* ---------------------------------------------------------------------------------------------- */

export const useProductType = () => {
  const { getKey, onKeyChange } = accessTauriStore('.nav_subscribe.json');
  const [productType, setProductType] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const selected = await getKey<{ productType: string }>('nav_subscribe');
      if (selected) setProductType(selected.productType);

      const unlisten = await onKeyChange<{ productType: string }>('nav_subscribe', (newValue) => {
        if (newValue) setProductType(newValue.productType);
      });

      return () => {
        unlisten();
      };
    };

    init();
  }, [getKey, onKeyChange]);

  return { productType, setProductType };
};

/* ---------------------------------------------------------------------------------------------- */
