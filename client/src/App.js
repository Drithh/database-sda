import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setData(response.data);
    });
  }, []);
  const ruteTerbeli = () => {
    let rute = [];
    data.forEach((item) => {
      rute.push(item.RuteTerbeli);
    });
    return rute;
  };
  console.log(ruteTerbeli());
  return (
    <div className="App">
      {ruteTerbeli().map((item) => {
        return <p>{item}</p>;
      })}
      <p>Kenapa</p>
    </div>
  );
}

export default App;
