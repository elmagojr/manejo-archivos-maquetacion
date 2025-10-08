export function Register() {
    return (
    <>
   <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "22rem", borderRadius: "1rem" }}>
        <h5 className="text-center mb-4">Sistema de Gestion de Archivos Digitales</h5>
         <h6 className="text-center mb-4">Registro</h6>
        <form>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Id</label>
            <input
              type="text"             
              className="form-control"             
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">Nombre de usurio Usuario</label>
            <input
              type="text"
              id="Rusuario"
              className="form-control"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="rpassword"
              className="form-control"
              placeholder="Ingresa una contraseña"
              required
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

          <button type="submit" className="btn btn-primary w-100">
            Registrar
          </button>         
        </form>
      </div>
    </div>
    </>
    )
}