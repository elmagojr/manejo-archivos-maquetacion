import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx';
import './Estilos.css'
const root = ReactDOM.createRoot(document.getElementById('root'))

//declaracion de elementos
const Boton = ({ texto }) => {
  return <button>{texto}</button>
}
root.render(
  // <React.Fragment>
  //   <Boton texto='botn 1' />
  //   <Boton texto='botn 2' />
  //   <Boton texto='botn 3' />
  // </React.Fragment>
  <App></App>

)

 