/* ---------------------------------------------------------------------------------------------- */
//! - Index.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react';
// Components: MenuBar, StatusBar
import MenuBar from './components/menubar/MenuBar';
import StatusBar from './components/statusbar/StatusBar';
// Components
import Analyze from './pages/analyze/Analyze';
import Dashboard from './pages/dashboard/Dashboard';
import Connect from './pages/connect/Connect';
import Home from './pages/home/Home';
import News from './pages/news/News';
import Profile from './pages/profile/Profile';
import Subscribe from './pages/subscribe/Subscribe';
// Context
import { useInterfaceContext } from 'context/InterfaceContext';
// CSS Module
import Style from './Main.module.css';

/* ---------------------------------------------------------------------------------------------- */

const Main: React.FC = () => {
  // State Management
  const { selPage } = useInterfaceContext();

  const renderPage = () => {
    switch (selPage) {
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
    <div className={Style.Main_Window}>
      <div className={Style.MenuBar_Component}>
        <MenuBar />
      </div>
      <div className={Style.Page_Component}>{renderPage()}</div>
      <div className={Style.StatusBar_Component}>
        <StatusBar />
      </div>
    </div>
  );
};

export default Main;

/* ---------------------------------------------------------------------------------------------- */
