import { useState, useEffect } from "react";
import { ListadoGenerico } from "../components/ListadoCombo"
import { ApiGet } from "../Manejo_data";
import { jwtDecode } from "jwt-decode";
import { AlertaHtml } from "../components/AlertasHtml";
export function Register() {

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
  
  const api = import.meta.env.VITE_MODE == "dev" ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD
  function BuscarUsuario(id) {
    const codigo = dataUsrs.find(item => item.idKey === Number(id))
    return codigo ? codigo.codigoUsr.toString() : null
  }

  useEffect(() => { //esto evita que se repita el ciclo hasta que devuelva []
    ApiGet(api + "api/usrActivos").then((jsonDAta) => {
      const newData = [];
      //console.log("Lo que devuelve la API:", jsonDAta);
      jsonDAta.map((item, index) => {
        //console.log(index);

        newData.push({ idKey: index + 1, codigoUsr: item.usr_codigo, nombreUsrTotal: item.usr_codigo + " - " + item.usr_nombre })

      });

      setDatasur(newData);
      console.log(newData);

    }).catch(err => {
      alert("No se pudo traer los datos requeridos", err); console.log(err);
      //console.log("Error en la promesa:", err);
    });

  }, [])
  function Alerta(color, mensaje,ver) { //des ser necesario
    setColor(color.toString());
    setmensajeA(mensaje);
    setvermensaje(ver)
  }
  function ResetFormulario() {
    setLoading(false);
    setTipoRol(0);
    setKeyusr(0);
    setPassword("");    
  }

  const RegistroUsr = async () => {
    setLoading(true);
    try {

  // 🚨 VALIDACIÓN DE CAMPOS OBLIGATORIOS
    if (tipoRol === 0) {
      Alerta("warning", "Debe seleccionar un rol.", true);
      setLoading(false);
      return;
    }

    if (idKeyusr === 0) {
      Alerta("warning", "Debe seleccionar un usuario.", true);
      setLoading(false);
      return;
    }

    if (!password || password.trim() === "") {
      Alerta("warning", "Debe ingresar una contraseña.", true);
      setLoading(false);
      return;
    }

    // 🚨 OPCIONAL: Validar confirmación de contraseña
    const pass2 = document.getElementById("rpassword2").value;
    if (password !== pass2) {
      Alerta("danger", "Las contraseñas no coinciden.", true);
      setLoading(false);
      return;
    }
console.log("Rol: ",tipoRol);

    return;
      const payload = {
        id_rol: Number(tipoRol),
        username: BuscarUsuario(Number(idKeyusr)).toString(),
        password: password
      }
console.log(payload);

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
      if (data.estado === 1)  {
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


  return (
    <>
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
    </>
  )
}