import { useState, useEffect } from "react";

export function Manejo_data(api) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error("Error al solicitar información");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };

}

export async function ApiGet(url) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`);
  }
  return await respuesta.json();
}


