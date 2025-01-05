//! ---------------------------------------------------------------------------------------------------------------- !//
//! - ChartBuddha
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
// Tauri
import { load } from '@tauri-apps/plugin-store';
// Common
import MenuBar from 'MenuBar';
import StatusBar from 'StatusBar';
// Components
import Analyze from './analyze/Analyze';
import Chart from './page_chart/Chart';
import Connect from './page_connect/Connect';
import Home from './home/Home';
import News from './news/News';
import Profile from './profile/Profile';
import Subscribe from './page_subscribe/Subscribe';
// CSS Modules
import Style from './ChartBuddha.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
const store = await load('.interface.json');
const selected = await store.get<{ page: string }>('interface');
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const ChartBuddha: React.FC = () => {
  const [selectedPage, setSelectedPage] = React.useState<string>(selected?.page || 'home');

  if (!selected) {
    return <h1>ERROR</h1>;
  }

  const renderPage = () => {
    switch (selectedPage) {
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
        return <Home />;
    }
  };

  return (
    <div className={Style.ChartBuddha}>
      <div className={Style.MenuBar_Container}>
        <MenuBar setPage={setSelectedPage} />
      </div>
      <div className={Style.Page_Container}>{renderPage()}</div>
      <div className={Style.StatusBar_Container}>
        <StatusBar />
      </div>
    </div>
  );
};

export default ChartBuddha;
//
/* ------------------------------------------------------------------------------------------------------------------ */
