
//Css Import
import './index.css';
// Library Import
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Component Import
import React from 'react';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'
import store from './Redux/store.js';


ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
    <BrowserRouter >
    <App />
    
     <Toaster /> 
    </BrowserRouter>
    </Provider>
  
);
