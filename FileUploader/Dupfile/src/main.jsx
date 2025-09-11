import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
//import './index.css'
import App from './App.jsx'

import { Navbarapp } from './Navbarapp.jsx'
import { Navbarapp2 } from './Navbarapp2.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'))

 root.render(
   <>
   {/*  <Navbarapp />*/}
     <Navbarapp2 />
     <App />
   </>
 )

