//! # ChartBuddha
//!
//! Page: App (Main)
//! Description: Main page.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Pages
import Home from "./home/Home";
import Connect from "./connect/Connect";
import Subscribe from "./subscribe/Subscribe";
import Dashboard from "./dashboard/Dashboard";
import Market from "./market/Market";
import News from "./news/News";
import Profile from "./profile/Profile";
import About from "./about/About";
//
/* ---------------------------------------------------------------------------------- */
const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/connect"
            element={<Connect />}
          />
          <Route
            path="/subscribe"
            element={<Subscribe />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/market"
            element={<Market />}
          />
          <Route
            path="/news"
            element={<News />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/about"
            element={<About />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
/* ---------------------------------------------------------------------------------- */
