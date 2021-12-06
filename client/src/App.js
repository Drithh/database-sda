// import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.js';
import Crud from './components/crud.js';
import Home from './components/home.js';
function App() {
  const location = useLocation();
  return (
    <div className="App relative z-0 overflow-x-hidden">
      <div className=" border-l-[calc((100vw-1048px)/2)] border-r-[calc((100vw-1048px)/2)] border-white pointer-events-none">
        <div className="w-screen max-w-screen-lg m-auto relative z-[-1] pointer-events-auto">
          <Navbar />
          <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/crud" element={<Crud />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
