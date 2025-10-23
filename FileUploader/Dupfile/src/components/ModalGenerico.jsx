import React, { useState } from "react";
import {Button, Modal} from "react-bootstrap";
 
export function ModalGenerico({SizeVentana,textBoton,tituloModal,btnCerrar,btnOk,colorClase, children,OnClicOkModal,OnClicCloseModal }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <> 
            <Button variant={colorClase || "primary"} onClick={handleShow}>
                {textBoton }
            </Button>

            <Modal show={show} onHide={() => { OnClicCloseModal(); handleClose();}} centered backdrop="static" keyboard={false} size={SizeVentana || "xl"} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>{tituloModal || "Modal heading"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { OnClicCloseModal(); handleClose(); }}>
                        {btnCerrar || "Cerrar"}
                    </Button>
                    <Button variant="primary" onClick={() => { OnClicOkModal(); handleClose(); }}>
                        {btnOk || "Aceptar"}
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}