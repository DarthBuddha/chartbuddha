/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Page: Page Home - Home
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Home page for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/page/home/Home.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Components
import MenuBar from '../components/MenuBar.tsx'
import StatusBar from '../components/StatusBar.tsx'
// CSS Module
import Style from './css/Home.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Home: React.FC = () => {
  return (
    <div className={Style.Page}>
      <div className={Style.Component_MenuBar}>
        <MenuBar />
      </div>
      <div className={Style.Frame}>
        <h1>Welcome to ChartBuddha</h1>
      </div>
      <div className={Style.Component_StatusBar}>
        <StatusBar />
      </div>
    </div>
  )
}

export default Home

/* ---------------------------------------------------------------------------------------------- */
