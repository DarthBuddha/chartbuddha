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
import Splash from './page/Splash.tsx'
import Home from './page/Home.tsx'
import Connect from './page/Connect.tsx'
import Subscribe from './page/Subscribe.tsx'
import Dashboard from './page/Dashboard.tsx'
import Analyze from './page/Analyze.tsx'
import News from './page/News.tsx'
import Profile from './page/Profile.tsx'
// Context
import { useAppContext } from './hooks/useAppContext.ts'
// CSS Module
import Style from './css/App.module.css'

/* ---------------------------------------------------------------------------------------------- */

const App: React.FC = () => {
  // State Management
  const { selPage } = useAppContext()

  const renderPage = () => {
    switch (selPage) {
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

  return (
    <div className={Style.App}>
      {renderPage()}
    </div>
  )
}

export default App

/* ---------------------------------------------------------------------------------------------- */
