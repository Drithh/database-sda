// import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar.js';
import Crud from './components/crud.js';
import Home from './components/home.js';
// import Axios from 'axios';

function App() {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   Axios.get('http://localhost:3001/api/get').then((response) => {
  //     setData(response.data);
  //   });
  // }, []);
  // const ruteTerbeli = () => {
  //   let rute = [];
  //   data.forEach((item) => {
  //     rute.push(item.RuteTerbeli);
  //   });
  //   return rute;
  // };
  // {ruteTerbeli().map((item) => {
  //   return <p>{item}</p>;
  // })}

  return (
    <Router>
      <div className="w-screen max-w-screen-lg m-auto">
        <Navbar />
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crud" element={<Crud />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
