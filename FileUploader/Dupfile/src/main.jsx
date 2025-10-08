import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
//import './index.css'
import App from './App.jsx'
import {   BrowserRouter } from 'react-router-dom';

import { Navbarapp } from './components/Navbarapp.jsx'
import { Navbarapp2 } from './components/Navbarapp2.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <>
    <BrowserRouter>
      {/*  <Navbarapp />*/}
      
      <App />
    </BrowserRouter>
  </>
)

