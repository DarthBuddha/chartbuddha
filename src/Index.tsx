/* ---------------------------------------------------------------------------------------------- */
//! - Index.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react';
// Interface
import { useInterfaceContext } from 'context/InterfaceContext';
// Common
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
// CSS Modules
import Style from './Index.module.css';

/* ---------------------------------------------------------------------------------------------- */

const Index: React.FC = () => {
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
    <div className={Style.ChartBuddha}>
      <div className={Style.MenuBar_Container}>
        <MenuBar />
      </div>
      <div className={Style.Page_Container}>{renderPage()}</div>
      <div className={Style.StatusBar_Container}>
        <StatusBar />
      </div>
    </div>
  );
};

export default Index;

/* ---------------------------------------------------------------------------------------------- */
