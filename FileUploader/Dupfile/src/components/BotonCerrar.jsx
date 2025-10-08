import { useNavigate } from 'react-router-dom';

export function BotonCerrar() {
  const navigate = useNavigate();

  const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id_usr");
        localStorage.removeItem("username");
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <button className="btn btn-primary mt-2" onClick={handleLogout}>
      Cerrar sesión 
    </button>
  );
}