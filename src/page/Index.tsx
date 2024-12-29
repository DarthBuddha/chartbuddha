//! # Index
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Pages
import Home from "./home/Home";
import Profile from "./profile/Profile";
import About from "./about/About";
//
import Connect from "./connect/Connect";
import Subscribe from "./subscribe/Subscribe";
import Chart from "./chart/Dashboard";
import Analyze from "./analyze/Analyze";
import News from "./news/News";
//
/* ---------------------------------------------------------------------------------- */
//
const Index: React.FC = () => {
  return (
    <Router>
      {/* <div> */}
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
            path="/chart"
            element={<Chart />}
          />
          <Route
            path="/analyze"
            element={<Analyze />}
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
      {/* </div> */}
    </Router>
  );
};

export default Index;
//
/* ---------------------------------------------------------------------------------- */
