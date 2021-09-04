import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import serviceworker from "./swDev";

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
serviceworker();
//this service worker also work fine but not show the install app in browser