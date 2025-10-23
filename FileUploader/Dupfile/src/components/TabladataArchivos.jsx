import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { InputBuscar } from "./InputBuscar";


export function TabladataArchivos({ listadoArchivos, onSelect, url, identidad, tipo }) {
    const [Lista_NuevosArchivos, setListadoArchivos] = useState(listadoArchivos || []);
    async function EliminarArchivo(identidad, tipo, nombreArchivo) {
        const confirmar = confirm(`¿Está seguro que desea eliminar el archivo"?`);
        if (!confirmar) {
            return;
        }
        const ur_del = `${url}api/eliminar_archivo/${identidad}/${tipo}/${nombreArchivo}`;

        const respuesta = await fetch(ur_del, {
            method: 'DELETE'
        });
        const resultado = await respuesta.json();
        if (respuesta.ok) {
            console.log("Archivo eliminado: ", resultado);
        } else {
            console.error("Error al eliminar el archivo: ", resultado);
        }

        setListadoArchivos(prevArchivos =>
            prevArchivos.filter(archivo => archivo.nombre !== nombreArchivo)
        );
    }

    return (
        <>

            <Table striped bordered hover size="sm" responsive={true}>
                <thead>
                    <tr>
                        <th>Nombre del archivo</th>
                        <th>Peso</th>
                        <th>Fecha</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {(Lista_NuevosArchivos || []).map((archivo, index) => (
                        <tr key={index}>
                            <td>{archivo.nombre}</td>
                            <td>{archivo.size}</td>
                            <td>{new Date(archivo.fecha).toLocaleString()} </td>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={() => { window.open(`${url}pdf/${identidad}/${tipo}/${archivo.nombre}`, "_blank") }}  >Ver
                                    <i className="ri-eye-fill"></i>
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => { EliminarArchivo(identidad, tipo, archivo.nombre); }} >Del
                                    <i className="ri-delete-bin-line"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>

    )

}
