/* ------------------------------------------------------------------------------------------------------------------ */
//! - Home.tsx
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// CSS Modules
import Style from './Home.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */

const Home: React.FC = () => {
  return (
    <div className={Style.Home}>
      <div className={Style.Main_Container}>
        <h1>Welcome to ChartBuddha</h1>
      </div>
    </div>
  );
};

export default Home;

/* ------------------------------------------------------------------------------------------------------------------ */
