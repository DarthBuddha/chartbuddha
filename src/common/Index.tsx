//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Index
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Tauri
import { load } from '@tauri-apps/plugin-store';
// Interface
// import { useContext_Interface } from 'interface/Context_Interface';
// Components
import About from '../page_about/About';
import Analyze from '../page_analyze/Analyze';
import Chart from '../page_chart/Chart';
import Connect from '../page_connect/Connect';
import Home from '../page_home/Home';
import News from '../page_news/News';
import Profile from '../page_profile/Profile';
import Subscribe from '../page_subscribe/Subscribe';
// CSS Modules
import Style from './Index.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const store = await load('.interface.json');
const selected = await store.get<{ page: string }>('interface');
//
/* ------------------------------------------------------------------------------------------------------------------ */
const Connect_Data: React.FC = () => {
  // const { selected_Api } = useContext_Interface();

  if (!selected) {
    return <div>ERROR</div>;
  }

  switch (selected.page) {
    case 'about':
      return <About />;
    case 'analyze':
      return <Analyze />;
    case 'chart':
      return <Chart />;
    case 'connect':
      return <Connect />;
    case 'home':
      return <Home />;
    case 'news':
      return <News />;
    case 'profile':
      return <Profile />;
    case 'subscribe':
      return <Subscribe />;
    default:
      return <div>ERROR</div>;
  }
};

export default Connect_Data;
//
/* ------------------------------------------------------------------------------------------------------------------ */
