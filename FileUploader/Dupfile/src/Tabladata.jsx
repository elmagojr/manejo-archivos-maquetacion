import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Loading } from './loading';
import { InputBuscar } from "./InputBuscar";

 
export function Tabladata({ btabla, FuncionData, url, cerrarModal , onSelect}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const { data=[], loading, error } = FuncionData ? FuncionData(url) : {}; //para cargar datos en la tabla 

    if (error) {
        return alert("Error: " + error);
    }

    while (loading) {
        return <Loading />;        
    }
 // Filtrar datos según búsqueda
  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
  );

    const inputBuscar = btabla ? (
        <div style={{ position: "sticky", top: 0 }} className="card card-body m-3 col">
            <span className="-text info col">Búsqueda</span>
            <input className="form-control p-1" type="text" id="txt_busqueda" name="coop_Identidad" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
    ) : null;

//console.log(data);
var APIURL = import.meta.env.VITE_MODE == "dev" ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD


    return (
        <>
            {inputBuscar}   
            <Table striped bordered hover size="sm" responsive ={true}>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Identidad</th>
                        <th>Nombre</th>
                        <th>RTN</th>
                        <th>Cod. Anterior</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.coop_codigo}</td>
                            <td>{item.coop_identidad}</td>
                            <td>{item.coop_nombre}</td>
                            <td>{item.coop_rtn}</td>
                            <td>{item.coop_codigo_ant}</td>
                            <td>
                                <InputBuscar url={APIURL + "api/coop?id="} funcionBuscar={(data) => {console.log(data); cerrarModal(); onSelect(data);}} Codigo={item.coop_codigo.toString()}  />
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </Table>
        </>

    )

}
