//! # ChartBuddha
//! Page: App (Main)
//! Description: Main page.
//! ##### Index.tsx
//
// Dependencies
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Modules
import About from "./pages/about/About";
import Connect from "./pages/connect/Connect";
import Home from "./pages/home/Home";
import Market from "./pages/market/Market";
import Dashboard from "./pages/dashboard/Dashboard";
import News from "./pages/news/News";
import Community from "./pages/community/Community";
import Profile from "./pages/profile/Profile";
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
