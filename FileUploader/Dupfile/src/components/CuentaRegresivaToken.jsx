import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

export function CuentaRegresivaToken() {
  const [tiempoRestante, setTiempoRestante] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);

    const actualizarTiempo = () => {
      const now = Date.now() / 1000; // tiempo actual en segundos
      const tiempo = Math.max(0, decoded.exp - now);
      setTiempoRestante(tiempo);
    };

    // Actualiza inmediatamente
    actualizarTiempo();

    // Actualiza cada segundo
    const interval = setInterval(actualizarTiempo, 1000);

    return () => clearInterval(interval);
  }, []);

  if (tiempoRestante === null) return null;

  // Convertir segundos en hh:mm:ss
  const horas = Math.floor(tiempoRestante / 3600);
  const minutos = Math.floor((tiempoRestante % 3600) / 60);
  const segundos = Math.floor(tiempoRestante % 60);

  // Mostrar aviso visual si queda menos de 5 minutos
  const style = { color: tiempoRestante < 300 ? "red" : "black" };

  return (
    <div style={style}>
      Sesión expira en: {horas.toString().padStart(2, "0")}:
      {minutos.toString().padStart(2, "0")}:
      {segundos.toString().padStart(2, "0")}
    </div>
  );
}

 
