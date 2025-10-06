import { useState } from "react";
import { Loading } from "./loading";
import { InputBuscar } from "./InputBuscar";

export function SubirArchivo({ url, archivo, tipoDoc, identidad, nombreAfiliado, onSuccess }) {
    const [loading, setLoading] = useState(false);
    


    const handleUpload = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("archivo", archivo);
        formData.append("nombre", nombreAfiliado);
        formData.append("identidad", identidad);
        formData.append("tipo", tipoDoc);

            if (tipoDoc==="0" || tipoDoc===0) {
                alert("Favor seleccionar un tipo de documento");
                  setLoading(false);
                return;
            }

        try {
            //para crear el directorio
            const response = await fetch(url+'directorio_cargar', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', // No establecer el Content-Type manualmente
                },
                body: JSON.stringify({ 
                    identidad: identidad,   
                    tipoDoc: tipoDoc.toString()
                }),
            });
            const dataArchivo = await response.json();

            if (!response.ok) {
                alert("[1]Error al subir archivo: " + dataArchivo.mensaje);
            } else {
                //creacion subida del archivo
                const res_Archivo = await fetch(`${url}subir_archivo?identidad=${identidad}&nombre=${nombreAfiliado}&tipo=${tipoDoc}`, {
                    method: 'POST',
                    body: formData
                })
                const data_SUBIDA = await res_Archivo.json();
                if (!res_Archivo) {
                    ("[2]Error al subir archivo: " + data_SUBIDA.mensaje);
                } else {
                    alert(">" + data_SUBIDA.mensaje);
                    if (onSuccess) onSuccess();
                   
                }
            }

        } catch (error) {
            console.error("Error al subir archivo:", error);
        } finally {
            setLoading(false);
            
        }
    };

    return <>
        <button id="btn_subir" onClick={handleUpload} className="btn btn-secondary" type="" disabled={loading || !archivo}>{loading && "Cargando..." || "Subir Archivo"}</button>
    </>
}