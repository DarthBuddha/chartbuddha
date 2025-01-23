/* ---------------------------------------------------------------------------------------------- */
//! # Interface: App - Main
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Main window for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/Main.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Components: MenuBar, StatusBar
import MenuBar from './components/menubar/MenuBar.tsx'
import StatusBar from './components/statusbar/StatusBar.tsx'
// Components
import Analyze from './pages/analyze/Analyze.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import Connect from './pages/connect/Connect.tsx'
import Home from './pages/home/Home.tsx'
import News from './pages/news/News.tsx'
import Profile from './pages/profile/Profile.tsx'
import Subscribe from './pages/subscribe/Subscribe.tsx'
// Context
import { useInterfaceContext } from 'app/context/InterfaceContext.tsx'
// CSS Module
import Style from './Main.module.css'

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
    <div className={Style.Main_Window}>
      <div className={Style.MenuBar_Component}>
        <MenuBar />
      </div>
      <div className={Style.Page_Component}>{renderPage()}</div>
      <div className={Style.StatusBar_Component}>
        <StatusBar />
      </div>
    </div>
  )
}

export default Main

/* ---------------------------------------------------------------------------------------------- */
