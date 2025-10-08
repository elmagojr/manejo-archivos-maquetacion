import { Manejo_data } from "../Manejo_data"
import { useState } from "react";
import { Loading } from "./Loading";

export function InputBuscar({ url, funcionBuscar, Codigo }) {

     
    const [loading, setLoading] = useState(false);

    const buscar = async () => {
        if (!Codigo.trim()) {
            alert("Ingresa un código");
            return;
        }

        setLoading(true);      
    
        try {
            const resp = await fetch(
                url + Codigo
                
                
            );
            console.log("urlssss: "+url + Codigo);
            if (!resp.ok) throw new Error("Error al buscar");
            const data = await resp.json();

            funcionBuscar(data); 
        } catch (err) {
            alert("Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            
            <button className="btn btn-secondary" type="button" onClick={buscar}>{loading && "Buscando..." || "Buscar"}</button>
            {loading && <Loading />}
        </>
    )
}