import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function Login() {

    var APIURL = import.meta.env.VITE_MODE == "dev" ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD
    const [loading, setLoading] = useState(false);
    const [verMensaje, setVerMensaje] = useState(true);
    const [usernameF, setUsername] = useState('');
    const [passF, setPass] = useState('');
    const [mensaje, setMensaje] = useState("");
    const [formData, setFormdata] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    const VerificaLogin = async () => {
        setLoading(true);

        try {

            const res = await fetch(`${APIURL}api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log("esto es una preuba", data);
            if (data.estado === 0) {
                setVerMensaje(false) //muestra elmensaje
                setMensaje(data.message)
            }
            else {
                localStorage.setItem("token", data.token)
                localStorage.setItem("id_usr", data.id_usr)
                localStorage.setItem("username", data.user)
                setVerMensaje(true) //muestra elmensaje
                setMensaje(data.message)
                navigate("/principal");
            }
            if (!res.ok) throw new Error(data.message || "Error de login");

        } catch (error) {
                setVerMensaje(false) //muestra elmensaje
                setMensaje("Error de conexión: "+error.message)

        } finally {
            setLoading(false);
        }



    };




    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="card shadow p-4" style={{ width: "22rem", borderRadius: "1rem" }}>
                    <h5 className="text-center mb-4">Sistema de Gestion de Archivos Digitales</h5>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="usuario" className="form-label">Usuario</label>
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                className="form-control"
                                placeholder="Ingresa tu usuario"
                                required
                                value={formData.username}
                                onChange={(e) => setFormdata({ ...formData, username: e.target.value })}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="pass"
                                className="form-control"
                                placeholder="Ingresa tu contraseña"
                                required
                                value={formData.password}
                                onChange={(e) => setFormdata({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <button type="button" className="btn btn-primary w-100" onClick={VerificaLogin}> {loading && "Espere" || "Iniciar Sesión"}</button>

                        <div className="alert alert-primary" role="alert" hidden={verMensaje}>
                            {mensaje}
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}