/* ---------------------------------------------------------------------------------------------- */
//! - ChartBuddha.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react';
// Tauri
import { load } from '@tauri-apps/plugin-store';
// Interface
import { useSelectedPage } from 'hooks/useSelectedPage';
// Common
import MenuBar from './components/menubar/MenuBar';
import StatusBar from './components/statusbar/StatusBar';
// Components
import Analyze from './pages/analyze/Analyze';
import Dashboard from './page_dashboard/Dashboard';
import Connect from './pages/connect/Connect';
import Home from './page_home/Home';
import News from './page_news/News';
import Profile from './page_profile/Profile';
import Subscribe from './page_subscribe/Subscribe';
// CSS Modules
import Style from './ChartBuddha.module.css';

/* ---------------------------------------------------------------------------------------------- */
//
const store = await load('.interface.json');
const selected = await store.get<{ selectedPage: string }>('interface');
//
/* ---------------------------------------------------------------------------------------------- */
//
const ChartBuddha: React.FC = () => {
  const { selectedPage, setSelectedPage } = useSelectedPage();

  if (!selected) {
    return <h1>ERROR - ChartBuddha - ERROR</h1>;
  }

  const renderPage = () => {
    switch (selectedPage) {
      case 'analyze':
        return <Analyze />;
      case 'dashboard':
        return <Dashboard />;
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
        <MenuBar setSelectedPage={setSelectedPage} />
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
/* ---------------------------------------------------------------------------------------------- */
