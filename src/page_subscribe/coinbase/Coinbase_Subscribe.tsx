/* ---------------------------------------------------------------------------------------------- */
//! - Subscribe Product Coinbase
/* ---------------------------------------------------------------------------------------------- */

// React
import React, { useEffect } from 'react';
import Split from 'react-split';
// Tauri
import { info } from '@tauri-apps/plugin-log';
import { load } from '@tauri-apps/plugin-store';
// Hooks
import { useProductType } from './hooks/useProductType';
// Components
import Coinbase_Product from './Coinbase_Product';
import Coinbase_Product_List from './Coinbase_Product_List';
// CSS Modules
import Style from './Coinbase_Subscribe.module.css';

/* ---------------------------------------------------------------------------------------------- */

const store = await load('.nav_subscribe.json');

/* ---------------------------------------------------------------------------------------------- */

const Coinbase_Subscribe: React.FC = () => {
  const { setProductType } = useProductType();

  // Initialize on Component load
  useEffect(() => {
    const initialize = async () => {
      info('useEffect');
      const currentData = await store.get('nav_subscribe');
      const updatedData = { ...(currentData || {}), product_type: 'SPOT' };
      await store.set('nav_subscribe', updatedData);
      setProductType('SPOT');
    };
    initialize();
  });

  /* -------------------------------------------------------------------------------------------- */
  return (
    <div className={Style.Page}>
      <Split
        className={Style.Split}
        sizes={[90, 10]}
        minSize={[400, 160]}
        maxSize={[Infinity, 650]}
        expandToMin={true}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={20}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <div className={Style.Coinbase_Product}>
          <Coinbase_Product />
        </div>
        <div className={Style.Coinbase_Product_List}>
          <Coinbase_Product_List setProductType={setProductType} />
        </div>
      </Split>
    </div>
  );
};

export default Coinbase_Subscribe;

/* ---------------------------------------------------------------------------------------------- */
