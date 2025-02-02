/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Window - Main
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Main window for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/App.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Components: Pages
import Splash from 'page/splash/Splash.tsx'
import Home from 'page/home/Home.tsx'
import Connect from 'page/connect/Connect.tsx'
import Subscribe from 'page/subscribe/Subscribe.tsx'
import Dashboard from 'page/dashboard/Dashboard.tsx'
import Analyze from 'page/analyze/Analyze.tsx'
import News from 'page/news/News.tsx'
import Profile from 'page/profile/Profile.tsx'
// Hooks
import { useAppContext } from './hooks/useAppContext.ts'
// CSS Module
import Style from 'css/App.module.css'

/* ---------------------------------------------------------------------------------------------- */

const App: React.FC = () => {
  // Context: Interface
  const { selInterface } = useAppContext()
  const { page } = selInterface || {}

  const renderPage = () => {
    switch (page) {
      case 'Analyze':
        return <Analyze />
      case 'Dashboard':
        return <Dashboard />
      case 'Connect':
        return <Connect />
      case 'Home':
        return <Home />
      case 'News':
        return <News />
      case 'Profile':
        return <Profile />
      case 'Subscribe':
        return <Subscribe />
      default:
        return <Splash />
    }
  }

  return <div className={Style.App}>{renderPage()}</div>
}

export default App

/* ---------------------------------------------------------------------------------------------- */
