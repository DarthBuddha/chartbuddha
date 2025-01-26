/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Window - Main
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Main window for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: window/Main.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Components: MenuBar, StatusBar
import MenuBar from './MenuBar.tsx'
import StatusBar from './StatusBar.tsx'
// Components
import Analyze from '../page/analyze/Analyze.tsx'
import Dashboard from '../page/dashboard/Dashboard.tsx'
import Connect from '../page/connect/Connect.tsx'
import Home from '../page/home/Home.tsx'
import News from '../page/news/News.tsx'
import Profile from '../page/profile/Profile.tsx'
import Subscribe from '../page/subscribe/Subscribe.tsx'
// Context
import { useInterfaceContext } from '../context/InterfaceContext.tsx'
// CSS Module
import Style from './Page.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Main: React.FC = () => {
  // State Management
  const { selPage } = useInterfaceContext()

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
        return <Home />
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
