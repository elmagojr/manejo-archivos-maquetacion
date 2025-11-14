import { useState, useRef, useEffect } from 'react'

import Container from 'react-bootstrap/Container';

import { ModalDataAfiliados } from '../components/ModalDataAfiliados';
import { SubirArchivo } from '../components/SubirArchivo';
import { ApiGet } from '../Manejo_data';
import { TabladataArchivos } from '../components/TabladataArchivos';
import { InputBuscar } from '../components/InputBuscar';
import {Tipos_Documentos} from '../assets/cositas';
import { ListadoCombo } from '../components/ListadoCombo';
import { AcordionArchivos } from '../components/AcordionArchivos';
import { Navbarapp2 } from '../components/Navbarapp2.jsx';
import { Login } from './Login';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
 
 

export function Principal() {
    const [count, setCount] = useState(0)
  const [Codigo, setCodigo] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [identidadAfiliado, setIdentidadAfiliado] = useState("");
  const [nombreAfiliado, setNombreAfiliado] = useState("");
  const [dataAcordion, setDataAcordion] = useState([]);
  const [data, setData] = useState([]);
  const [tipoDoc, setTipoDoc] = useState("0");  // estado local
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  var APIURL = import.meta.env.VITE_MODE == "dev" ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD
  const handleSuccess = () => {
    setSelectedFile(null);
    setTipoDoc("0");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    const urlAcordion = `${APIURL}api/lista_archivos/${identidadAfiliado}`;
    setDataAcordion([])
    ApiGet(urlAcordion).then((json) => {
      setDataAcordion(json);
    }).catch(err => console.log(err));
    console.log("Data acordion on success: ", dataAcordion, "url " + urlAcordion);

  }

  
  const handleResultados = (data) => {
    console.log("Resultados recibidos:", data);
    setData(data);
    setIdentidadAfiliado(data.length > 0 ? data[0].COOP_IDENTIDAD : "");
    setNombreAfiliado(data.length > 0 ? data[0].COOP_NOMBRE : "");




    //console.log("Logitud de datos: ", data.length);

    //console.log("dni " + identidadAfiliado);
    //console.log("nombre " + nombreAfiliado);

    if (data.length > 0) {

      if (data[0].COOP_SEXO === 0) {
        data[0].COOP_SEXO = 'Masculino';
      }
      else if (data[0].COOP_SEXO === 1) {
        data[0].COOP_SEXO = 'Femenino';
      }
      else {
        data[0].COOP_SEXO = 'No aplica';
      }
      switch (data[0].COOP_ESTADO_CIVIL) {
        case 0:
          data[0].COOP_ESTADO_CIVIL = 'Soltero(a)';
          break;
        case 1:
          data[0].COOP_ESTADO_CIVIL = 'Casado(a)';
          break;
        case 2:
          data[0].COOP_ESTADO_CIVIL = 'Unión Libre';
          break;
        case 0:
          data[0].COOP_ESTADO_CIVIL = 'Viudo(a)';
          break;
        default:
          break;
      }

      document.getElementById('coop_nombre').value = data[0].COOP_NOMBRE;
      //document.getElementById('temp_nombre').value = data[0].COOP_NOMBRE;//es el input oculto temporal
      document.getElementById('coop_codigo').value = data[0].COOP_CODIGO;
      document.getElementById('coop_Identidad').value = data[0].COOP_IDENTIDAD;
      //document.getElementById('temp_identidad').value = data[0].COOP_IDENTIDAD;//es el input oculto temporal
      document.getElementById('coop_Genero').textContent = data[0].COOP_SEXO;
      document.getElementById('coop_ec').textContent = data[0].COOP_ESTADO_CIVIL;
      document.getElementById('coop_Telefono').value = data[0].COOP_TEL2;
      document.getElementById('coop_email').value = data[0].COOP_CORREO_ELEC;



      const urlAcordion = `${APIURL}api/lista_archivos/${data[0].COOP_IDENTIDAD}`;
      setDataAcordion([])
      ApiGet(urlAcordion).then((json) => {
        setDataAcordion(json);
      }).catch(err => console.log(err));
      //console.log("Data acordion: ", dataAcordion, "url " + urlAcordion);


    }
  };
    return (
        <>
        <Navbarapp2 />
            <Container >
                <h4>Busqueda </h4>  

                <div className="input-group mb-3">
                    <input className="form-control" type="text" id="coop" name="coop" value={Codigo} onChange={(e) => setCodigo(e.target.value)} />
                    <InputBuscar url={APIURL + "api/coop?id="} funcionBuscar={handleResultados} Codigo={Codigo} />

                    <ModalDataAfiliados SizeVentana={"xl"} textBoton="Todos" tituloModal="Busqueda" btnCerrar="Cancelar" btnOk="Aceptar" colorClase="secondary" API_URL={APIURL} onSelect={handleResultados}>

                    </ModalDataAfiliados>
                </div>


                <div className="container-lg">

                    <h4>Informacion Afiliado</h4>

                    <div className="row align-items-start">
                        <div className="mb-3 ">
                            <label className="form-label">Nombre</label>
                            <input disabled className="form-control" type="text" id="coop_nombre" name="coop_nombre" />
                        </div>
                    </div>

                    <div className="row align-items-start">
                        <div className="  mb-3 col">
                            <span className=" -text info">Codigo Coop.</span>
                            <input disabled className="form-control" type="text" id="coop_codigo" name="coop_codigo" />
                        </div>
                        <div className="  mb-3 col">
                            <span className=" -text info col">Identidad</span>
                            <input disabled className="form-control" type="text" id="coop_Identidad" name="coop_Identidad" />
                        </div>
                        <div className="  mb-3 col">
                            <span className=" -text info">Genero</span>
                            <div className="form-control">
                                <span id="coop_Genero" name="coop_Genero" className="badge bg-info">---</span>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-start">
                        <div className="  mb-3 col">
                            <span className=" -text info">Estado Civil</span>
                            <div className="form-control">
                                <span id="coop_ec" name="coop_ec" className="badge bg-info">---</span>
                            </div>
                        </div>
                        <div className="  mb-3 col">
                            <span className=" -text info">Telefono</span>
                            <input disabled className="form-control" type="text" id="coop_Telefono" name="coop_Telefono" />
                        </div>
                        <div className="  mb-3 col">
                            <span className=" -text info">E-Mail</span>
                            <input disabled className="form-control" type="text" id="coop_email" name="coop_email" />
                        </div>
                    </div>
                    <h4>Subida de Documentos</h4>

                </div>
                <div className="container-lg">
                    <form className="" action="" id="formulario" method="" encType="multipart/form-data">
                        <div className="input-group mb-3">

                            <input className="form-control" type="file" id="archivo" name="archivo" accept="application/pdf" onChange={(e) => setArchivo(e.target.files[0])} ref={fileInputRef} />
                            <SubirArchivo url={APIURL} archivo={archivo} tipoDoc={tipoDoc} identidad={identidadAfiliado} nombreAfiliado={nombreAfiliado} onSuccess={handleSuccess} />

                        </div>
                        <div className="input-group mb-3">
                            <ListadoCombo data={Tipos_Documentos} value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)} />
                        </div>
                    </form>
                </div>

                <div className="py-2">
                    <button className="btn btn-primary btn-rounded  " type="submit">
                        <span className="ri-file-list-2-fill"></span>Enlistar Archivos</button>
                </div>
                <div className='clase-desplazar-vertical py-1'>
                    {dataAcordion.map((item, index) => (
                        <AcordionArchivos key={index} coteoArchivos={item.DirArchivo.length} titular={Tipos_Documentos.find(tipos => tipos.codigo.toString() === item.subcarpeta)?.descripcion || "N/A"} >
                            <TabladataArchivos listadoArchivos={item.DirArchivo} url={APIURL} identidad={identidadAfiliado} tipo={item.subcarpeta} />
                        </AcordionArchivos>
                    ))}

                </div>



            </Container>
        </>
    )
}