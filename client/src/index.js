import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { MemoryRouter } from 'react-router';
ReactDOM.render(
  <MemoryRouter>
    <App />
  </MemoryRouter>,
  document.getElementById('root')
);
