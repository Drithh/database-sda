import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setData(response.data);
      console.log(data);
    });
  }, []);
  return (
    <div className="App">
      <p>Kenapa</p>
      {data.map((item) => {
        return <p>{item.RuteTerbeli}</p>;
      })}
    </div>
  );
}

export default App;
