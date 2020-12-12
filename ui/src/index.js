import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import history from './history';

ReactDOM.render(
  <React.StrictMode>
    <App history={history}/>
  </React.StrictMode>,
  document.getElementById('root')
);
