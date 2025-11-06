import './App.css'
import { Login } from './pages/Login';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { Principal } from './pages/Principal';
import { Acceso } from './pages/Acceso';
import { GuardRute } from './guards/VerificaRutas';


function App() {
  return (
    <>
      <Routes>

        <Route path='/' element={
          <GuardRute>
            <Principal></Principal>
          </GuardRute>
        }></Route>

        <Route path='/principal' element={

          <GuardRute>
            <Principal></Principal>
          </GuardRute>
        }></Route>


        <Route path='/login' element={<Login />}></Route>
        <Route path='/acceso' element={<GuardRute><Acceso /></GuardRute>}></Route>

      </Routes>
    </>
  )
}

export default App
