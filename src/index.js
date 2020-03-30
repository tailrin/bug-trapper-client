import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App/App';

if(document.getElementById('base').scrollHeight < window.innerHeight ){
  document.getElementById('base').style.height = '100%'
}
ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  )

