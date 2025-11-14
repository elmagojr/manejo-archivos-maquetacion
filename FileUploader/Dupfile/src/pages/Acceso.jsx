import { useState, useEffect } from "react";
import { ListadoGenerico } from "../components/ListadoCombo"
import { ApiGet } from "../Manejo_data";
import { jwtDecode } from "jwt-decode";
import { AlertaHtml } from "../components/AlertasHtml";
import { Navbarapp2 } from "../components/Navbarapp2.jsx";
import { TabsMenu } from "../components/TabsMenu.jsx";
import { PermisosBase } from "../assets/cositas.jsx";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import { ModalGenerico } from "../components/ModalGenerico.jsx";
import { Button } from "react-bootstrap";


export function Acceso() {

  const RolesMomentaneos = [{ "idRol": 1, "nombreRol": "Rol1" }, { "idRol": 2, "nombreRol": "Rol2" }]
  const [loading, setLoading] = useState(false);
  const [tipoRol, setTipoRol] = useState(0);
  const [idKeyusr, setKeyusr] = useState(0);
  const [mensajeAlerta, setmensajeA] = useState("");
  const [verMensaje, setvermensaje] = useState(false);
  const [ColorMensaje, setColor] = useState("primary");
  const [password, setPassword] = useState("");
  const [dataUsrs, setDatasur] = useState([]);
  const token = localStorage.getItem("token"); //token del adminstrador o persona autorizada
  const [listadoDeRoles, setListadoDeRoles] = useState([]);
  const [Permisos_x_rol, setPermisos_x_rol] = useState([]);
  const [accion, setAccion] = useState(1);
  const [IdRol, setIdRol] = useState(0);

  // varaibles para roles
  const [showModal, setShowModal] = useState(false);
  const [desRol, setDesRol] = useState("");
  const [nombreRol, setNombreRol] = useState("");
  const [permisosSeleccionados, setPermisosSeleccionados] = useState(PermisosBase);

  const api = import.meta.env.VITE_MODE == "dev" ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD
  function BuscarUsuario(id) {
    const codigo = dataUsrs.find(item => item.idKey === Number(id))
    return codigo ? codigo.codigoUsr.toString() : null
  }

  const LoadListadoRoles = () => {
    ApiGet(api + "api/auth/listado_roles", { "Content-Type": "application/json", "authorization": `Bearer ${token}` }).then((jsonDAta) => {
      const newData = [];
      jsonDAta.map((item, index) => {
        const permisosObj = item.ROL_PERMISOS;
        setPermisos_x_rol(JSON.stringify(item.ROL_PERMISOS));
        newData.push({ idKey: index + 1, ROL_ID: item.ROL_ID, ROL_NOMBRE: item.ROL_NOMBRE, ROL_PERMISOS: permisosObj, ROL_DESCRIPCION: item.ROL_DESCRIPCION })
      });
      console.log(" Lo que devuelve la API de roles:", newData);
      setListadoDeRoles(newData);
    }).catch(err => {
      alert("No se pudo traer los datos requeridos [roles]", err); console.log(err);
    });
  }
  useEffect(() => { //esto evita que se repita el ciclo hasta que devuelva []
    ApiGet(api + "api/usrActivos").then((jsonDAta) => {
      const newData = [];
      //console.log("Lo que devuelve la API:", jsonDAta);
      jsonDAta.map((item, index) => {
        newData.push({ idKey: index + 1, codigoUsr: item.usr_codigo, nombreUsrTotal: item.usr_codigo + " - " + item.usr_nombre })
      });
      setDatasur(newData);
      //console.log(newData);

    }).catch(err => {
      alert("No se pudo traer los datos requeridos [usuarios]", err); console.log(err);
    });

    LoadListadoRoles();


  }, [])
  function Alerta(color, mensaje, ver) { //des ser necesario
    setColor(color.toString());
    setmensajeA(mensaje);
    setvermensaje(ver)
  }
  function ResetFormulario() {
    setLoading(false);
    setTipoRol(0);
    setKeyusr(0);
    setPassword("");
    document.getElementById("rpassword2").value = "";
  }

  const RegistroRol = async (formulario, accion) => {
    //console.log("foirmualro", formulario);

    setLoading(true);
    try {

      // validaciones
      if (formulario.nombreRol === "") {
        alert("Debe ingresar un nombre para el rol.");
        //Alerta("warning", "Debe ingresar un nombre para el rol.", true);   
        setLoading(false);
        return;
      }

      if (formulario.descripcionRol === "") {
        Alerta("warning", "Debe ingresar una descripción para el rol.", true);
        setLoading(false);
        return;
      }

      //return;
      let payload = {};
      let endpoint = `${api}api/auth/registrar_rol`;
      if (accion === 1) {
        payload = {
          nombreRol: formulario.nombreRol,
          desRol: formulario.desRol,
          permisos: JSON.stringify(formulario.permisos)
        }
      }
      if (accion === 2) {
        payload = {
          id_delRol: formulario.idRol,
          nombreRol: formulario.nombreRol,
          desRol: formulario.desRol,
          permisos: JSON.stringify(formulario.permisos)
        }
        endpoint = `${api}api/auth/actualizar_rol`;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      //console.log("esto es una preuba", data);
      if (data.estado === 1) {
        alert("Rol " + data.nombre_rol + " creado Exitosamente");
        setDesRol("");
        setNombreRol("");
        setPermisosSeleccionados(PermisosBase);
        LoadListadoRoles();
      }

      if (!res.ok) throw new Error(data.message || "Error de registro");

    } catch (error) {
      alert("No se pudo crear el rol: " + error.message);
      //Alerta("warning", "No se pudo crear el rol: " + error.message, true);
    } finally {
      setLoading(false);
    }

  }
  const RegistroUsr = async () => {
    setLoading(true);
    try {

      // validaciones
      if (tipoRol === 0) {
        Alerta("warning", "Debe seleccionar un rol.", true);
        //console.log("error rol: " + tipoRol);      
        setLoading(false);
        return;
      }

      if (idKeyusr === 0) {
        Alerta("warning", "Debe seleccionar un usuario.", true);
        //console.log("error usr: " + idKeyusr);
        setLoading(false);
        return;
      }

      if (!password || password.trim() === "" || password.length < 6) {
        Alerta("warning", "Debe ingresar una contraseña válida (mínimo 6 caracteres).", true);
        //console.log("error pass: " + password);
        setLoading(false);
        return;
      }


      const pass2 = document.getElementById("rpassword2").value;
      if (password !== pass2) {
        Alerta("danger", "Las contraseñas no coinciden.", true);
        //console.log("error pass no coinciden");
        setLoading(false);
        return;
      }



      //return;
      const payload = {
        id_rol: Number(tipoRol),
        username: BuscarUsuario(Number(idKeyusr)).toString(),
        password: password
      }
      //console.log(payload);

      if (token) {
        const decoded = jwtDecode(token);
        const permisos = decoded.permisos;
        if (!permisos.crear_usuario) {
          Alerta("info", "Usted no tiene permiso para esta accion", true)
          return;
        }
        console.log(" " + permisos.crear_usuario); // true o false
      }


      const res = await fetch(`${api}api/auth/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("esto es una preuba", data);
      if (data.estado === 1) {
        alert("Usuario " + data.user + " creado Exitosamente");
        Alerta("", "", false)
        ResetFormulario();
      }

      if (!res.ok) throw new Error(data.message || "Error de registro");

    } catch (error) {
      Alerta("info", "[2]No se pudo crear el usuario: " + error.message, true)
      //alert("[2]No se pudo crear el usuario: " + error.message);

    } finally {
      setLoading(false);
    }

  }

  const paginaRegistro = () => {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow p-4" >
          <h5 className="text-center mb-4">Sistema de Gestion de Archivos Digitales</h5>
          <h6 className="text-center mb-4">Registro</h6>
          <form>
            <div className="input-group mb-3">
              <ListadoGenerico data={RolesMomentaneos} value={tipoRol} onChange={(e) => setTipoRol(Number(e.target.value))} identificadores="SelectRoles" valorDefault={0} mensajeDefault={"Seleccione un rol"} keyValue={"idRol"} textValueSelect={"nombreRol"} />
            </div>
            <div className="mb-3">
              <label htmlFor="usuario" className="form-label">Nombre de Usuario</label>
              <ListadoGenerico data={dataUsrs} value={idKeyusr} onChange={(e) => { setKeyusr(Number(e.target.value)); }} identificadores="SelectUsuarios" valorDefault={0} mensajeDefault={"Seleccione un usuario"} keyValue={"idKey"} textValueSelect={"nombreUsrTotal"} />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                id="password1"
                name="pass1"
                className="form-control"
                placeholder="Ingresa tu contraseña"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Ingrese nuevamente la Contraseña</label>
              <input
                type="password"
                id="rpassword2"
                className="form-control"
                placeholder="Repita la contraseña"
                required
              />
            </div>
            <AlertaHtml mensaje={mensajeAlerta} verMensaje={verMensaje} color={ColorMensaje} onClose={() => setvermensaje(false)}></AlertaHtml>
            <button type="button" className="btn btn-primary w-100" onClick={RegistroUsr}> {loading && "Espere..." || "Registrar"}</button>
          </form>
        </div>
      </div>
    )
  }

  const paginaroles = () => {


    const handleChecks = (indexGrupo, indexPermiso) => {
      const nuevosPermisos = [...permisosSeleccionados];
      nuevosPermisos[indexGrupo].permisos[indexPermiso].valor = !nuevosPermisos[indexGrupo].permisos[indexPermiso].valor;
      setPermisosSeleccionados(nuevosPermisos);
    }
    const ValidaCampos = () => {
      if (nombreRol.trim() === "") {
        alert("Debe ingresar un nombre para el rol.");
        return false;
      }
      if (desRol.trim() === "") {
        alert("Debe ingresar una descripción para el rol.");
        return false;
      }
      return true;
    };

    const AceptarModal = () => {
      //alert("Accion a realizar: " + accion);
      //return;
      if (ValidaCampos()) {
        RegistroRol({ nombreRol, desRol, permisos: permisosSeleccionados }, accion);
      }
    };
    const SeleccionarRol = async (accion, idRol) => {
      if (accion == 1) {


      } else if (accion == 2) {

        const confirmar = confirm(`¿Está seguro que desea eliminar el rol?. Esto eliminará todos los permisos asociados a los usurios con este rol.`);
        if (!confirmar) {
          return;
        }

        try {
          const ur_del = `${api}api/auth/eliminar_rol`;
          //console.log(ur_del);

          const respuesta = await fetch(ur_del, {
            method: 'POST',
            headers: { "Content-Type": "application/json", "authorization": `Bearer ${token}` },
            body: JSON.stringify({ id_delRol: idRol })
          });
          const resultado = await respuesta.json();
          if (resultado.estado == 1) {
            alert(resultado.message);
          } else {
            alert(resultado.message);
          }
          setListadoDeRoles(prevRoles =>
            prevRoles.filter(rol => rol.ROL_ID !== idRol)
          );
        } catch (error) {
          alert(error.message);
        }
      }
      //console.log("Rol seleccionado:", listadoDeRoles);
    };
    //PRUEBA DE FORMULARIO
    const OcClikUpdate = () => {
      return (
        <>

        </>

      )
    }
    const htmlBody = () => {

      return (
        <form>
          <Row className="justify-content-center  vh-100 bg-light ">
            <Col md={6}>
              <div className="card text-start">
                <div className="card-body">
                  <h4 className="card-title">Registro de roles</h4>
                  <div className="">
                    <label htmlFor="nombreRol" className="form-label">Nombre del Rol</label>
                    <input
                      onChange={(e) => { setNombreRol(e.target.value); }}
                      type="text"
                      value={nombreRol}
                      id="nombreRol"
                      className="form-control"
                      placeholder="Ingresa el nombre del rol"
                      required
                    />
                    <label htmlFor="desRol" className="form-label">Descripción del Rol</label>
                    <textarea
                      onChange={(e) => { setDesRol(e.target.value); }}
                      type="textarea"
                      value={desRol}
                      id="desRol"
                      className="form-control"
                      placeholder="Ingresa la descripción del rol"
                      required

                    />
                  </div>

                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="card text-start">
                <div className="card-body">
                  <h4 className="card-title">Permisos Disponibles</h4>
                  <div>
                    {
                      PermisosBase.map((grupoPermisos, index) => {
                        return (
                          <div key={index} className="mb-3">
                            <h5>{grupoPermisos.des_grupo}</h5>
                            {grupoPermisos.permisos.map((permiso, Pindex) => (
                              <Form.Check
                                key={`${grupoPermisos.grupo}-${Pindex}`}
                                type="switch"
                                id={`${grupoPermisos.grupo}-${permiso.descripcion}`}
                                label={permiso.descripcion}
                                defaultChecked={permiso.valor}
                                onChange={() => handleChecks(index, Pindex)}
                              />
                            ))}
                          </div>
                        );
                      })
                    }

                  </div>
                </div>
              </div>

            </Col>
            {/* <Col md={3}> <button type="submit" className="btn btn-primary w-100">Registrar Rol</button></Col> */}

          </Row>
        </form>);
    };

    const htmlBodyUpdate = (dataRol, permisosRol) => {
    
      //console.log("PERMISOS:", permisosRol);
      return (
        <form>
          <Row className="justify-content-center  vh-100 bg-light ">
            <Col md={6}>
              <div className="card text-start">
                <div className="card-body">
                  <h4 className="card-title">Registro de roles</h4>
                  <div className="">
                    <label htmlFor="nombreRol" className="form-label">Nombre del Rol</label>
                    <input
                      onChange={(e) => { setNombreRol(e.target.value); }}
                      type="text"
                      value={nombreRol}           
                      //defaultValue={dataRol ? dataRol.nombreRol : ""}
                      id="nombreRolU"
                      className="form-control"
                      placeholder="Ingresa el nombre del rol"
                      required
                    />
                    <label htmlFor="desRolU" className="form-label">Descripción del Rol</label>
                    <textarea
                      onChange={(e) => { setDesRol(e.target.value); }}
                      type="textarea"
                      value={desRol}
                      //defaultValue={dataRol  ? dataRol.desRol : ""}
                      id="desRolU"
                      className="form-control"
                      placeholder="Ingresa la descripción del rol"
                      required

                    />
                  </div>

                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="card text-start">
                <div className="card-body">
                  <h4 className="card-title">Permisos Disponibles</h4>
                  <div>
                    {
                      permisosSeleccionados.map((grupoPermisos, index) => {
                        return (
                          <div key={index} className="mb-3">
                            <h5>{grupoPermisos.des_grupo}</h5>
                            {grupoPermisos.permisos.map((permiso, Pindex) => (
                              <Form.Check
                                key={`${grupoPermisos.grupo}-${Pindex}`}
                                type="switch"
                                id={`${grupoPermisos.grupo}-${permiso.descripcion}`}
                                label={permiso.descripcion}
                                checked={permiso.valor}
                                onChange={() => handleChecks(index, Pindex)}
                              />
                            ))}
                          </div>
                        );
                      })
                    }

                  </div>
                </div>
              </div>

            </Col>
            {/* <Col md={3}> <button type="submit" className="btn btn-primary w-100">Registrar Rol</button></Col> */}

          </Row>
        </form>);
    };

    return (
      <>
        <Container fluid>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre del Rol</th>
                <th>Descripción</th>
                <th>Permisos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listadoDeRoles.map((rol) => (
                <tr key={rol.ROL_ID}>
                  <td>{rol.ROL_NOMBRE}</td>
                  <td>{rol.ROL_DESCRIPCION}</td>
                  <td>
                    <ModalGenerico UnaAccion={() => setAccion(3)} icono={"ri-eye-line"} SizeVentana="md" textBoton="Ver Permisos" tituloModal="Permisos" btnMostrarOk={false} btnCerrar={"Cerrar"} btnOk={"ok"} colorClase="info" OnClicOkModal={CerrarModal} OnClicCloseModal={CerrarModal}>
                      <Row className="justify-content-center  vh-100 bg-light " >
                        <Col md={12}>
                          <div className="card text-start">
                            <div className="card-body">
                              <h4 className="card-title">Permisos</h4>
                              <div>
                                {
                                  JSON.parse(rol.ROL_PERMISOS).map((grupoPermisos, index) => {
                                    return (
                                      <div key={index} className="mb-3">
                                        <h5>{grupoPermisos.des_grupo}</h5>
                                        {grupoPermisos.permisos.map((permiso, Pindex) => (
                                          <Form.Check
                                            key={`${grupoPermisos.grupo}-${Pindex}`}
                                            type="switch"
                                            id={`${grupoPermisos.grupo}-${permiso.descripcion}`}
                                            label={permiso.descripcion}
                                            defaultChecked={permiso.valor}
                                            onChange={() => handleChecks(index, Pindex)}
                                          />
                                        ))}
                                      </div>
                                    );
                                  })
                                }

                              </div>
                            </div>
                          </div>

                        </Col>
                        {/* <Col md={3}> <button type="submit" className="btn btn-primary w-100">Registrar Rol</button></Col> */}

                      </Row>
                    </ModalGenerico>
                  </td>

                  <td>
                    {/* <Button onClick={() => SeleccionarRol(1, rol.ROL_ID)} className="btn btn-warning me-2" ><span className="ri-pencil-line"></span></Button> */}
                    <ModalGenerico UnaAccion={() => {ResetFormulario(); setAccion(1); setNombreRol(rol.ROL_NOMBRE); setDesRol(rol.ROL_DESCRIPCION);setIdRol(rol.ROL_ID); setPermisosSeleccionados(JSON.parse(rol.ROL_PERMISOS));}} icono={"ri-pencil-line"} SizeVentana="lg" textBoton="" tituloModal="Permisos" btnMostrarOk={true} btnCerrar={"Cerrar"} btnOk={"Guardar"} colorClase="warning" OnClicOkModal={AceptarModal} OnClicCloseModal={CerrarModal}>

                      {htmlBodyUpdate({ id_delRol: rol.ROL_ID, nombreRol: rol.ROL_NOMBRE, desRol: rol.ROL_DESCRIPCION }, JSON.parse(rol.ROL_PERMISOS))}
                    </ModalGenerico>
                    <Button onClick={() => SeleccionarRol(2, rol.ROL_ID)} className="btn btn-danger" > <span className="ri-delete-bin-line"></span></Button>

                  </td>
                </tr>
              ))}
            </tbody>

          </Table>
          <ModalGenerico UnaAccion={() => {ResetFormulario(); setAccion(1);}} SizeVentana="lg" textBoton="Crear Rol" tituloModal="Creacion de Rol" btnCerrar={"Cancelar"} btnOk={"Registrar"} colorClase="info" OnClicOkModal={AceptarModal} OnClicCloseModal={CerrarModal}>

            {htmlBodyUpdate()}
          </ModalGenerico>
        </Container>
      </>
    )
  }
  const CerrarModal = () => {
    setDesRol("");
    setNombreRol("");
    setPermisosSeleccionados(PermisosBase);
  }


  //console.log(PermisosBase);

  return (

    <>
      <Navbarapp2 />
      <TabsMenu defaultActiveKey="tab1" TabsOpciones={[{ eventKey: "tab1", title: "Registro de Usuarios", content: paginaRegistro }, { eventKey: "tab2", title: "Roles", content: paginaroles }]} />

    </>
  )
}