import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { BotonCerrar } from './BotonCerrar';
import { CuentaRegresivaToken } from './CuentaRegresivaToken';




const menuOptions = [{
  titulo: "Parametros",
  url: "/"
},
{
  titulo: "Documentación",
  url: "/"
},
{
  titulo: "Accesos",
  url: "/acceso"
},

]


export function Navbarapp2(params) {
  return (
    <>

        {["lg"].map((expand) => (

          <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb-3" sticky='top'>
            <Container fluid>


              <Navbar.Brand as={Link} to="/">

                <img
                  src="/login.png" // Coloca tu PNG en la carpeta public
                  alt="Logo"
                  width="150"
                  height="40"
                  className="d-inline-block align-top me-2"
                />
                { `Documentación ` } 
                
              </Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Menú
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <CuentaRegresivaToken/>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    {
                      menuOptions.map((option, index) => (
                        <Nav.Link key={index} as={Link} to={option.url}>
                          {option.titulo}
                        </Nav.Link>
                      ))
                    }

                  </Nav>
                  
                  {/* <Link to='/login' className="btn btn-primary mt-2">Cerrar Sesión</Link>    */}
                  <BotonCerrar></BotonCerrar>
                   
                </Offcanvas.Body>

              </Navbar.Offcanvas>
            </Container>
          </Navbar>

        ))}     

    </>
  );
}
