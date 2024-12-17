//! # ChartBuddha
//!
//! Page: App (Main)
//! Description: Main page.
//!
//! ##### Index.tsx
//
// Dependencies
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Modules
import About from "./about/About";
import Connect from "./connect/Connect";
import Home from "./home/Home";
import Market from "./market/Market";
import Dashboard from "./dashboard/Dashboard";
import News from "./news/News";
import Community from "./community/Community";
import Profile from "./profile/Profile";
//
/*--------------------------------------< Page >--------------------------------------*/
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
            path="/market"
            element={<Market />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/news"
            element={<News />}
          />
          <Route
            path="/community"
            element={<Community />}
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
/*------------------------------------< End-Code >------------------------------------*/
