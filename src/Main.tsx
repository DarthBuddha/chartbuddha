/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Window - Main
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Main window for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/window/Main.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Components: MenuBar, StatusBar
import MenuBar from './components/MenuBar.tsx'
import StatusBar from './components/StatusBar.tsx'
// Components: Pages
import Splash from './page/splash/Splash.tsx'
import Home from './page/home/Home.tsx'
import Connect from './page/connect/Connect.tsx'
import Subscribe from './page/subscribe/Subscribe.tsx'
import Dashboard from './page/dashboard/Dashboard.tsx'
import Analyze from './page/analyze/Analyze.tsx'
import News from './page/news/News.tsx'
import Profile from './page/profile/Profile.tsx'
// Context
import { useAppContext } from './hooks/useAppContext.ts'
// CSS Module
import Style from './Main.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Main: React.FC = () => {
  // State Management
  const { selPage } = useAppContext()

  const renderPage = () => {
    switch (selPage) {
      case 'analyze':
        return <Analyze />
      case 'dashboard':
        return <Dashboard />
      case 'connect':
        return <Connect />
      case 'home':
        return <Home />
      case 'news':
        return <News />
      case 'profile':
        return <Profile />
      case 'subscribe':
        return <Subscribe />
      default:
        return <Splash />
    }
  }

  return (
    <div className={Style.MainComponent}>
      <div className={Style.MenuBarContainer}>
        <MenuBar />
      </div>
      <div className={Style.PageContainer}>{renderPage()}</div>
      <div className={Style.StatusBarContainer}>
        <StatusBar />
      </div>
    </div>
  )
}

export default Main

/* ---------------------------------------------------------------------------------------------- */
