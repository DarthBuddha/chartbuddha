/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Page: Page Home - Home
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Home page for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * page/home/Home.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Components
import MenuBar from 'components/MenuBar.tsx'
import Home_Tab from './Home_Tab.tsx'
import StatusBar from 'components/StatusBar.tsx'
// CSS Module
import Style_App from 'css/App.module.css'
import Style from './css/Home.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Home: React.FC = () => {
  return (
    <div className={Style_App.Page}>
      <div className={Style_App.MenuBar}>
        <MenuBar />
      </div>
      <div className={Style.Frame_Container}>
        <Home_Tab />
      </div>
      <div className={Style_App.StatusBar}>
        <StatusBar />
      </div>
    </div>
  )
}

export default Home

/* ---------------------------------------------------------------------------------------------- */
