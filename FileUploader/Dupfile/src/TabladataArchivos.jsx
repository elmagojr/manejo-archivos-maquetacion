import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Loading } from './loading';
import { InputBuscar } from "./InputBuscar";

 
export function TabladataArchivos({ listadoArchivos,  onSelect, url, identidad, tipo}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
 console.log("listadoArchivos en TabladataArchivos: ", listadoArchivos);
 
    return (
        <>
 
            <Table striped bordered hover size="sm" responsive ={true}>
                <thead>
                    <tr>
                        <th>Nombre del archivo</th>
                        <th>Peso</th>
                        <th>Fecha</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                        {(listadoArchivos || []).map((archivo, index) => (
                        <tr key={index}>                            
                            <td>{archivo.nombre}</td>
                            <td>{archivo.size}</td>
                            <td>{new Date(archivo.fecha).toLocaleString()} </td>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={() => {window.open(`${url}pdf/${identidad}/${tipo}/${archivo.nombre}`, "_blank")}}  >Ver
                                    <i className="ri-eye-fill"></i>
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => {}} >Del
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
