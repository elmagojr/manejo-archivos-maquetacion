import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export function GuardRute({ children }) {
  const APIURL =
    import.meta.env.VITE_MODE == "dev"
      ? import.meta.env.VITE_API_URL_DEV
      : import.meta.env.VITE_API_URL_PROD;

  const [isValid, setIsValid] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Función para validar el token con backend y localmente
  const verificarToken = async (tokenToCheck) => {
    if (!tokenToCheck) return setIsValid(false);

    try {
      const decoded = jwtDecode(tokenToCheck);
      const now = Date.now() / 1000;

      if (decoded.exp < now) throw new Error("Token expirado");

      const resp = await fetch(`${APIURL}api/auth/VerificaToken`, {
        headers: { authorization: `Bearer ${tokenToCheck}` },
      });

      if (!resp.ok) throw new Error("Token inválido en backend");

      const data = await resp.json();
      if (!data.valido) throw new Error("Token no válido");

      setIsValid(true);
    } catch (error) {
      console.error("Token inválido:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("id_usr");
      localStorage.removeItem("username");
      setIsValid(false);
    }
  };

  // Se ejecuta al montar el componente y cada vez que cambia el token
  useEffect(() => {
    verificarToken(token);
  }, [token]);

  // Escucha cambios en localStorage (ej. logout desde otra pestaña)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "token") {
        setToken(event.newValue); // actualiza el estado para revalidar
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

   useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      const tiempoRestante = (decoded.exp - now) * 1000; // en ms

      if (tiempoRestante <= 0) {
        // Ya expiró
        setIsValid(false);
        localStorage.removeItem("token");
        localStorage.removeItem("id_usr");
        localStorage.removeItem("username");
        return;
      }

      const timer = setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("id_usr");
        localStorage.removeItem("username");
        setIsValid(false);
      }, tiempoRestante);

      return () => clearTimeout(timer); // limpiar al desmontar o cambiar token
    } catch (error) {
      console.error("Error decodificando token para temporizador", error);
      setIsValid(false);
    }
  }, [token]);

  if (isValid === null) {
    // Mientras valida
    return <div>Cargando...</div>;
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
