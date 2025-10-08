import React, { useState } from "react";
import {Button, Modal} from "react-bootstrap";
import { Tabladata } from './Tabladata';
import { Manejo_data } from '../Manejo_data';
 

export function ModalDataAfiliados({SizeVentana,textBoton,tituloModal,btnCerrar,btnOk,colorClase, children, API_URL, onSelect  }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const elementoHtml = <Tabladata FuncionData={Manejo_data} btabla={true} url={API_URL + "api/allcoop"} cerrarModal={() => setShow(false)} onSelect={onSelect} />;
    return (
        <> 
            <Button variant={colorClase || "primary"} onClick={handleShow}>
                {textBoton }
            </Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false} size={SizeVentana || "xl"} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>{tituloModal || "Modal heading"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {elementoHtml}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {btnCerrar || "Cerrar"}
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {btnOk || "Aceptar"}
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}
